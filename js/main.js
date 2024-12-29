import { Button } from './components/Button.js';
import { handleImagePreview, handleImageDownload } from './imageHandler.js';
import { Modal } from './modal.js';
import { VideoRecorder } from './videoRecorder.js';
import { downloadFile } from './exportUtils.js';

// Initialize elements
const frontInput = document.getElementById('frontImageInput');
const backInput = document.getElementById('backImageInput');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const saveImageBtn = new Button(document.getElementById('saveImage'));
const downloadImageBtn = new Button(document.getElementById('downloadImage'));
const recordBtn = new Button(document.getElementById('recordVideo'));
const modal = document.getElementById('myModal');
const closeModal = document.querySelector('.close');
const card = document.querySelector('.card');

// Setup image handlers
handleImagePreview(frontInput, cardFront);
handleImagePreview(backInput, cardBack);

// Initialize modal and video recorder
const cardModal = new Modal(modal, closeModal);
const videoRecorder = new VideoRecorder(card);
let isRecording = false;

// Setup event handlers
cardFront.addEventListener('click', () => cardModal.show());

saveImageBtn.element.addEventListener('click', async () => {
    saveImageBtn.setLoading(true);
    try {
        await handleImageDownload(card);
    } finally {
        saveImageBtn.setLoading(false);
    }
});

downloadImageBtn.element.addEventListener('click', async () => {
    downloadImageBtn.setLoading(true);
    try {
        await handleImageDownload(card);
    } finally {
        downloadImageBtn.setLoading(false);
    }
});

recordBtn.element.addEventListener('click', async () => {
    if (!isRecording) {
        try {
            recordBtn.setLoading(true);
            await videoRecorder.startRecording();
            isRecording = true;
            recordBtn.element.textContent = 'Stop Recording';
            recordBtn.element.classList.remove('btn-primary');
            recordBtn.element.classList.add('btn-danger');
        } catch (error) {
            console.error('Failed to start recording:', error);
            alert('Failed to start recording. Please try again.');
        } finally {
            recordBtn.setLoading(false);
        }
    } else {
        try {
            recordBtn.setLoading(true);
            const videoBlob = await videoRecorder.stopRecording();
            isRecording = false;
            recordBtn.element.textContent = 'Record Video';
            recordBtn.element.classList.remove('btn-danger');
            recordBtn.element.classList.add('btn-primary');
            downloadFile(videoBlob, 'card-animation.webm');
        } catch (error) {
            console.error('Failed to stop recording:', error);
            alert('Failed to save recording. Please try again.');
        } finally {
            recordBtn.setLoading(false);
        }
    }
});