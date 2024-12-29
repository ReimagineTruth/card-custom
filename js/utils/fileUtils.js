export function getFileExtension(file) {
    return file.name.split('.').pop().toLowerCase();
}

export function getMimeType(extension) {
    const mimeTypes = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'webp': 'image/webp'
    };
    return mimeTypes[extension] || 'image/png';
}

export function generateFileName(prefix, extension) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${prefix}-${timestamp}.${extension}`;
}