📸 LuminaEdit: Real-Time Image Filter Engine
-----------------------------------

🚀 Live Demo
[Link to your GitHub Pages or Netlify URL here]
-----------------------------------

A high-performance, browser-based image editing application built with React and the HTML5 Canvas API. LuminaEdit allows users to upload photos and apply complex visual effects instantly through a hardware-accelerated rendering engine.
-----------------------------------
✨ Features
Non-Destructive Editing: High-resolution original images are preserved in memory using useRef, allowing for infinite adjustments without quality loss.

9 Professional Filters: Precise control over Brightness, Contrast, Saturation (Saturate), Hue-Rotate, Blur, Grayscale, Sepia, Opacity, and Invert.

Instant Export: High-quality .jpg download functionality using canvas-to-data-URL conversion.

One-Tap Reset: Quickly revert all settings to their default "clean" state.

Fully Responsive: Styled with Tailwind CSS for a sleek, dark-mode experience that works across all screen sizes.

🛠️ Technical Challenges & Solutions
1. The Canvas "Stacking" Problem
Challenge: Initially, applying a new filter would draw the image on top of the previous one, leading to "ghosting" and performance lag.
Solution: Implemented a strict Clear-and-Redraw lifecycle. Using ctx.clearRect(), the canvas is wiped entirely before the updated ctx.filter string is applied and the image is redrawn.

2. State-to-CSS Mapping
Challenge: React state keys use camelCase (e.g., hueRotate), while CSS filters require kebab-case (e.g., hue-rotate).
Solution: Developed a dynamic regex parser: name.replace(/([A-Z])/g, "-$1").toLowerCase(). This ensures the UI state perfectly communicates with the browser's rendering engine.

3. File Pathing & Deployment
Challenge: Handling asset resolution for portfolio integration and production builds.
Solution: Configured absolute and relative pathing to ensure the frontend compiles correctly even when nested within a larger portfolio structure.

🏗️ Built With: 
React.js - UI Component logic and state management.

HTML5 Canvas API - Core rendering and image processing.

Tailwind CSS - Modern, utility-first styling.

Lucide React - Iconography for a professional look.
