import { createContext, useContext, useState } from "react";
import type { WorkoutSet } from "../types";

interface WorkoutContextType {
  sets: WorkoutSet[];
  setSets: React.Dispatch<React.SetStateAction<WorkoutSet[]>>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [sets, setSets] = useState<WorkoutSet[]>([]);
  return (
    <WorkoutContext.Provider value={{ sets, setSets }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutStore() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkoutStore must be used within WorkoutProvider");
  return context;
}
