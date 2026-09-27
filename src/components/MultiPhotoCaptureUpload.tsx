import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Trash2,
  RefreshCw,
  Eye,
  X,
  Sparkles,
  SwitchCamera,
  CheckCircle2,
  Plus,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

interface MultiPhotoCaptureUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  onPresetSelect?: (preset: {
    url: string;
    title: string;
    description: string;
    category: string;
  }) => void;
}

export const MultiPhotoCaptureUpload: React.FC<MultiPhotoCaptureUploadProps> = ({
  images,
  onChange,
  onPresetSelect,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera'>('upload');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera helper
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  // Start live device camera stream
  const startCamera = async (facing: 'environment' | 'user' = facingMode) => {
    stopCamera();
    setCameraError(null);
    setIsCameraActive(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera device access is not supported in this browser.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.error('Video play error:', e));
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera access in browser settings or use file upload.'
          : 'Unable to access live camera stream. You can upload photos directly from your device.'
      );
      setIsCameraActive(false);
    }
  };

  // Switch between front & rear camera
  const toggleCameraFacing = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    if (isCameraActive) {
      startCamera(nextFacing);
    }
  };

  // Snap photo from live video canvas
  const capturePhoto = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        // Add captured photo to collection
        onChange([...images, dataUrl]);
      }
    } catch (e) {
      console.error('Snapshot capture error:', e);
    } finally {
      setTimeout(() => setIsCapturing(false), 200);
    }
  };

  // Clean up camera on unmount or tab switch
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle uploading multiple files from device
  const handleMultipleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const readers = fileArray.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then(newBase64Images => {
        onChange([...images, ...newBase64Images]);
      })
      .catch(err => console.error('File read error:', err))
      .finally(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      });
  };

  // Remove individual photo
  const handleRemovePhoto = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  // Clear all photos
  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher Tabs: Upload from Device vs Direct Camera */}
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setActiveMode('upload');
              stopCamera();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Images</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('camera');
              startCamera();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'camera'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Device Camera</span>
          </button>
        </div>

        {images.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">
              {images.length} Photo{images.length > 1 ? 's' : ''} Attached
            </span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[11px] text-red-600 hover:underline font-semibold cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Mode 1: Multi-File Device Upload */}
      {activeMode === 'upload' && (
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all relative group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMultipleFileUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Click to select one or multiple photos from device
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Supports JPG, PNG, WEBP, HEIC • Select multiple files simultaneously
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Live Device Camera Stream & Snapper */}
      {activeMode === 'camera' && (
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
            {/* Live Video Element */}
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              className={`w-full h-64 object-cover ${isCameraActive ? 'block' : 'hidden'}`}
            />

            {/* Camera error or inactive state */}
            {!isCameraActive && (
              <div className="p-6 text-center text-slate-300 space-y-3 max-w-sm">
                {cameraError ? (
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="w-8 h-8 text-amber-400" />
                    <p className="text-xs text-amber-200">{cameraError}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-blue-400" />
                    <p className="text-xs">Camera is ready</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => startCamera()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Start Camera
                </button>
              </div>
            )}

            {/* In-Camera Overlay Controls */}
            {isCameraActive && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={toggleCameraFacing}
                  className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors cursor-pointer"
                  title="Switch Front/Rear Camera"
                >
                  <SwitchCamera className="w-5 h-5" />
                </button>

                {/* Big Shutter Button */}
                <button
                  type="button"
                  onClick={capturePhoto}
                  className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 ${
                    isCapturing ? 'bg-red-500 scale-95' : 'bg-white hover:bg-slate-100'
                  }`}
                  title="Capture Snapshot"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Camera className="w-5 h-5" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={stopCamera}
                  className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors cursor-pointer"
                  title="Close Camera"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <p className="text-[11px] text-center text-slate-500">
            📸 You can take multiple snapshots consecutively; each will be attached below.
          </p>
        </div>
      )}

      {/* Photo Gallery & Thumbnail Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Attached Photo Evidence ({images.length})
            </span>
            <span className="text-[10px] text-slate-400">Click photo to zoom</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square shadow-xs"
              >
                <img
                  src={imgUrl}
                  alt={`Evidence ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />

                <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  #{idx + 1}
                </div>

                {/* Actions overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setZoomedImage(imgUrl)}
                    className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 transition-colors shadow-xs cursor-pointer"
                    title="Zoom Photo"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors shadow-xs cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add More Photos Card */}
            <button
              type="button"
              onClick={() => {
                if (activeMode === 'camera') {
                  startCamera();
                } else {
                  fileInputRef.current?.click();
                }
              }}
              className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 text-slate-500 hover:text-blue-600 transition-all cursor-pointer p-2"
            >
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold">+ Add More</span>
            </button>
          </div>
        </div>
      )}

      {/* Preset Samples for instant testing */}
      {onPresetSelect && images.length === 0 && (
        <div className="pt-2">
          <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
            Or select a sample hazard photo to test:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
                title: 'Deep Asphalt Road Crater',
                description: 'Hazardous road pothole near metro junction causing severe traffic slowdown.',
                category: 'pothole',
                label: '🕳️ Road Pothole',
              },
              {
                url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
                title: 'Overflowing Garbage Bin',
                description: 'Solid municipal waste piled up on pavement outside market.',
                category: 'garbage',
                label: '🗑️ Solid Waste',
              },
              {
                url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80',
                title: 'Drinking Water Pipeline Burst',
                description: 'High pressure drinking water leaking continuously onto arterial road.',
                category: 'water_leakage',
                label: '💧 Water Leak',
              },
              {
                url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=800&auto=format&fit=crop&q=80',
                title: 'Non-Functional Streetlight Pole',
                description: 'Streetlight completely dark with exposed wiring near school crossing.',
                category: 'broken_streetlight',
                label: '💡 Streetlight',
              },
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange([p.url]);
                  onPresetSelect({
                    url: p.url,
                    title: p.title,
                    description: p.description,
                    category: p.category,
                  });
                }}
                className="text-[11px] p-2 text-left rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition-all cursor-pointer shadow-2xs"
              >
                <span className="font-bold text-slate-800 block truncate">{p.label}</span>
                <span className="text-[10px] text-slate-400 block truncate">{p.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Photo Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-2">
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed evidence"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
