import React, { RefObject } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaDownload } from 'react-icons/fa';

type ExportPDFProps = {
  contentRef: RefObject<HTMLDivElement>;
};

const ExportPDF: React.FC<ExportPDFProps> = ({ contentRef }) => {
  const exportPDF = async () => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    try {
      // Capture content with a lower scale value (e.g., scale: 1.5 instead of 2)
      const canvas = await html2canvas(element, { scale: 1.5 }); // Reduce scale to fit better
      const imgData = canvas.toDataURL('image/png'); // Convert to image

      const pdf = new jsPDF({
        orientation: 'landscape', // Adjust orientation: 'portrait' or 'landscape'
        unit: 'pt', // Units: pt (points), mm (millimeters), cm (centimeters), etc.
        format: 'a4', // PDF format
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Adjust image width/height to fit the page correctly (prevent zoom)
      let imgWidth = pageWidth;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If the image height exceeds the page height, scale it down
      if (imgHeight > pageHeight) {
        const scaleFactor = pageHeight / imgHeight;
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
      }

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('exported-page.pdf'); // Save the PDF
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  return (
    <div className="flex items-center">
      {/* Icon for small screens */}
      <div
        className="md:hidden flex items-center text-gray-700 cursor-pointer"
        onClick={exportPDF}
      >
        <FaDownload size={20} />
      </div>

      {/* Button for medium and larger screens */}
      <button
        onClick={exportPDF}
        className="hidden md:block py-2 rounded-md text-sm text-darkColor focus:shadow-md cursor-pointer active:bg-primaryColor active:text-white"
      >
        Export
      </button>
    </div>

  );
};

export default ExportPDF;
