'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';

export default function CropHelperPage() {
  const [selectedImage, setSelectedImage] = useState('media__1782726019895.png');
  const [cropParams, setCropParams] = useState({ x: 400, y: 300, width: 300, height: 350 });
  const [status, setStatus] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesList = [
    'media__1782726019895.png',
    'media__1782713290114.png'
  ];

  const detectAndCrop = () => {
    const img = imgRef.current;
    if (!img || !img.complete) return;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    tempCanvas.width = img.naturalWidth;
    tempCanvas.height = img.naturalHeight;
    tempCtx.drawImage(img, 0, 0);

    const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const pixels = imgData.data;

    let minX = tempCanvas.width;
    let maxX = 0;
    let minY = tempCanvas.height;
    let maxY = 0;
    let found = false;

    // Saturated blue check for the United Classes graphic
    const isGraphicBlue = (r: number, g: number, b: number) => {
      // United Classes blue is deep and saturated (e.g. RGB 0, 80, 157 or similar)
      return r < 70 && g > 60 && g < 180 && b > 140;
    };

    for (let y = 0; y < tempCanvas.height; y += 4) {
      for (let x = 0; x < tempCanvas.width; x += 4) {
        const i = (y * tempCanvas.width + x) * 4;
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        if (isGraphicBlue(r, g, b)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          found = true;
        }
      }
    }

    if (found && (maxX - minX) > 200 && (maxY - minY) > 200) {
      const gWidth = maxX - minX;
      const gHeight = maxY - minY;
      
      // Relative coordinates of Deshkar Sir on the graphic
      // He is in the lower right of the graphic
      const x = Math.round(minX + gWidth * 0.35);
      const y = Math.round(minY + gHeight * 0.40);
      const width = Math.round(gWidth * 0.65);
      const height = Math.round(gHeight * 0.55);

      setCropParams({ x, y, width, height });
      setStatus('United Classes graphic detected automatically! Adjust sliders if needed.');
    } else {
      // Fallback defaults
      setCropParams({
        x: Math.round(img.naturalWidth * 0.35),
        y: Math.round(img.naturalHeight * 0.35),
        width: Math.round(img.naturalWidth * 0.30),
        height: Math.round(img.naturalHeight * 0.40)
      });
      setStatus('Could not auto-detect the graphic box. Please adjust sliders manually.');
    }
  };

  useEffect(() => {
    updatePreview();
  }, [cropParams, selectedImage]);

  const updatePreview = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = cropParams.width;
    canvas.height = cropParams.height;
    ctx.drawImage(
      img,
      cropParams.x,
      cropParams.y,
      cropParams.width,
      cropParams.height,
      0,
      0,
      cropParams.width,
      cropParams.height
    );
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setStatus('Saving cropped image...');
    try {
      const imageData = canvas.toDataURL('image/png');
      const res = await fetch('/api/save-cropped-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Success! Image saved to public/images/teacher_deshkar.png');
      } else {
        setStatus(`Error: ${data.error || 'Failed to save'}`);
      }
    } catch (e) {
      setStatus(`Network error: ${e}`);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0a0f1e', color: 'white', padding: '100px 2rem 2rem 2rem' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Teacher Image Cropping Helper</h1>
        <p style={{ color: '#ffd700', marginBottom: '2rem' }}>
          Select the correct screenshot file and crop Deshkar Sir's portrait from the graphic.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
          {imagesList.map((imgName) => (
            <button
              key={imgName}
              onClick={() => setSelectedImage(imgName)}
              style={{
                padding: '0.8rem 1.5rem',
                background: selectedImage === imgName ? '#ffd700' : 'rgba(255,255,255,0.05)',
                color: selectedImage === imgName ? '#0a0f1e' : 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {imgName}
            </button>
          ))}
          <button
            onClick={detectAndCrop}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#00e676',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Auto-Detect Graphic Box
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left: Source Image */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px' }}>
            <h3>Source Screenshot</h3>
            <div style={{ position: 'relative', overflow: 'auto', maxHeight: '500px' }}>
              <img
                ref={imgRef}
                src={`/images/${selectedImage}`}
                alt="Source"
                onLoad={detectAndCrop}
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* Right: Crop Controls & Preview */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Crop Preview & Controls</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label>
                X Offset: {cropParams.x}
                <input
                  type="range"
                  min="0"
                  max={imgRef.current?.naturalWidth || 2000}
                  value={cropParams.x}
                  onChange={(e) => setCropParams({ ...cropParams, x: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Y Offset: {cropParams.y}
                <input
                  type="range"
                  min="0"
                  max={imgRef.current?.naturalHeight || 2000}
                  value={cropParams.y}
                  onChange={(e) => setCropParams({ ...cropParams, y: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Crop Width: {cropParams.width}
                <input
                  type="range"
                  min="50"
                  max="1000"
                  value={cropParams.width}
                  onChange={(e) => setCropParams({ ...cropParams, width: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Crop Height: {cropParams.height}
                <input
                  type="range"
                  min="50"
                  max="1000"
                  value={cropParams.height}
                  onChange={(e) => setCropParams({ ...cropParams, height: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </label>
            </div>

            <div style={{ border: '2px solid rgba(255,215,0,0.3)', padding: '0.5rem', display: 'inline-block', alignSelf: 'center', background: '#0a0f1e' }}>
              <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '300px', height: 'auto' }} />
            </div>

            <button
              onClick={handleSave}
              style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
                color: '#0a0f1e',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Confirm and Save Portrait
            </button>

            {status && (
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', color: '#ffd700', fontWeight: 'bold' }}>
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
