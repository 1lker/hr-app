// components/OfferLetterPreview.tsx
import React from 'react';
import offerLetter from '@/components/email-templates/job-offer-email-template';

const OfferLetterPreview = () => {
  const htmlContent = offerLetter(
    'John Doe',
    'Software Engineer',
    'September 1, 2024',
    '$120,000',
    'Research and Development',
    'Jane Smith',
    'Palo Alto, CA',
    'Serkan Budakli',
    'Human Resources Manager',
    '23.09.2024',
    'serkan@bosch.com'
  );

  return (
    <div className="bg-gray-100 flex min-h-screen w-full flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Offer Letter Preview</h1>
      <iframe
        srcDoc={htmlContent}
        title="Offer Letter Preview"
        className="border-gray-300 h-[800px] w-full max-w-4xl rounded-lg border-2 shadow-lg"
      />
    </div>
  );
};

export default OfferLetterPreview;
