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
        
        const img = document.createElement('img');
        img.src = imageName;
        img.alt = createImageTitle(imageName);
        img.loading = 'lazy';
        
        // Add error handling for images
        img.onerror = function() {
            console.error(`Failed to load image: ${imageName}`);
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="20" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        overlay.innerHTML = `<h3>${createImageTitle(imageName)}</h3>`;
        
        collageItem.appendChild(img);
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
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    
    lightbox.style.display = 'block';
    lightboxImg.src = images[index];
    caption.textContent = createImageTitle(images[index]);
    
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
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImg.src = images[currentImageIndex];
        caption.textContent = createImageTitle(images[currentImageIndex]);
        lightboxImg.style.opacity = '1';
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
