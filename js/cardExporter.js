export async function saveCardImage(card) {
    const canvas = await html2canvas(card);
    // Use standard download approach instead of showSaveFilePicker
    const link = document.createElement('a');
    link.download = 'custom-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

export async function downloadCardImage(card) {
    const canvas = await html2canvas(card);
    const link = document.createElement('a');
    link.download = 'custom-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}