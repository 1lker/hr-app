const advancedInterviewInvitationEmail = (
  candidateName: string,
  position: string,
  interviewDate: string,
  interviewTime: string,
  interviewLocation: string,
  interviewerName: string,
  teamsMeetingLink: string,
  teamsMeetingID: string,
  teamsPasscode: string,
  hrName: string,
  hrPosition: string,
  hrEmail: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interview Invitation - Bosch HR</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    
    :root {
      --primary-color: #005691;
      --secondary-color: #E20015;
      --accent-color: #94BC5C;
      --background-color: #F0F4F8;
      --text-color: #333333;
      --card-background: #FFFFFF;
    }

    body {
      font-family: 'Roboto', Arial, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      margin: 0;
      padding: 0;
      background-color: var(--background-color);
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: var(--card-background);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-image: url('/bosch-corporate-color-bg-image.png');
      background-size: cover;
      color: var(--card-background);
      text-align: center;
      padding: 30px 20px;
      position: relative;
    }

    .logo {
      width: 100px;
      height: auto;
      margin-bottom: 10px;
      background-color: var(--card-background);
      border-radius: 50%;
    }

    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="%23FFFFFF" fill-opacity="0.1" d="M0 100 C 20 0, 50 0, 100 100 Z" /></svg>');
      background-size: cover;
      opacity: 0.1;
    }

    h1 {
      font-size: 28px;
      margin: 0;
      position: relative;
      z-index: 1;
    }

    .content {
      padding: 40px;
    }

    h2 {
      color: var(--primary-color);
      font-size: 24px;
      border-bottom: 2px solid var(--secondary-color);
      padding-bottom: 10px;
      margin-top: 0;
      font-weight: 500;
    }

    .interview-details, .teams-details {
      background-color: #EBF8FF;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 30px;
      border-left: 4px solid var(--accent-color);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .interview-details h3, .teams-details h3 {
      color: var(--primary-color);
      margin-top: 0;
      font-size: 20px;
    }

    .detail-row {
      display: flex;
      margin-bottom: 15px;
    }

    .detail-label {
      flex: 0 0 120px;
      font-weight: bold;
      color: var(--primary-color);
    }

    .detail-value {
      flex: 1;
    }

    .teams-logo {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 10px;
    }

    .cta-button {
      display: inline-block;
      background-color: var(--secondary-color);
      color: var(--card-background);
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 500;
      font-size: 16px;
      margin-top: 20px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(226, 0, 21, 0.3);
    }

    .cta-button:hover {
      background-color: #C5000F;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(226, 0, 21, 0.4);
    }

    .signature {
      margin-top: 40px;
      border-top: 1px solid var(--accent-color);
      padding-top: 20px;
      font-style: italic;
    }

    .footer {
      background-color: var(--primary-color);
      color: var(--card-background);
      text-align: center;
      padding: 20px;
      font-size: 14px;
    }

    @media (max-width: 600px) {
      .container {
        margin: 10px;
        width: calc(100% - 20px);
      }
      .content {
        padding: 20px;
      }
      .detail-row {
        flex-direction: column;
      }
      .detail-label {
        margin-bottom: 5px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-bg"></div>
      <img src="/bosch-email-logo.webp" alt="Bosch Logo" class="logo">
      <h1>Interview Invitation</h1>
    </div>
    
    <div class="content">
      <h2>Dear ${candidateName},</h2>
      
      <p>We are excited to invite you for an interview for the position of <strong>${position}</strong> at Bosch. Your application has impressed us, and we're looking forward to getting to know you better.</p>
      
      <div class="interview-details">
        <h3>Interview Details</h3>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${interviewDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span class="detail-value">${interviewTime}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Location:</span>
          <span class="detail-value">${interviewLocation}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Interviewer:</span>
          <span class="detail-value">${interviewerName}</span>
        </div>
      </div>
      
      <div class="teams-details">
        <h3><img src="https://img.icons8.com/color/48/000000/microsoft-teams.png" alt="Teams Logo" class="teams-logo">Microsoft Teams Meeting</h3>
        <p>You can join the interview via Microsoft Teams using the following details:</p>
        <div class="detail-row">
          <span class="detail-label">Meeting Link:</span>
          <span class="detail-value"><a href="${teamsMeetingLink}" style="color: #0078d4;">${teamsMeetingLink}</a></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Meeting ID:</span>
          <span class="detail-value">${teamsMeetingID}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Passcode:</span>
          <span class="detail-value">${teamsPasscode}</span>
        </div>
      </div>
      
      <p>Please confirm your attendance by clicking the button below:</p>
      
      <a href="#" class="cta-button">Confirm Interview</a>
      
      <p>If you need to reschedule or have any questions, please don't hesitate to contact our HR department at <a href="mailto:${hrEmail}" style="color: var(--primary-color);">${hrEmail}</a>.</p>
      
      <p>We're looking forward to meeting you and discussing how your skills and experiences align with our team at Bosch.</p>
      
      <div class="signature">
        <p>
          Best regards,<br>
          ${hrName}<br>
          ${hrPosition}<br>
          Bosch HR Department
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p>Robert Bosch GmbH | Robert-Bosch-Platz 1 | 70839 Gerlingen-Schillerhöhe | Germany</p>
      <p>&copy; ${new Date().getFullYear()} Robert Bosch GmbH. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export default advancedInterviewInvitationEmail;
