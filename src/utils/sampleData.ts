// src/utils/sampleData.ts
import { v4 as uuidv4 } from "uuid";
import type { WorkoutSet } from "../types/index.js";

export function generateSampleData(): WorkoutSet[] {
  const exercises = ["sentadillas", "peso muerto", "press de banca"] as const;
  const sampleData: WorkoutSet[] = [];
  
  // Generar datos para los últimos 30 días
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generar 1-3 ejercicios por día (no todos los días)
    if (Math.random() > 0.3) { // 70% probabilidad de entrenar
      const numExercises = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < numExercises; j++) {
        const exercise = exercises[Math.floor(Math.random() * exercises.length)];
        
        // Progresión realista de pesos
        let baseWeight = 60;
        if (exercise === "sentadillas") baseWeight = 80;
        if (exercise === "peso muerto") baseWeight = 100;
        if (exercise === "press de banca") baseWeight = 60;
        
        // Agregar variación y progresión gradual
        const progressFactor = (30 - i) * 0.5; // Progresión gradual
        const weight = baseWeight + progressFactor + (Math.random() * 10 - 5);
        
        const series = Math.floor(Math.random() * 3) + 3; // 3-5 series
        const targetReps = Math.floor(Math.random() * 8) + 3; // 3-10 reps
        const actualReps = targetReps + Math.floor(Math.random() * 3) - 1; // ±1 rep
        
        sampleData.push({
          id: uuidv4(),
          exercise,
          series,
          targetReps,
          actualReps: Math.max(1, actualReps),
          targetWeight: Math.round(weight * 2) / 2, // Redondear a 0.5kg
          actualWeight: Math.round((weight + (Math.random() * 5 - 2.5)) * 2) / 2,
          timestamp: date.toISOString(),
          notes: Math.random() > 0.7 ? "Buena sesión" : ""
        });
      }
    }
  }
  
  return sampleData;
}

export function addSampleDataToStorage() {
  const existingData = localStorage.getItem("workout-sets");
  const currentData = existingData ? JSON.parse(existingData) : [];
  
  // Solo agregar datos de ejemplo si no hay datos existentes
  if (currentData.length === 0) {
    const sampleData = generateSampleData();
    localStorage.setItem("workout-sets", JSON.stringify(sampleData));
    return sampleData.length;
  }
  
  return currentData.length;
}
