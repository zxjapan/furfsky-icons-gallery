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
    
    imageItem.addEventListener('click', () => {
        downloadImage(filename);
    });
    
    return imageItem;
}

function downloadImage(filename) {
    const link = document.createElement('a');
    link.href = `skyblockicons/v3/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function loadImages() {
    const imageGrid = document.getElementById('imageGrid');
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading images...';
    imageGrid.appendChild(loadingDiv);
    
    fetch('/api/files')
        .then(response => response.json())
        .then(data => {
            if (data.files && data.files.length > 0) {
                displayImages(data.files);
            } else {
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

function displayImages(files) {
    const imageGrid = document.getElementById('imageGrid');
    const loadingElement = imageGrid.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
    
    const infoDiv = document.createElement('div');
    infoDiv.style.textAlign = 'center';
    infoDiv.style.color = '#4CAF50';
    infoDiv.style.margin = '20px 0';
    infoDiv.innerHTML = `<p>Loaded ${files.length} images. Click any image to download.</p>`;
    imageGrid.appendChild(infoDiv);
    
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
            setTimeout(loadBatch, 100);
        }
    }
    
    loadBatch();
}

function addInfoMessage() {
    const imageGrid = document.getElementById('imageGrid');
    const noteDiv = document.createElement('div');
    noteDiv.style.textAlign = 'center';
    noteDiv.style.color = '#cccccc';
    noteDiv.style.margin = '20px 0';
    noteDiv.innerHTML = `
        <p>All images from the v3 folder are accessible.</p>
    `;
    imageGrid.appendChild(noteDiv);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadImages); 
