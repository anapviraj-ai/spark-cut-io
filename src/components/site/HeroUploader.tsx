import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  UploadCloud,
  Sparkles,
  Download,
  RotateCcw,
  Check,
  FileImage,
  Layers,
  ArrowLeftRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cutout.jpg";

interface ProcessedResult {
  originalUrl: string;
  cutoutUrl: string;
  fileName: string;
  fileSize: string;
  duration: string;
}

export function HeroUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>("Analyzing image...");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [result, setResult] = useState<ProcessedResult | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isComparing, setIsComparing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Format bytes helper
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Smart background removal simulation using Canvas API
  const generateCutout = async (imageSrc: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        // Sample corners to estimate background color
        const cornerSamples = [
          [0, 0],
          [width - 1, 0],
          [0, height - 1],
          [width - 1, height - 1],
          [Math.floor(width / 2), 0],
          [0, Math.floor(height / 2)],
          [width - 1, Math.floor(height / 2)],
        ];

        let bgR = 0;
        let bgG = 0;
        let bgB = 0;
        cornerSamples.forEach(([x, y]) => {
          const idx = (y * width + x) * 4;
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
        });
        bgR /= cornerSamples.length;
        bgG /= cornerSamples.length;
        bgB /= cornerSamples.length;

        // Calculate variance or fallback to luminance / chroma extraction
        const tolerance = 42;
        const feather = 18;

        // BFS flood fill mask from borders for natural cutout
        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        // Seed boundary pixels
        for (let x = 0; x < width; x++) {
          queue.push(x); // top
          queue.push((height - 1) * width + x); // bottom
        }
        for (let y = 0; y < height; y++) {
          queue.push(y * width); // left
          queue.push(y * width + (width - 1)); // right
        }

        const colorDist = (r: number, g: number, b: number) => {
          return Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
        };

        // Edge-flood detection
        let head = 0;
        while (head < queue.length) {
          const curr = queue[head++];
          if (visited[curr]) continue;
          visited[curr] = 1;

          const cx = curr % width;
          const cy = Math.floor(curr / width);
          const cIdx = curr * 4;

          const dist = colorDist(data[cIdx], data[cIdx + 1], data[cIdx + 2]);

          if (dist < tolerance + feather) {
            // Check neighbors
            const neighbors = [];
            if (cx > 0) neighbors.push(curr - 1);
            if (cx < width - 1) neighbors.push(curr + 1);
            if (cy > 0) neighbors.push(curr - width);
            if (cy < height - 1) neighbors.push(curr + width);

            for (const n of neighbors) {
              if (!visited[n]) {
                const nIdx = n * 4;
                const nDist = colorDist(data[nIdx], data[nIdx + 1], data[nIdx + 2]);
                if (nDist < tolerance + feather) {
                  queue.push(n);
                }
              }
            }
          }
        }

        // Apply alpha mask with smooth feathering
        for (let i = 0; i < width * height; i++) {
          const pIdx = i * 4;
          if (visited[i]) {
            const dist = colorDist(data[pIdx], data[pIdx + 1], data[pIdx + 2]);
            if (dist <= tolerance) {
              data[pIdx + 3] = 0; // completely transparent
            } else {
              const alphaRatio = (dist - tolerance) / feather;
              data[pIdx + 3] = Math.min(255, Math.max(0, Math.floor(255 * alphaRatio)));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => resolve(imageSrc);
      img.src = imageSrc;
    });
  };

  // Main file processing handler
  const handleFile = useCallback(async (file: File, sourceDesc: string) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please provide an image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error("File exceeds 15 MB limit. Please choose a smaller image.");
      return;
    }

    const startTime = performance.now();
    const objectUrl = URL.createObjectURL(file);
    const fileName = file.name || "pasted-image.png";
    const fileSize = formatFileSize(file.size);

    setIsProcessing(true);
    setProcessingProgress(15);
    setProcessingStage("Detecting foreground subject...");
    toast.success(`Processing ${fileName} (${sourceDesc})`);

    // Simulate progress updates for realistic feel
    const timer1 = setTimeout(() => {
      setProcessingProgress(45);
      setProcessingStage("Separating subject from background...");
    }, 500);

    const timer2 = setTimeout(() => {
      setProcessingProgress(78);
      setProcessingStage("Refining hairline & edge alpha mask...");
    }, 1200);

    const timer3 = setTimeout(async () => {
      setProcessingProgress(95);
      setProcessingStage("Finalizing studio cutout PNG...");

      const cutoutUrl = await generateCutout(objectUrl);
      const endTime = performance.now();
      const elapsed = ((endTime - startTime) / 1000).toFixed(1) + "s";

      setResult({
        originalUrl: objectUrl,
        cutoutUrl,
        fileName,
        fileSize,
        duration: elapsed,
      });

      setProcessingProgress(100);
      setIsProcessing(false);
      toast.success("Background removed successfully!");
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Desktop File input trigger
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], "from desktop");
    }
  };

  // Drag and Drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], "drag & drop");
    }
  };

  // Clipboard Paste (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            handleFile(file, "clipboard shortcut");
            return;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handleFile]);

  // Click on dropzone opens native file picker
  const triggerDesktopBrowse = () => {
    fileInputRef.current?.click();
  };

  // Slider interaction for Before/After comparison
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isComparing || e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

  // Sample image loader
  const loadDemoImage = async () => {
    try {
      const res = await fetch(heroImage);
      const blob = await res.blob();
      const file = new File([blob], "shoe-front.jpg", { type: "image/jpeg" });
      handleFile(file, "sample photo");
    } catch {
      // Fallback
      toast.info("Click or drop your own image to test!");
    }
  };

  return (
    <div className="relative w-full">
      {/* Hidden File Input for Desktop Selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Main Interactive Container */}
      <div
        ref={containerRef}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass-card glow-ring relative flex min-h-[420px] w-full flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/10 shadow-[0_0_40px_rgba(59,130,246,0.3)] ring-2 ring-primary ring-offset-2 ring-offset-background"
            : "border-border hover:border-primary/40"
        }`}
      >
        {/* Dragging Overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center rounded-2xl bg-background/90 backdrop-blur-md">
            <div className="flex h-20 w-20 animate-bounce items-center justify-center rounded-full border-2 border-dashed border-primary bg-primary/20 text-primary">
              <UploadCloud className="h-10 w-10" />
            </div>
            <p className="mt-4 text-lg font-semibold text-foreground">Drop your image here</p>
            <p className="text-sm text-muted-foreground">Release to remove background instantly</p>
          </div>
        )}

        {/* STATE 1: Empty / Ready for Upload */}
        {!isProcessing && !result && (
          <div
            onClick={triggerDesktopBrowse}
            className="group relative flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/80 bg-card/40 p-8 text-center transition-all duration-200 hover:border-primary/60 hover:bg-card/70"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerDesktopBrowse();
              }
            }}
          >
            {/* Animated Glow Halo */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icon */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary/20">
              <UploadCloud className="h-9 w-9 animate-pulse" />
            </div>

            {/* Main CTA text */}
            <h3 className="mt-5 text-xl font-semibold text-foreground">
              Drop your image here, or browse desktop
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Click anywhere on this card to select from your files, or drag & drop directly.
            </p>

            {/* Unified Shortcut & Feature Pill (No separate buttons) */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-medium text-primary">
                <Sparkles className="h-3 w-3" /> Drag & drop ready
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 font-medium text-muted-foreground">
                <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                  Ctrl
                </kbd>
                +
                <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                  V
                </kbd>
                paste anywhere
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 font-medium text-muted-foreground">
                PNG, JPG, WEBP up to 15 MB
              </span>
            </div>

            {/* Subtle Try Sample Button */}
            <div className="mt-6 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  loadDemoImage();
                }}
                className="text-xs text-muted-foreground transition hover:text-primary hover:underline inline-flex items-center gap-1.5"
              >
                <FileImage className="h-3.5 w-3.5" /> Or click here to test with a sample product
              </button>
            </div>
          </div>
        )}

        {/* STATE 2: AI Processing Scanline Animation */}
        {isProcessing && (
          <div className="relative flex flex-1 flex-col items-center justify-center rounded-xl bg-card/60 p-8 text-center">
            {/* Cyberpunk Laser Scan effect */}
            <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-primary/30 bg-background/50 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-primary/40">
                <Layers className="h-16 w-16 animate-pulse" />
              </div>

              {/* Glowing Scan Bar */}
              <div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_#38bdf8] transition-all duration-75"
                style={{
                  top: `${(processingProgress * 1.5) % 100}%`,
                }}
              />
              <div
                className="absolute inset-0 bg-primary/5 transition-opacity"
                style={{ opacity: (processingProgress % 30) / 30 }}
              />
            </div>

            <h4 className="mt-6 text-lg font-semibold text-foreground">Removing background...</h4>
            <p className="mt-1 text-sm text-primary font-mono">{processingStage}</p>

            {/* Progress indicator */}
            <div className="mt-5 w-full max-w-xs">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>AI Neural Matting</span>
                <span>{processingProgress}%</span>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: Interactive Cutout Result & Before/After Slider */}
        {!isProcessing && result && (
          <div className="flex flex-1 flex-col">
            {/* Image Slider Stage */}
            <div
              ref={sliderContainerRef}
              onMouseDown={() => setIsComparing(true)}
              onMouseUp={() => setIsComparing(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="group relative h-[320px] w-full select-none overflow-hidden rounded-xl cursor-ew-resize border border-border"
            >
              {/* Checkerboard Pattern Underlay for transparent cutout */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255,255,255,0.06) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.06) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.06) 75%)
                  `,
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                }}
              />

              {/* Cutout Image (Transparent layer on right/under) */}
              <img
                src={result.cutoutUrl}
                alt="Cutout result with background removed"
                className="absolute inset-0 h-full w-full object-contain p-2"
                draggable={false}
              />

              {/* Original Image (Clipped layer on left) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    width: sliderContainerRef.current?.clientWidth || "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={result.originalUrl}
                    alt="Original uploaded photo"
                    className="h-full w-full object-contain p-2"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-background/90 text-primary shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Badges on preview */}
              <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-md bg-background/80 px-2 py-0.5 text-[11px] font-medium text-foreground backdrop-blur-sm">
                Original
              </div>
              <div className="pointer-events-none absolute top-3 right-3 z-10 rounded-md bg-primary/90 px-2 py-0.5 text-[11px] font-medium text-primary-foreground backdrop-blur-sm">
                Removed BG
              </div>
            </div>

            {/* Bottom Bar Details & Single Action Row */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">{result.fileName}</span>
                <span>{result.fileSize}</span>
                <span className="inline-flex items-center gap-1 text-success">
                  <Check className="h-3 w-3" /> Done in {result.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={triggerDesktopBrowse}
                  className="h-8 text-xs gap-1.5"
                  title="Click, drop or Ctrl+V another image"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> New image
                </Button>

                <Button size="sm" variant="hero" asChild className="h-8 text-xs gap-1.5">
                  <a
                    href={result.cutoutUrl}
                    download={`snapcut-${result.fileName.replace(/\.[^/.]+$/, "")}.png`}
                  >
                    <Download className="h-3.5 w-3.5" /> Download PNG
                  </a>
                </Button>
              </div>
            </div>

            {/* Subtle reminder that drag/drop and Ctrl+V still work */}
            <p className="mt-2 text-center text-[11px] text-muted-foreground/80">
              Drag & drop another image or press <kbd className="font-mono">Ctrl+V</kbd> anytime to
              replace.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
