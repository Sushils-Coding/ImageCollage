// Array of images in the folder
const images = [
    'donation event page.png',
    'donation event-detail page.png',
    'donation_event_create_page.png',
    'event page.png',
    'event-detail page.png',
    'event_create_page.png',
    'volunteer page design.png',
    'WhatsApp Image 2025-10-13 at 10.51.11 AM.jpeg'
];

// Current image index for lightbox navigation
let currentImageIndex = 0;

// Function to create image title from filename
function createImageTitle(filename) {
    return filename
        .replace(/\.(png|jpg|jpeg|gif)$/i, '')
        .replace(/[_-]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Function to load images into the collage grid
function loadImages() {
    const collageGrid = document.getElementById('collageGrid');
    
    images.forEach((imageName, index) => {
        const collageItem = document.createElement('div');
        collageItem.className = 'collage-item';
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.className = 'collage-canvas';
        
        // Load image and draw on canvas
        const img = new Image();
        img.src = imageName;
        
        img.onload = function() {
            // Set canvas size to match image aspect ratio
            const maxWidth = 600;
            const maxHeight = 400;
            let width = img.width;
            let height = img.height;
            
            // Calculate aspect ratio
            const aspectRatio = width / height;
            
            if (width > maxWidth) {
                width = maxWidth;
                height = width / aspectRatio;
            }
            
            if (height > maxHeight) {
                height = maxHeight;
                width = height * aspectRatio;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
        };
        
        // Add error handling for images
        img.onerror = function() {
            console.error(`Failed to load image: ${imageName}`);
            canvas.width = 400;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ddd';
            ctx.fillRect(0, 0, 400, 300);
            ctx.fillStyle = '#999';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Image not found', 200, 150);
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        overlay.innerHTML = `<h3>${createImageTitle(imageName)}</h3>`;
        
        collageItem.appendChild(canvas);
        collageItem.appendChild(overlay);
        
        // Add click event to open lightbox
        collageItem.addEventListener('click', () => openLightbox(index));
        
        collageGrid.appendChild(collageItem);
    });
}

// Function to open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxCanvas = document.getElementById('lightbox-canvas');
    const caption = document.getElementById('caption');
    
    lightbox.style.display = 'block';
    caption.textContent = createImageTitle(images[index]);
    
    // Load image and draw on lightbox canvas
    const img = new Image();
    img.src = images[index];
    
    img.onload = function() {
        // Calculate dimensions to fit screen while maintaining aspect ratio
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.8;
        let width = img.width;
        let height = img.height;
        
        const aspectRatio = width / height;
        
        if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
        }
        
        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }
        
        lightboxCanvas.width = width;
        lightboxCanvas.height = height;
        
        const ctx = lightboxCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
    };
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

// Function to close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Function to navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

// Function to navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

// Function to update lightbox image
function updateLightboxImage() {
    const lightboxCanvas = document.getElementById('lightbox-canvas');
    const caption = document.getElementById('caption');
    
    lightboxCanvas.style.opacity = '0';
    
    setTimeout(() => {
        caption.textContent = createImageTitle(images[currentImageIndex]);
        
        // Load new image and draw on canvas
        const img = new Image();
        img.src = images[currentImageIndex];
        
        img.onload = function() {
            // Calculate dimensions to fit screen while maintaining aspect ratio
            const maxWidth = window.innerWidth * 0.9;
            const maxHeight = window.innerHeight * 0.8;
            let width = img.width;
            let height = img.height;
            
            const aspectRatio = width / height;
            
            if (width > maxWidth) {
                width = maxWidth;
                height = width / aspectRatio;
            }
            
            if (height > maxHeight) {
                height = maxHeight;
                width = height * aspectRatio;
            }
            
            lightboxCanvas.width = width;
            lightboxCanvas.height = height;
            
            const ctx = lightboxCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            lightboxCanvas.style.opacity = '1';
        };
    }, 150);
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    
    // Set up lightbox event listeners
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const lightbox = document.getElementById('lightbox');
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });
});

// Add smooth transition for lightbox image
const style = document.createElement('style');
style.textContent = `
    .lightbox-content {
        transition: opacity 0.15s ease;
    }
`;
document.head.appendChild(style);
