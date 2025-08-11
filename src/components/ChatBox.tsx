// src/components/ChatBox.tsx
import { useState, useEffect, useRef } from "react";
import type { ChatMessage } from "../types/index.js";
import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNow } from "date-fns";

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Guardar en localStorage cada vez que cambien los mensajes
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string, sender: "user" | "coach") => {
    const newMsg: ChatMessage = {
      id: uuidv4(),
      sender,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim(), "user");
    setInput("");

    // Simular respuesta automática del coach
    setTimeout(() => {
      const responses = [
        "¡Excelente! Recuerda mantener la espalda recta 🏋️",
        "¡Vamos campeón! Cada repetición te hace más fuerte 💪",
        "Perfecto. Controla la bajada y explota en la subida 🚀",
        "¡Así se hace! La técnica es más importante que el peso 🎯",
        "¡Increíble progreso! Sigue así campeona 👑",
        "Recuerda respirar: inhala al bajar, exhala al subir 🫁",
        "¡Fantástico! Tu fuerza está mejorando día a día 📈",
        "Mantén el core activado en cada repetición 🔥",
        "¡Brutal! Esa es la actitud que necesitas ⚡",
        "Escucha a tu cuerpo, pero no te rindas 🧠💪"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      sendMessage(randomResponse, "coach");
    }, Math.random() * 3000 + 1500);
  };

  return (
    <div className="flex flex-col h-full border border-gray-700 rounded-lg p-4 bg-gray-900">
      <h2 className="text-xl font-bold mb-4">Chat con tu Coach 🏋️</h2>
      
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Inicia una conversación con tu coach</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white border border-gray-600"
                }`}
              >
                <p>{m.text}</p>
                <span className={`block text-xs mt-1 ${
                  m.sender === "user" ? "text-blue-200" : "text-gray-400"
                }`}>
                  {formatDistanceToNow(new Date(m.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-semibold transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
