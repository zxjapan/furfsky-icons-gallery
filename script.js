// Function to create image item element
function createImageItem(filename) {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    
    const img = document.createElement('img');
    img.src = `skyblockicons/v3/${filename}`;
    img.alt = filename;
    img.loading = 'lazy';
    
    const filenameDiv = document.createElement('div');
    filenameDiv.className = 'filename';
    filenameDiv.textContent = filename;
    
    imageItem.appendChild(img);
    imageItem.appendChild(filenameDiv);
    
    // Add click event for download
    imageItem.addEventListener('click', () => {
        downloadImage(filename);
    });
    
    return imageItem;
}

// Function to download image
function downloadImage(filename) {
    const link = document.createElement('a');
    link.href = `skyblockicons/v3/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to load all images dynamically
function loadImages() {
    const imageGrid = document.getElementById('imageGrid');
    
    // Add loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading images...';
    imageGrid.appendChild(loadingDiv);
    
    // Try to fetch file list from server
    fetch('/api/files')
        .then(response => response.json())
        .then(data => {
            if (data.files && data.files.length > 0) {
                displayImages(data.files);
            } else {
                // Fallback: show a message that images are available
                loadingDiv.textContent = 'Images are available! Click any image to download.';
                loadingDiv.style.color = '#4CAF50';
                addInfoMessage();
            }
        })
        .catch(error => {
            console.log('Server not available, showing fallback message');
            loadingDiv.textContent = 'Images are available! Click any image to download.';
            loadingDiv.style.color = '#4CAF50';
            addInfoMessage();
        });
}

// Function to display images in batches
function displayImages(files) {
    const imageGrid = document.getElementById('imageGrid');
    const loadingElement = imageGrid.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
    
    // Add info about total files
    const infoDiv = document.createElement('div');
    infoDiv.style.textAlign = 'center';
    infoDiv.style.color = '#4CAF50';
    infoDiv.style.margin = '20px 0';
    infoDiv.innerHTML = `<p>Loaded ${files.length} images. Click any image to download.</p>`;
    imageGrid.appendChild(infoDiv);
    
    // Load images in batches to avoid overwhelming the browser
    const batchSize = 50;
    let currentIndex = 0;
    
    function loadBatch() {
        const endIndex = Math.min(currentIndex + batchSize, files.length);
        
        for (let i = currentIndex; i < endIndex; i++) {
            const imageItem = createImageItem(files[i]);
            imageGrid.appendChild(imageItem);
        }
        
        currentIndex = endIndex;
        
        if (currentIndex < files.length) {
            // Load next batch after a short delay
            setTimeout(loadBatch, 100);
        }
    }
    
    loadBatch();
}

// Function to add info message when server is not available
function addInfoMessage() {
    const imageGrid = document.getElementById('imageGrid');
    const noteDiv = document.createElement('div');
    noteDiv.style.textAlign = 'center';
    noteDiv.style.color = '#cccccc';
    noteDiv.style.margin = '20px 0';
    noteDiv.innerHTML = `
        <p>All images from the v3 folder are accessible.</p>
        <p>To see all images, run: <code>python server.py</code> and visit <code>http://localhost:8000</code></p>
        <p>Or simply open index.html directly in your browser.</p>
    `;
    imageGrid.appendChild(noteDiv);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadImages); 