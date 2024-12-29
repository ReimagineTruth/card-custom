import { ImageService } from './services/imageService.js';

export async function handleImagePreview(input, cardSide) {
    input.addEventListener('change', async () => {
        const file = input.files[0];
        if (!file) return;

        try {
            const processedImage = await ImageService.processUpload(file);
            const imageUrl = URL.createObjectURL(processedImage);
            cardSide.style.backgroundImage = `url('${imageUrl}')`;
        } catch (error) {
            alert(error.message);
        }
    });
}

export async function handleImageDownload(element) {
    try {
        await ImageService.saveImage(element);
    } catch (error) {
        alert(error.message);
    }
}