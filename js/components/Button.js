export class Button {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.setupButton();
    }

    setupButton() {
        this.element.classList.add(
            'transition-all',
            'duration-200',
            'transform',
            'active:scale-95',
            'flex',
            'items-center',
            'justify-center',
            'gap-2',
            'font-semibold'
        );
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.element.disabled = true;
            this.element.innerHTML = `
                <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            `;
        } else {
            this.element.disabled = false;
            this.element.textContent = this.originalText;
        }
    }
}