const boschColors = {
  lightBlue: '#1DA3CC',
  green: '#2F9F5A',
  red: '#AE1C22',
  darkBlue: '#1F4087',
  purple: '#843376',
  mediumBlue: '#1F6EAD',
  lightGreen: '#94BC5C',
  violet: '#513C8C',
  darkViolet: '#312C6C',
  darkGreen: '#197E38',
  gray: '#F5F5F5',
  darkGray: '#333333',
  white: '#FFFFFF'
};

const offerLetter = (
  candidateName: string,
  position: string,
  startDate: string,
  salary: string,
  department: string,
  managerName: string,
  officeLocation: string,
  hrName: string,
  hrPosition: string,
  offerExpiryDate: string,
  hrEmail: string
) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bosch Offer Letter - ${position}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
      
      body {
        font-family: 'Roboto', Arial, sans-serif;
        line-height: 1.6;
        color: ${boschColors.darkGray};
        margin: 0;
        padding: 0;
        background-color: ${boschColors.gray};
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        background-color: ${boschColors.white};
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: ${boschColors.darkBlue};
        color: ${boschColors.white};
        text-align: center;
        padding: 40px 20px;
        background-image: url('/bosch-corporate-color-bg-image.png');
        background-size: cover;
        background-position: center;
      }
      .logo {
        width: 180px;
        height: auto;
        margin-bottom: 20px;
        background-color: ${boschColors.white};
        padding: 10px;
        border-radius: 50%;
      }
      h1 {
        font-size: 28px;
        margin: 0;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      }
      .content {
        padding: 40px;
      }
      h2 {
        color: ${boschColors.darkBlue};
        border-bottom: 2px solid ${boschColors.lightBlue};
        padding-bottom: 10px;
        margin-top: 0;
      }
      h3 {
        color: ${boschColors.mediumBlue};
      }
      .offer-details, .benefits-list {
        background-color: ${boschColors.gray};
        border-radius: 5px;
        padding: 20px;
        margin-bottom: 20px;
      }
      .offer-details li, .benefits-list li {
        margin-bottom: 10px;
      }
      .benefits-list li:before {
        content: "✓";
        color: ${boschColors.green};
        padding-right: 10px;
        font-weight: bold;
      }
      .cta-button {
        display: inline-block;
        background-color: ${boschColors.green};
        color: ${boschColors.white};
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 20px;
        transition: background-color 0.3s ease;
      }
      .cta-button:hover {
        background-color: ${boschColors.darkGreen};
      }
      .signature {
        margin-top: 40px;
        border-top: 1px solid ${boschColors.lightBlue};
        padding-top: 20px;
      }
      .footer {
        background-color: ${boschColors.darkBlue};
        color: ${boschColors.white};
        text-align: center;
        padding: 20px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="/bosch-email-logo.webp" alt="Bosch Logo" class="logo">
        <h1>Welcome to the Bosch Family</h1>
      </div>
      
      <div class="content">
        <h2>Dear ${candidateName},</h2>
        
        <p>We are thrilled to offer you the position of <strong>${position}</strong> at Bosch. Your skills, experience, and enthusiasm make you an excellent fit for our team, and we are confident that you will make significant contributions to our organization.</p>
        
        <h3>Offer Details</h3>
        <ul class="offer-details">
          <li><strong>Position:</strong> ${position}</li>
          <li><strong>Department:</strong> ${department}</li>
          <li><strong>Start Date:</strong> ${startDate}</li>
          <li><strong>Salary:</strong> ${salary} per annum</li>
          <li><strong>Reporting To:</strong> ${managerName}</li>
          <li><strong>Office Location:</strong> ${officeLocation}</li>
        </ul>
        
        <h3>Benefits Package</h3>
        <ul class="benefits-list">
          <li>Comprehensive health, dental, and vision insurance</li>
          <li>401(k) retirement plan with company match</li>
          <li>Generous paid time off and holidays</li>
          <li>Professional development and training opportunities</li>
          <li>Employee discount program</li>
          <li>Flexible work arrangements</li>
        </ul>
        
        <p>At Bosch, we are committed to innovation, quality, and sustainability. We believe that your talents will contribute significantly to our mission of improving quality of life worldwide through our products and services.</p>
        
        <p>To accept this offer, please sign and return the enclosed copy of this letter by ${offerExpiryDate}. If you have any questions or need additional information, please don't hesitate to contact our HR department at ${hrEmail}.</p>
        
        <a href="#" class="cta-button">Accept Offer</a>
        
        <div class="signature">
          <p>
            Sincerely,<br>
            ${hrName}<br>
            ${hrPosition}<br>
            Bosch Group
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

export default offerLetter;
