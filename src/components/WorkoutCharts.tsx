// src/components/WorkoutCharts.tsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import type { WorkoutSet } from "../types/index.js";
import { format, parseISO, subDays } from "date-fns";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WorkoutChartsProps {
  data: WorkoutSet[];
}

export default function WorkoutCharts({ data }: WorkoutChartsProps) {
  // Filtrar datos de los últimos 30 días
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentData = data.filter(set => 
    new Date(set.timestamp) >= thirtyDaysAgo
  );

  // Preparar datos para gráfico de progresión de peso
  const getProgressionData = () => {
    const exercises = ["sentadillas", "peso muerto", "press de banca"];
    const datasets = exercises.map((exercise, index) => {
      const exerciseData = recentData
        .filter(set => set.exercise === exercise)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      // Agrupar por fecha y tomar el peso máximo del día
      const dailyMax = exerciseData.reduce((acc, set) => {
        const date = format(parseISO(set.timestamp), "MM/dd");
        if (!acc[date] || acc[date] < set.actualWeight) {
          acc[date] = set.actualWeight;
        }
        return acc;
      }, {} as Record<string, number>);

      const colors = ["#ef4444", "#3b82f6", "#22c55e"];
      
      return {
        label: exercise.charAt(0).toUpperCase() + exercise.slice(1),
        data: Object.entries(dailyMax).map(([_, weight]) => weight),
        borderColor: colors[index],
        backgroundColor: colors[index] + "20",
        tension: 0.1,
        fill: false,
      };
    });

    // Obtener todas las fechas únicas
    const allDates = [...new Set(
      recentData.map(set => format(parseISO(set.timestamp), "MM/dd"))
    )].sort();

    return {
      labels: allDates,
      datasets: datasets.filter(dataset => dataset.data.length > 0)
    };
  };

  // Preparar datos para gráfico de volumen semanal
  const getVolumeData = () => {
    const exercises = ["sentadillas", "peso muerto", "press de banca"];
    
    // Agrupar por semana
    const weeklyVolume = recentData.reduce((acc, set) => {
      const weekStart = format(parseISO(set.timestamp), "MM/dd");
      if (!acc[weekStart]) {
        acc[weekStart] = { sentadillas: 0, "peso muerto": 0, "press de banca": 0 };
      }
      // Volumen = series × reps × peso
      acc[weekStart][set.exercise] += set.series * set.actualReps * set.actualWeight;
      return acc;
    }, {} as Record<string, Record<string, number>>);

    const weeks = Object.keys(weeklyVolume).sort().slice(-7); // Últimas 7 entradas
    const colors = ["#ef4444", "#3b82f6", "#22c55e"];
    
    const datasets = exercises.map((exercise, index) => ({
      label: exercise.charAt(0).toUpperCase() + exercise.slice(1),
      data: weeks.map(week => Math.round(weeklyVolume[week]?.[exercise] || 0)),
      backgroundColor: colors[index],
      borderColor: colors[index],
      borderWidth: 1,
    }));

    return {
      labels: weeks,
      datasets: datasets.filter(dataset => dataset.data.some(value => value > 0))
    };
  };

  // Preparar datos para gráfico de frecuencia
  const getFrequencyData = () => {
    const exercises = ["sentadillas", "peso muerto", "press de banca"];
    const frequency = exercises.map(exercise => {
      const count = recentData.filter(set => set.exercise === exercise).length;
      return count;
    });

    return {
      labels: exercises.map(ex => ex.charAt(0).toUpperCase() + ex.slice(1)),
      datasets: [{
        label: 'Sesiones realizadas',
        data: frequency,
        backgroundColor: ["#ef4444", "#3b82f6", "#22c55e"],
        borderColor: ["#dc2626", "#2563eb", "#16a34a"],
        borderWidth: 2,
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#e5e7eb",
          font: { size: 12 }
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af", font: { size: 10 } },
        grid: { color: "#374151" }
      },
      y: {
        ticks: { color: "#9ca3af", font: { size: 10 } },
        grid: { color: "#374151" }
      },
    },
  };

  const progressionData = getProgressionData();
  const volumeData = getVolumeData();
  const frequencyData = getFrequencyData();

  if (recentData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>📊 No hay datos suficientes para mostrar gráficos</p>
        <p className="text-sm mt-2">Completa algunos entrenamientos para ver tu progreso</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">📈 Análisis de Progreso</h3>
        <p className="text-gray-400 text-sm">Últimos 30 días • {recentData.length} entrenamientos</p>
      </div>

      {/* Progresión de Peso Máximo */}
      {progressionData.datasets.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-red-400 mb-3">💪 Progresión de Peso Máximo</h4>
          <div className="h-64">
            <Line data={progressionData} options={chartOptions} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Volumen de Entrenamiento */}
        {volumeData.datasets.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-400 mb-3">📊 Volumen por Sesión</h4>
            <div className="h-64">
              <Bar data={volumeData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Frecuencia de Ejercicios */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-green-400 mb-3">🎯 Frecuencia de Ejercicios</h4>
          <div className="h-64">
            <Bar data={frequencyData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚡ Estadísticas Rápidas</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-700 rounded p-3">
            <div className="text-2xl font-bold text-red-400">
              {Math.max(...recentData.filter(s => s.exercise === "sentadillas").map(s => s.actualWeight), 0)}kg
            </div>
            <div className="text-xs text-gray-400">Sentadilla máx</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-2xl font-bold text-blue-400">
              {Math.max(...recentData.filter(s => s.exercise === "peso muerto").map(s => s.actualWeight), 0)}kg
            </div>
            <div className="text-xs text-gray-400">Peso muerto máx</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-2xl font-bold text-green-400">
              {Math.max(...recentData.filter(s => s.exercise === "press de banca").map(s => s.actualWeight), 0)}kg
            </div>
            <div className="text-xs text-gray-400">Press banca máx</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-2xl font-bold text-yellow-400">
              {Math.round(recentData.reduce((sum, set) => sum + (set.series * set.actualReps * set.actualWeight), 0))}
            </div>
            <div className="text-xs text-gray-400">Volumen total</div>
          </div>
        </div>
      </div>
    </div>
  );
}
