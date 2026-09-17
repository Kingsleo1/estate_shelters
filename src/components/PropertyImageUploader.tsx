import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  Star, 
  Link as LinkIcon, 
  Film, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  Check, 
  Plus, 
  Info,
  Maximize2
} from 'lucide-react';

interface PropertyImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  videoUrl?: string;
  onVideoUrlChange?: (url: string) => void;
  maxImages?: number;
}

export const PropertyImageUploader: React.FC<PropertyImageUploaderProps> = ({
  images = [],
  onChange,
  videoUrl = '',
  onVideoUrlChange,
  maxImages = 8
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper: compress/downscale image to fast base64 string for preview & storage
  const processFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Selected file must be an image (JPEG, PNG, WebP)'));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error(`File ${file.name} exceeds 10MB limit.`));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Downscale to max dimension 1600px for optimal crispness & responsive load speed
          const maxDim = 1600;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with high quality (0.85)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setIsProcessing(true);

    const availableSlots = maxImages - images.length;
    if (availableSlots <= 0) {
      setUploadError(`Maximum limit of ${maxImages} images reached. Remove an image to upload more.`);
      setIsProcessing(false);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);
    if (files.length > availableSlots) {
      setUploadError(`Only ${availableSlots} more image(s) can be added (Maximum is ${maxImages}).`);
    }

    try {
      const processed = await Promise.all(
        filesToProcess.map(file => processFileToBase64(file))
      );
      onChange([...images, ...processed]);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to process selected image file(s).');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;

    if (images.length >= maxImages) {
      setUploadError(`Maximum limit of ${maxImages} images reached.`);
      return;
    }

    setUploadError(null);
    const cleanUrl = urlInput.trim();
    onChange([...images, cleanUrl]);
    setUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetDisplayImage = (index: number) => {
    if (index === 0 || index >= images.length) return;
    const targetImage = images[index];
    const remaining = images.filter((_, i) => i !== index);
    onChange([targetImage, ...remaining]);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  return (
    <div className="space-y-4">
      {/* Header & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="font-bold text-xs text-slate-900 dark:text-white flex items-center space-x-1.5">
            <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Property Gallery & Display Media</span>
          </label>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Upload up to {maxImages} high-resolution photos. The first image marked with <Star className="w-3 h-3 inline text-amber-500 fill-amber-500" /> is the <strong>Primary Display Cover</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
            images.length >= maxImages 
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' 
              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
          }`}>
            {images.length} / {maxImages} Images
          </span>
        </div>
      </div>

      {/* Upload Drop Zone & URL Input */}
      {images.length < maxImages && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          {/* Drag & Drop File Upload Box */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileSelect(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 flex flex-col items-center justify-center text-center transition-all ${
              isDragging 
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30' 
                : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-slate-50/50 dark:bg-slate-800/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/jpg"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {isProcessing ? 'Processing Image(s)...' : 'Click or Drag & Drop Photos'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              PNG, JPG, WebP (Auto-optimized)
            </p>
          </div>

          {/* Direct URL Input */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Or Add Direct Photo URL</span>
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">Paste Unsplash, Cloudinary, or CDN link</p>
            </div>

            <div className="flex space-x-1.5">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => handleAddUrl()}
                disabled={!urlInput.trim()}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold text-xs flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Grid of Uploaded Images & Display Image Selector */}
      {images.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Uploaded Images ({images.length})</span>
            <span className="italic">Click star to set as Primary Display Cover</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((imgUrl, index) => {
              const isDisplayImage = index === 0;

              return (
                <div 
                  key={`${index}-${imgUrl.slice(0, 30)}`}
                  className={`group relative rounded-2xl overflow-hidden border-2 transition-all shadow-xs bg-slate-900 ${
                    isDisplayImage 
                      ? 'border-amber-500 ring-2 ring-amber-500/30' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  {/* Image Aspect Box */}
                  <div className="aspect-4/3 w-full relative bg-slate-950">
                    <img 
                      src={imgUrl} 
                      alt={`Property image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Display Badge Overlay */}
                    {isDisplayImage ? (
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px] flex items-center space-x-1 shadow-md">
                        <Star className="w-3 h-3 fill-slate-950" />
                        <span>Display Cover</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetDisplayImage(index)}
                        title="Set as Primary Display Cover Image"
                        className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white text-[10px] font-semibold flex items-center space-x-1 backdrop-blur-xs transition-colors opacity-90 group-hover:opacity-100"
                      >
                        <Star className="w-3 h-3" />
                        <span>Make Cover</span>
                      </button>
                    )}

                    {/* Quick View Button */}
                    <button
                      type="button"
                      onClick={() => setPreviewImage(imgUrl)}
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100"
                      title="View Full Size"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>

                    {/* Delete and Reorder Actions Bar */}
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center space-x-1">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMove(index, 'left')}
                            title="Move Left"
                            className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-white text-xs"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {index < images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMove(index, 'right')}
                            title="Move Right"
                            className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-white text-xs"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        title="Delete this image"
                        className="p-1 rounded bg-rose-600/80 hover:bg-rose-600 text-white text-xs transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 text-center text-xs text-slate-400">
          No images uploaded yet. Upload or paste up to 8 images above.
        </div>
      )}

      {/* Video URL Input */}
      {onVideoUrlChange && (
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="font-semibold text-xs text-slate-900 dark:text-white flex items-center space-x-1.5 mb-1.5">
            <Film className="w-3.5 h-3.5 text-blue-500" />
            <span>Property Video / Virtual Tour URL (Optional)</span>
          </label>
          <div className="relative">
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => onVideoUrlChange(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=... or https://vimeo.com/..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Image Storage Guidance Callout */}
      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 text-[11px] text-blue-900 dark:text-blue-200 flex items-start space-x-2">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Astra DB & Cloud Media Persistence:</strong> Images uploaded via files are automatically optimized and encoded. In DataStax Astra DB, property images are stored in the <code>images list&lt;text&gt;</code> column and <code>display_image text</code> attribute. You can also connect an S3 or Cloudinary storage bucket (see the Astra DB CQL schema tab for setup details).
        </div>
      </div>

      {/* Full-Screen Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={previewImage} 
              alt="Full Preview" 
              className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain" 
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg"
            >
              <Trash2 className="w-4 h-4 hidden" />
              <span className="px-2 font-bold text-xs">✕ Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
