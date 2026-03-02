import React from 'react'
import { useState, useEffect, useRef } from "react";
import Navbar from './components/Navbar';
import ImageCanvas from './components/ImageCanvas';
import FilterSlider from './components/FilterSlider';

const initialFilters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  saturate: { value: 100, min: 0, max: 200, unit: "%" },
  hueRotate: { value: 0, min: 0, max: 360, unit: "deg" },
  blur: { value: 0, min: 0, max: 20, unit: "px" },
  grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  sepia: { value: 0, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 100, unit: "%" },
};

const App = () => {

  const [filters, setFilters] = useState(initialFilters);
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const resetBtn = () => {
    setFilters({...initialFilters});
  }

  const saveImage = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className='bg-black h-screen text-white p-4 flex flex-col'>
      <Navbar />
      <div className='flex flex-1 flex-row gap-4 overflow-hidden mt-4'>
      <ImageCanvas canvasRef={canvasRef} setImage={setImage} image={image} 
      filters={filters} />
      <FilterSlider
       filters={filters} 
       setFilters={setFilters}
       onReset={resetBtn}
       onSave={saveImage}
        />
      </div>
      
    </div>
  )
}

export default App