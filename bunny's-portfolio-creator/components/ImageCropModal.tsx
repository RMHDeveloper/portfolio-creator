import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImage } from './cropImage';

interface ImageCropModalProps {
  imageSrc: string;
  onCancel: () => void;
  onSave: (croppedDataUrl: string) => void;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({ imageSrc, onCancel, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixelsValue: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setIsSaving(true);
    try {
      const cropped = await getCroppedImage(imageSrc, croppedAreaPixels);
      onSave(cropped);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 z-[200] backdrop-blur-md">
      <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-[0_0_30px_rgba(0,0,0,0.50)] overflow-hidden flex flex-col">
        <div className="relative w-full h-[320px] bg-slate-800">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-grow accent-red-700"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm uppercase tracking-wider active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !croppedAreaPixels}
              className="flex-1 py-3 bg-[#CF202E] text-white font-bold rounded-xl hover:bg-red-800 transition-all text-sm uppercase tracking-wider active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
