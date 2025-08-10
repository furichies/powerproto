import { useState } from "react";
import WorkoutSheet from "./components/WorkoutSheet";
import ChatBox from "./components/ChatBox";
import CameraRecorder from "./components/CameraRecorder";

export default function App() {
  const [activeTab, setActiveTab] = useState<"workout" | "chat" | "video">("workout");

  return (
    <div className="flex flex-col h-screen">
      {/* Header con título */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-4 shadow-lg">
        <h1 className="text-2xl font-bold text-center">DianaPower 🏋️‍♀️</h1>
        <p className="text-center text-red-200 text-sm">Tu Coach Personal de Powerlifting</p>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 overflow-hidden p-2">
        {activeTab === "workout" && <WorkoutSheet />}
        {activeTab === "chat" && <ChatBox />}
        {activeTab === "video" && <CameraRecorder />}
      </div>

      {/* Barra de navegación inferior */}
      <div className="flex justify-around bg-gray-800 text-white py-2">
        <button
          onClick={() => setActiveTab("workout")}
          className={activeTab === "workout" ? "font-bold text-yellow-400" : ""}
        >
          Rutina
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={activeTab === "chat" ? "font-bold text-yellow-400" : ""}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={activeTab === "video" ? "font-bold text-yellow-400" : ""}
        >
          Vídeo
        </button>
      </div>
    </div>
  );
}
