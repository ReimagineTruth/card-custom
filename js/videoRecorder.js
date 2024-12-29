export class VideoRecorder {
    constructor(element) {
        this.element = element;
        this.mediaRecorder = null;
        this.chunks = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
    }

    setupCanvas() {
        const rect = this.element.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    async startRecording() {
        this.chunks = [];
        const stream = this.canvas.captureStream(30); // 30 FPS
        this.mediaRecorder = new MediaRecorder(stream);
        
        this.mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };

        this.startDrawing();
        this.mediaRecorder.start();
    }

    startDrawing() {
        let lastTime = 0;
        const animate = (currentTime) => {
            if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') return;

            const deltaTime = currentTime - lastTime;
            if (deltaTime > 1000 / 30) { // Limit to 30 FPS
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                html2canvas(this.element).then(renderedCanvas => {
                    this.ctx.drawImage(renderedCanvas, 0, 0);
                });
                lastTime = currentTime;
            }
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    async stopRecording() {
        return new Promise((resolve) => {
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.chunks, { 
                    type: 'video/webm' // Using WebM format for better browser support
                });
                resolve(blob);
            };
            this.mediaRecorder.stop();
        });
    }
}