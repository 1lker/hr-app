const interviewInvitationEmail = (
  candidateName: string,
  position: string,
  interviewDate: string,
  interviewTime: string,
  interviewLocation: string,
  interviewerName: string,
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
      --primary-color: #1F4087;
      --secondary-color: #1DA3CC;
      --accent-color: #94BC5C;
      --background-color: #F0F4F8;
      --text-color: #2D3748;
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
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: var(--primary-color);
      color: var(--card-background);
      text-align: center;
      padding: 20px;
      position: relative;
    }

    .logo {
      width: 100px;
      height: auto;
      margin-bottom: 10px;
    }

    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="%23FFFFFF" fill-opacity="0.1" d="M0 100 L100 0 L0 0 Z" /></svg>');
      background-size: cover;
      opacity: 0.1;
    }

    h1 {
      font-size: 24px;
      margin: 0;
      position: relative;
      z-index: 1;
    }

    .content {
      padding: 30px;
    }

    h2 {
      color: var(--primary-color);
      border-bottom: 2px solid var(--secondary-color);
      padding-bottom: 10px;
      margin-top: 0;
      font-weight: 500;
    }

    .interview-details {
      background-color: #EBF8FF;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      border-left: 4px solid var(--accent-color);
    }

    .cta-button {
      display: inline-block;
      background-color: var(--secondary-color);
      color: var(--card-background);
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 500;
      margin-top: 20px;
      transition: background-color 0.3s ease, transform 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .cta-button:hover {
      background-color: #1A7F9E;
      transform: translateY(-2px);
    }

    .signature {
      margin-top: 30px;
      border-top: 1px solid var(--secondary-color);
      padding-top: 20px;
      font-style: italic;
    }

    .footer {
      background-color: var(--primary-color);
      color: var(--card-background);
      text-align: center;
      padding: 15px;
      font-size: 12px;
    }

    @media (max-width: 600px) {
      .container {
        margin: 10px;
        width: calc(100% - 20px);
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
      
      <p>We are pleased to invite you for an interview for the position of <strong>${position}</strong> at Bosch. We were impressed with your application and would like to learn more about you.</p>
      
      <div class="interview-details">
        <p><strong>Date:</strong> ${interviewDate}</p>
        <p><strong>Time:</strong> ${interviewTime}</p>
        <p><strong>Location:</strong> ${interviewLocation}</p>
        <p><strong>Interviewer:</strong> ${interviewerName}</p>
      </div>
      
      <p>Please confirm your attendance by clicking the button below:</p>
      
      <a href="#" class="cta-button">Confirm Interview</a>
      
      <p>If you need to reschedule or have any questions, please don't hesitate to contact our HR department at <a href="mailto:${hrEmail}">${hrEmail}</a>.</p>
      
      <p>We look forward to meeting you!</p>
      
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

export default interviewInvitationEmail;
