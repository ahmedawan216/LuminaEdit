import React, { useEffect } from 'react'
import {useRef} from "react";

const ImageCanvas = ({ canvasRef, image, setImage, filters }) => {
  const fileInputRef = useRef(null);
  // Local ref to keep track of the raw image element
  const imageRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const getFilterString = () => {
    return Object.entries(filters)
      .map(([name, { value, unit }]) => {
        // Converts camelCase to kebab-case (e.g. hueRotate -> hue-rotate)
        const cssName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
        return `${cssName}(${value}${unit})`;
      })
      .join(" ");
  };

  // 1. LOAD IMAGE EFFECT: Runs only when the file changes
  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = URL.createObjectURL(image);
    
    img.onload = () => {
      imageRef.current = img;
      
      // Set canvas dimensions to match the image resolution
      if (canvasRef.current) {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        
        // Perform initial draw
        const ctx = canvasRef.current.getContext("2d");
        ctx.filter = getFilterString();
        ctx.drawImage(img, 0, 0);
      }
    };
  }, [image]); // Only re-run if the user uploads a new file

  // 2. APPLY FILTER EFFECT: Runs whenever filters change
  useEffect(() => {
    // Guard clause: Stop if image isn't loaded yet
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const filterString = getFilterString();

    // DEBUG: Check your console to see if the string is valid CSS
    // Expected: "brightness(100%) contrast(100%) saturate(100%) ..."
    console.log("Applying Filter:", filterString);

    ctx.filter = filterString;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0);
    
  }, [filters]); // Run this every time a slider moves


  return (  
    <div className='bg-[#212121] flex-[7] rounded-xl shadow-inner flex
    items-center justify-center p-4 overflow-hidden relative'>
      {/* The hidden input */}
      <input type="file"  ref={fileInputRef} className='hidden'
      accept='image/*' onChange={handleImageChange} />

      <div className={`flex items-center justify-center relative bg-[#2d2d2d] rounded-lg shadow-2xl 
      ${!image ? 'border border-dashed' : 'border-none'}`}>
        {/* The visible canvas */}
         <canvas
          ref={canvasRef}
          className='max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm'
        ></canvas>
         
         {/* The visual cue for user */}
         {!image && (
          <div className='items-center flex justify-center
          inset-0 absolute pointer-events-none'>
          <span onClick={handleUploadClick}
           className='text-gray-400 flex cursor-pointer font-semibold 
           hover:text-white transition-colors pointer-events-auto'
           >
            Click to Browse
            </span>
         </div>
        )}
      </div>
    </div>


  )
}

export default ImageCanvas