// src/components/CameraRecorder.tsx
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { saveVideo } from "../hooks/useIndexedDB";
import { v4 as uuidv4 } from "uuid";
import VideoList from "./VideoList";

export default function CameraRecorder() {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [showVideoList, setShowVideoList] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleStartCaptureClick = () => {
    setCapturing(true);
    setRecordedChunks([]);
    const stream = webcamRef.current?.stream;
    if (!stream) return;
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = ({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current?.stop();
    setCapturing(false);
  };

  const handleSave = async () => {
    if (recordedChunks.length) {
      setSaving(true);
      try {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const id = uuidv4();
        await saveVideo(id, blob);
        console.log("Video guardado exitosamente:", id);
        setRecordedChunks([]); // Limpiar después de guardar
        alert("¡Video guardado exitosamente!");
      } catch (error) {
        console.error("Error saving video:", error);
        alert("Error al guardar el video");
      } finally {
        setSaving(false);
      }
    }
  };

  if (showVideoList) {
    return (
      <div className="flex flex-col h-full">
        <button 
          onClick={() => setShowVideoList(false)}
          className="self-start mb-4 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
        >
          ← Volver a Cámara
        </button>
        <VideoList />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Grabación de Ejercicios</h2>
        <button 
          onClick={() => setShowVideoList(true)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
        >
          Ver Videos
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <Webcam 
          audio={true} 
          ref={webcamRef}
          className="w-full"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "user"
          }}
        />
      </div>
      
      <div className="flex gap-2">
        {capturing ? (
          <button 
            onClick={handleStopCaptureClick} 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            ⏹️ Detener Grabación
          </button>
        ) : (
          <button 
            onClick={handleStartCaptureClick} 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            ⏺️ Iniciar Grabación
          </button>
        )}
        
        {recordedChunks.length > 0 && (
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold"
          >
            {saving ? "💾 Guardando..." : "💾 Guardar Video"}
          </button>
        )}
      </div>
      
      {recordedChunks.length > 0 && (
        <div className="bg-green-900 border border-green-700 rounded-lg p-3">
          <p className="text-green-300 text-sm">
            ✅ Video grabado listo para guardar
          </p>
        </div>
      )}
    </div>
  );
}
