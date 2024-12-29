import { getFileExtension, getMimeType, generateFileName } from '../utils/fileUtils.js';
import { resizeImage, validateImage } from '../utils/imageUtils.js';

export class ImageService {
    static async processUpload(file) {
        try {
            validateImage(file);
            const resizedImage = await resizeImage(file);
            return resizedImage;
        } catch (error) {
            throw new Error(`Failed to process image: ${error.message}`);
        }
    }

    static async saveImage(imageElement) {
        try {
            const canvas = await html2canvas(imageElement);
            const extension = 'png';
            const fileName = generateFileName('custom-card', extension);
            
            const blob = await new Promise(resolve => {
                canvas.toBlob(blob => resolve(blob), getMimeType(extension));
            });
            
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            throw new Error(`Failed to save image: ${error.message}`);
        }
    }
}