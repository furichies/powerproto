export interface WorkoutSet {
  id: string;             // UUID o identificador único
  exercise: "sentadillas" | "peso muerto" | "press de banca"; // Ejercicio específico
  series: number;         // Número de series
  targetReps: number;     // Repeticiones objetivo
  actualReps: number;     // Repeticiones realizadas
  targetWeight: number;   // Peso objetivo
  actualWeight: number;   // Peso real levantado
  timestamp: string;      // ISO date string de cuándo se hizo
  videoBlob?: Blob;       // Video opcional guardado en IndexedDB
  notes?: string;         // Notas adicionales
}

export interface ChatMessage {
  id: string;
  sender: 'coach' | 'user';
  text: string;
  timestamp: string;
}
