// src/types/index.ts

export interface WorkoutSet {
  id: string;             // UUID o identificador único
  exercise: string;       // Nombre del ejercicio
  targetWeight: number;   // Peso objetivo
  actualReps: number;     // Repeticiones realizadas
  actualWeight: number;   // Peso real levantado
  timestamp: string;      // ISO date string de cuándo se hizo
  videoBlob?: Blob;       // Video opcional guardado en IndexedDB
}

export interface ChatMessage {
  id: string;             // UUID o identificador único
  sender: "coach" | "user";
  text: string;
  timestamp: string;      // ISO date string
}
