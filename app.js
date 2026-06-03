// Initialize operational architecture triggers when document loads
document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;
    
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const generateBtn = document.getElementById('generateBtn');
    
    let base64ImageData = null;

    // Monitor file interface inputs to render attachment state
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = `📎 ${file.name}`;
            fileNameDisplay.classList.remove('text-slate-500');
            fileNameDisplay.classList.add('text-emerald-400');

            // Process image element to base64 binary formatting for canvas placement
            const reader = new FileReader();
            reader.onload = (event) => {
                base64ImageData = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = 'No image attached (Optional)';
            fileNameDisplay.classList.replace('text-emerald-400', 'text-slate-500');
            base64ImageData = null;
        }
    });

    // Compilation controller engine
    generateBtn.addEventListener('click', () => {
        const textContent = document.getElementById('pdfText').value.trim();
        const alignment = document.getElementById('textAlignment').value;

        if (!textContent && !base64ImageData) {
            alert('Sir, please enter some text content or upload an image to construct the PDF compilation matrix.');
            return;
        }

        // Create standard pristine white canvas A4 Document
        // Dimensions: 210mm x 297mm
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth(); // 210
        let currentY = 25; // Dynamic margin layout cursor

        // Compile text layer if data exists
        if (textContent) {
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(12);
            doc.setTextColor(15, 23, 42); // Clean off-black slate tone text color

            // Process multi-line text mapping to prevent page overflow cutting
            const textLines = doc.splitTextToSize(textContent, 170); // 170mm width text boundaries
            
            textLines.forEach(line => {
                let xCoordinate = 20; // Default left edge layout marker
                
                // Real-time calculation matrix for user chosen geometry alignment
                if (alignment === 'center') {
                    xCoordinate = pageWidth / 2;
                } else if (alignment === 'right') {
                    xCoordinate = pageWidth - 20;
                }

                doc.text(line, xCoordinate, currentY, { align: alignment });
                currentY += 7; // Line spacing progression index
            });
        }

        // Compile image matrix layer if object is attached
        if (base64ImageData) {
            currentY += 10; // Buffer spacing threshold below content layer
            
            const targetWidth = 120; // Explicit horizontal scaling metrics (120mm)
            const targetHeight = 80;  // Explicit vertical scaling metrics (80mm)
            let imageX = 20;          // Default left anchor point

            // Recalculate horizontal vector coordinates to match desired position alignment
            if (alignment === 'center') {
                imageX = (pageWidth - targetWidth) / 2;
            } else if (alignment === 'right') {
                imageX = pageWidth - targetWidth - 20;
            }

            // Verify element won't overflow the page bounds, add page if required
            if (currentY + targetHeight > 275) {
                doc.addPage();
                currentY = 25; // Reset tracking matrix cursor on new canvas page
            }

            try {
                doc.addImage(base64ImageData, 'JPEG', imageX, currentY, targetWidth, targetHeight);
            } catch (error) {
                console.error("Matrix compilation failure during rendering image node:", error);
            }
        }

        // Export system save prompt to trigger device browser asset downpour
        doc.save('Compiled_Document.pdf');
    });
});
