import React, { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./SignaturePad.scss";

interface SignaturePadProps {
  onChange: (signature: string) => void;
  initialValue?: string;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  onChange,
  initialValue,
}) => {
  const canvasRef = useRef<SignatureCanvas>(null);

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current.getCanvas();
        const parent = canvas.parentElement;
        
        if (parent) {
          canvas.width = parent.offsetWidth;
          canvas.height = 200;
        }
        
        // Load ulang signature jika ada initial value
        if (initialValue) {
          canvasRef.current.fromDataURL(initialValue);
        }
      }
    };
    
    // Initial resize
    setTimeout(resizeCanvas, 100);
    
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [initialValue]);

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      onChange("");
    }
  };

  const handleEnd = () => {
    if (canvasRef.current) {
      try {
        const canvas = canvasRef.current.getCanvas();
        
        // Cek apakah canvas kosong
        if (canvasRef.current.isEmpty()) {
          onChange("");
          return;
        }

        // Manual trim untuk menghindari error trim_canvas
        const trimmedCanvas = trimCanvas(canvas);
        const dataUrl = trimmedCanvas.toDataURL("image/png");
        onChange(dataUrl);
      } catch (error) {
        console.error("Error saving signature:", error);
        // Fallback: gunakan canvas tanpa trim
        const canvas = canvasRef.current.getCanvas();
        const dataUrl = canvas.toDataURL("image/png");
        onChange(dataUrl);
      }
    }
  };

  // Fungsi manual untuk trim canvas
  const trimCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = pixels.data;
    let bound = {
      top: null as number | null,
      left: null as number | null,
      right: null as number | null,
      bottom: null as number | null,
    };

    // Find bounds
    for (let i = 0; i < canvas.height; i++) {
      for (let j = 0; j < canvas.width; j++) {
        const index = (i * canvas.width + j) * 4;
        if (data[index + 3] > 0) {
          // Ada pixel yang tidak transparan
          if (bound.top === null) bound.top = i;
          if (bound.left === null || j < bound.left) bound.left = j;
          if (bound.right === null || j > bound.right) bound.right = j;
          bound.bottom = i;
        }
      }
    }

    // Jika semua null (canvas kosong), return canvas asli
    if (
      bound.top === null ||
      bound.left === null ||
      bound.right === null ||
      bound.bottom === null
    ) {
      return canvas;
    }

    // Add padding
    const padding = 10;
    const trimHeight = bound.bottom - bound.top + padding * 2;
    const trimWidth = bound.right - bound.left + padding * 2;
    const trimmed = ctx.getImageData(
      bound.left - padding,
      bound.top - padding,
      trimWidth,
      trimHeight
    );

    // Create new canvas with trimmed size
    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = trimWidth;
    trimmedCanvas.height = trimHeight;
    const trimmedCtx = trimmedCanvas.getContext("2d");
    
    if (trimmedCtx) {
      trimmedCtx.putImageData(trimmed, 0, 0);
    }

    return trimmedCanvas;
  };

  return (
    <div className="signature-pad-container">
      <div className="signature-canvas-wrapper">
        <SignatureCanvas
          ref={canvasRef}
          onEnd={handleEnd}
          canvasProps={{
            className: "sig-canvas",
          }}
        />
      </div>
      <button
        type="button"
        onClick={handleClear}
        className="btn btn-outline-danger"
      >
        🗑️ Hapus Tanda Tangan
      </button>
      <small className="help-text">
        * Tanda tangani dengan mouse/touchscreen di area putih di atas
      </small>
    </div>
  );
};

export default SignaturePad;