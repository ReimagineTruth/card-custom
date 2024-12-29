export async function resizeImage(file, maxWidth = 1200) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth) {
                height = (maxWidth * height) / width;
                width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob((blob) => {
                resolve(blob);
            }, file.type);
        };
        img.src = URL.createObjectURL(file);
    });
}

export function validateImage(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid image format. Please use JPG, PNG, GIF, or WebP.');
    }
    
    if (file.size > maxSize) {
        throw new Error('Image size too large. Maximum size is 5MB.');
    }
    
    return true;
}