'use client';

import React, { useState } from 'react';
import offerLetter from '@/components/email-templates/job-offer-email-template';
import modernFileUploadReminderEmail from '@/components/email-templates/modern-file-upload-reminder-email';
import modernApprovedDocumentEmail from '@/components/email-templates/modern-approved-document-email';
import rejectedDocumentEmail from '@/components/email-templates/rejected-document-email';
import applicationConfirmationEmail from '@/components/email-templates/application-confirmation-email';
import interviewInvitationEmail from '@/components/email-templates/interview-invitation-email';
import advancedInterviewInvitationEmail from '@/components/email-templates/advanced-interview-invitation-email';

const EmailTemplatePreview = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('offerLetter');

  const offerLetterHtml = offerLetter(
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

  const fileUploadReminderHtml = modernFileUploadReminderEmail(
    'John Doe',
    ['Resume', 'Cover Letter', 'References'],
    'August 31, 2024',
    'Serkan Budakli',
    'Human Resources Manager',
    'serkan@bosch.com'
  );

  const approvedDocumentHtml = modernApprovedDocumentEmail(
    'John Doe',
    ['Resume', 'Cover Letter', 'References'],
    'Serkan Budakli',
    'Human Resources Manager',
    'serkan@bosch.com'
  );

  const rejectedDocumentHtml = rejectedDocumentEmail(
    'John Doe',
    [
      {
        name: 'Resume',
        reason: 'File format not supported. Please submit in PDF format.'
      },
      {
        name: 'ID Photo',
        reason: 'Image resolution too low. Please provide a high-quality photo.'
      }
    ],
    'Serkan Budakli',
    'Human Resources Manager',
    'serkan@bosch.com'
  );

  const applicationConfirmationHtml = applicationConfirmationEmail(
    'John Doe',
    'Software Engineer',
    'APP-12345',
    'Serkan Budakli',
    'Human Resources Manager',
    'serkan@bosch.com'
  );

  const interviewInvitationHtml = interviewInvitationEmail(
    'John Doe',
    'Software Engineer',
    'September 15, 2024',
    '10:00 AM',
    'Bosch Palo Alto Office, 4th Floor, Room 405',
    'Jane Smith',
    'Serkan Budakli',
    'Human Resources Manager',
    'serkan@bosch.com'
  );

  const advancedInterviewInvitationHtml = advancedInterviewInvitationEmail(
    'John Doe',
    'Software Engineer',
    'September 15, 2024',
    '10:00 AM',
    'Bosch Palo Alto Office, 4th Floor, Room 405',
    'Jane Smith',
    'https://teams.microsoft.com/l/meetup-join/meeting_link_here',
    '123 456 789',
    '987654',
    'Serkan Budakli',
    'Human Resources Manager',
    'serkan@bosch.com'
  );

  const htmlContent = {
    offerLetter: offerLetterHtml,
    fileUploadReminder: fileUploadReminderHtml,
    approvedDocument: approvedDocumentHtml,
    rejectedDocument: rejectedDocumentHtml,
    applicationConfirmation: applicationConfirmationHtml,
    interviewInvitation: interviewInvitationHtml,
    advancedInterviewInvitation: advancedInterviewInvitationHtml
  }[selectedTemplate];

  return (
    <div className="bg-gray-100 flex min-h-screen w-full flex-col items-center justify-start p-4">
      <h1 className="mb-4 text-2xl font-bold">Email Template Preview</h1>
      <div className="mb-4 w-full max-w-4xl">
        <label
          htmlFor="template-select"
          className="text-gray-700 mb-2 block text-sm font-medium"
        >
          Select Template:
        </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="border-gray-300 mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="offerLetter">Offer Letter</option>
          <option value="fileUploadReminder">File Upload Reminder</option>
          <option value="approvedDocument">Approved Document</option>
          <option value="rejectedDocument">Rejected Document</option>
          <option value="applicationConfirmation">
            Application Confirmation
          </option>
          <option value="interviewInvitation">Interview Invitation</option>
          <option value="advancedInterviewInvitation">
            Advanced Interview Invitation
          </option>
        </select>
      </div>
      <iframe
        srcDoc={htmlContent}
        title="Email Template Preview"
        className="border-gray-300 h-[800px] w-full max-w-4xl rounded-lg border-2 shadow-lg"
      />
    </div>
  );
};

export default EmailTemplatePreview;
