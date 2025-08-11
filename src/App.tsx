import { useState } from "react";
import WorkoutSheet from "./components/WorkoutSheet";
import ChatBox from "./components/ChatBox";
import CameraRecorder from "./components/CameraRecorder";
import banner1 from "./imgs/banner1.png";
import logo from "./imgs/logo.jpeg";

export default function App() {
  const [activeTab, setActiveTab] = useState<"workout" | "chat" | "video">("workout");

  return (
    <div className="flex flex-col h-screen">
      {/* Header con título y banner */}
      <div 
        className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-4 shadow-lg relative overflow-hidden"
        style={{
          backgroundImage: `url(${banner1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-center text-white drop-shadow-lg">IRONFRAME Labs ⚡</h1>
          <p className="text-center text-red-100 text-sm drop-shadow-lg">Tu Coach Personal de Powerlifting</p>
        </div>
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
          className={`flex flex-col items-center gap-1 ${activeTab === "workout" ? "font-bold text-yellow-400" : ""}`}
        >
          <img src={logo} alt="Logo" className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs">Rutina</span>
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex flex-col items-center gap-1 ${activeTab === "chat" ? "font-bold text-yellow-400" : ""}`}
        >
          <span className="text-xl">💬</span>
          <span className="text-xs">Chat</span>
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`flex flex-col items-center gap-1 ${activeTab === "video" ? "font-bold text-yellow-400" : ""}`}
        >
          <span className="text-xl">📹</span>
          <span className="text-xs">Vídeo</span>
        </button>
      </div>
    </div>
  );
}
