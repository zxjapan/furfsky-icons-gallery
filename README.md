# FurfSky Icons Gallery

A simple website that displays all images from the `skyblockicons/v3` folder in a grid layout.

## Features

- **Black background** with subtle grey grid lines
- **Responsive grid layout** that adapts to different screen sizes
- **Click to download** - Click on any image to download it
- **Filename display** - Each image shows its filename in a rounded rectangle box
- **Hover effects** - Images lift up slightly when hovered over
- **Lazy loading** - Images load in batches for better performance

## How to Use

### Method 1: With Python Server (Recommended)
1. **Start the server**: Run `python server.py` in your terminal
2. **Open the website**: Visit `http://localhost:8000` in your web browser
3. **Browse images**: Scroll through the grid to see all available images
4. **Download images**: Click on any image to download it to your computer

### Method 2: Direct File Access
1. **Open the website**: Open `index.html` directly in your web browser
2. **Browse images**: The website will show a message that images are available
3. **Download images**: Click on any image to download it to your computer

## File Structure

```
furfskyicons/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── server.py           # Python HTTP server
├── README.md           # This file
└── skyblockicons/
    └── v3/             # Image folder (contains all the icons)
        ├── *.gif       # Enchanted versions
        └── *.png       # Normal versions
```

## Browser Compatibility

This website works best in modern browsers that support:
- CSS Grid
- ES6 JavaScript features
- Lazy loading images

## Notes

- The Python server provides a complete file list and better performance
- Without the server, you can still access individual images directly
- All images are loaded from the `skyblockicons/v3/` folder
- Both enchanted (.gif) and normal (.png) versions are included
- The grid automatically adjusts based on screen size
- Images load in batches of 50 to prevent overwhelming the browser 