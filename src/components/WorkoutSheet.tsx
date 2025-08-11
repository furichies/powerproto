import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { WorkoutSet } from "../types/index.js";
import { useLocalStorage } from "../hooks/useLocalStorage";
import WorkoutCharts from "./WorkoutCharts";
import { addSampleDataToStorage } from "../utils/sampleData";

const EXERCISES = ["sentadillas", "peso muerto", "press de banca"] as const;
const SERIES_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const REPS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function WorkoutSheet() {
  const [data, setData] = useLocalStorage<WorkoutSet[]>("workout-sets", []);
  const [showHistory, setShowHistory] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  // Agregar datos de ejemplo al cargar el componente si no hay datos
  useEffect(() => {
    if (data.length === 0) {
      const sampleCount = addSampleDataToStorage();
      if (sampleCount > 0) {
        // Recargar datos desde localStorage
        const newData = JSON.parse(localStorage.getItem("workout-sets") || "[]");
        setData(newData);
      }
    }
  }, [data.length, setData]);

  function updateSet(id: string, field: keyof WorkoutSet, value: any) {
    setData((prev) => 
      prev.map(set => 
        set.id === id ? { ...set, [field]: value } : set
      )
    );
  }

  function addSet() {
    const newSet: WorkoutSet = {
      id: uuidv4(),
      exercise: "sentadillas",
      series: 1,
      targetReps: 5,
      actualReps: 0,
      targetWeight: 0,
      actualWeight: 0,
      timestamp: new Date().toISOString(),
      notes: ""
    };
    setData((prev) => [...prev, newSet]);
  }

  function deleteSet(id: string) {
    if (confirm("¿Estás seguro de eliminar este set?")) {
      setData((prev) => prev.filter(set => set.id !== id));
    }
  }

  function loadSampleData() {
    if (confirm("¿Cargar datos de ejemplo? Esto reemplazará todos los datos existentes.")) {
      localStorage.removeItem("workout-sets");
      const sampleCount = addSampleDataToStorage();
      const newData = JSON.parse(localStorage.getItem("workout-sets") || "[]");
      setData(newData);
    }
  }

  const todaySets = data.filter(set => {
    const today = new Date().toDateString();
    const setDate = new Date(set.timestamp).toDateString();
    return today === setDate;
  });

  const historicalSets = data.filter(set => {
    const today = new Date().toDateString();
    const setDate = new Date(set.timestamp).toDateString();
    return today !== setDate;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (showCharts) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Análisis y Progreso 📊</h2>
          <button
            onClick={() => setShowCharts(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            ← Volver
          </button>
        </div>
        <WorkoutCharts data={data} />
      </div>
    );
  }

  if (showHistory) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Histórico de Entrenamientos 📈</h2>
          <button
            onClick={() => setShowHistory(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            ← Volver
          </button>
        </div>

        {historicalSets.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No hay entrenamientos anteriores</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(
              historicalSets.reduce((acc, set) => {
                const date = new Date(set.timestamp).toLocaleDateString();
                if (!acc[date]) acc[date] = [];
                acc[date].push(set);
                return acc;
              }, {} as Record<string, WorkoutSet[]>)
            ).map(([date, sets]) => (
              <div key={date} className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-3">{date}</h3>
                <div className="grid gap-3">
                  {sets.map(set => (
                    <div key={set.id} className="bg-gray-700 rounded p-3 flex justify-between items-center">
                      <div>
                        <span className="font-medium text-white capitalize">{set.exercise}</span>
                        <span className="text-gray-300 ml-2">
                          {set.series} serie{set.series !== 1 ? 's' : ''} x {set.actualReps} reps @ {set.actualWeight}kg
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(set.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Rutina de Hoy 🏋️</h2>
          <p className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowCharts(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm"
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
          >
            📈 Histórico
          </button>
          <button
            onClick={loadSampleData}
            className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-sm"
          >
            🎲 Demo
          </button>
          <button
            onClick={addSet}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
          >
            + Agregar Set
          </button>
        </div>
      </div>

      {todaySets.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No hay sets para hoy. ¡Comienza tu entrenamiento!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {todaySets.map((set) => (
            <div key={set.id} className="bg-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
                {/* Ejercicio */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Ejercicio</label>
                  <select
                    value={set.exercise}
                    onChange={(e) => updateSet(set.id, "exercise", e.target.value as typeof set.exercise)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none"
                  >
                    {EXERCISES.map(exercise => (
                      <option key={exercise} value={exercise}>
                        {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Series */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Series</label>
                  <select
                    value={set.series}
                    onChange={(e) => updateSet(set.id, "series", Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none"
                  >
                    {SERIES_OPTIONS.map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Repeticiones Objetivo */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">R.Obj</label>
                  <select
                    value={set.targetReps}
                    onChange={(e) => updateSet(set.id, "targetReps", Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none"
                  >
                    {REPS_OPTIONS.map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Peso Objetivo */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">P.Obj</label>
                  <input
                    type="number"
                    value={set.targetWeight}
                    onChange={(e) => updateSet(set.id, "targetWeight", Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none"
                    min="0"
                    step="0.5"
                    placeholder="kg"
                  />
                </div>

                {/* Repeticiones Reales */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">R.Real</label>
                  <input
                    type="number"
                    value={set.actualReps}
                    onChange={(e) => updateSet(set.id, "actualReps", Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none"
                    min="0"
                  />
                </div>

                {/* Peso Real */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">P.Real</label>
                  <input
                    type="number"
                    value={set.actualWeight}
                    onChange={(e) => updateSet(set.id, "actualWeight", Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none"
                    min="0"
                    step="0.5"
                    placeholder="kg"
                  />
                </div>

                {/* Notas */}
                <div className="col-span-2 md:col-span-3 lg:col-span-6">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Notas</label>
                  <input
                    type="text"
                    value={set.notes || ""}
                    onChange={(e) => updateSet(set.id, "notes", e.target.value)}
                    placeholder="Notas opcionales..."
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Botón eliminar */}
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => deleteSet(set.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
