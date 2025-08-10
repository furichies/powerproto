// src/components/VideoList.tsx
import { useState, useEffect } from "react";
import { db, deleteVideo } from "../hooks/useIndexedDB";

interface VideoRecord {
  id: string;
  blob: Blob;
}

export default function VideoList() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const allVideos = await db.videos.toArray();
      setVideos(allVideos);
    } catch (error) {
      console.error("Error loading videos:", error);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este video?")) {
      try {
        await deleteVideo(id);
        setVideos(prev => prev.filter(v => v.id !== id));
        if (selectedVideo === id) {
          setSelectedVideo(null);
        }
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  const getVideoUrl = (blob: Blob) => {
    return URL.createObjectURL(blob);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-xl font-bold mb-4">Videos Guardados</h2>
      
      {videos.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>No hay videos guardados aún</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div key={video.id} className="border rounded-lg p-3 bg-gray-800">
                <video
                  src={getVideoUrl(video.blob)}
                  controls
                  className="w-full h-32 object-cover rounded mb-2"
                  onLoadStart={(e) => {
                    // Cleanup URL after video loads
                    const videoElement = e.target as HTMLVideoElement;
                    const cleanup = () => {
                      if (videoElement.src.startsWith('blob:')) {
                        URL.revokeObjectURL(videoElement.src);
                      }
                    };
                    videoElement.addEventListener('loadeddata', cleanup, { once: true });
                  }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 truncate">
                    {video.id.substring(0, 8)}...
                  </span>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
