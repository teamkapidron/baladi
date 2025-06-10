const COMPANY_LOGO =
  'https://res.cloudinary.com/dv7ar9aca/image/upload/v1748515719/w700h700_1-removebg-preview_ykrmdu.png';

export function otpVerificationTemplate(name: string, otp: string) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .otp-container {
            background-color: #f7f7f7;
            border-radius: 5px;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            letter-spacing: 5px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
            </div>
            <h2>Email Verification</h2>
          </div>
          <p>Hello ${name},</p>
          <p>Thank you for registering with Baladi. To complete your registration, please use the following OTP to verify your email address:</p>
          <div class="otp-container">
            <strong>${otp}</strong>
          </div>
          <p>This OTP is valid for 10 minutes. If you did not request this verification, please ignore this email.</p>
          <p>Best regards,<br>Baladi Team</p>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function adminApprovalTemplate(
  name: string,
  email: string,
  userId: string,
) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .user-details {
            background-color: #f7f7f7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
            </div>
            <h2>New User Registration</h2>
          </div>
          <p>Hello Admin,</p>
          <p>A new user has registered and verified their email address. Please review and approve their account:</p>
          <div class="user-details">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>User ID:</strong> ${userId}</p>
          </div>
          <p>Please log in to the admin panel to approve this user and assign their user type (internal or external).</p>
          <p>Best regards,<br>Baladi System</p>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function welcomeTemplate(name: string, userType: string) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .highlight {
            font-weight: bold;
            color: #4285f4;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
            </div>
            <h2>Welcome to Baladi!</h2>
          </div>
          <p>Hello ${name},</p>
          <p>Congratulations! Your account has been approved as a <span class="highlight">${userType}</span> user.</p>
          <p>You can now log in to your account and start using our platform.</p>
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>Baladi Team</p>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function passwordResetTemplate(name: string, resetLink: string) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            background-color: #4285f4;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
            </div>
            <h2>Password Reset Request</h2>
          </div>
          <p>Hello ${name},</p>
          <p>We received a request to reset your password. Click the button below to set a new password:</p>
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,<br>Baladi Team</p>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function adminCredentialsTemplate(name: string, password: string) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .credentials {
            background-color: #f7f7f7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
          }
          .password {
            font-family: monospace;
            font-size: 18px;
            background: #e9ecef;
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #ced4da;
          }
          .warning {
            color: #dc3545;
            font-weight: bold;
            margin: 15px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
            </div>
            <h2>Your Admin Account Credentials</h2>
          </div>
          <p>Hello ${name},</p>
          <p>Your admin account has been created successfully. Here are your login credentials:</p>
          <div class="credentials">
            <p><strong>Your temporary password is:</strong></p>
            <p class="password">${password}</p>
          </div>
          <p class="warning">Please change this password immediately after your first login for security purposes.</p>
          <p>Best regards,<br>Baladi Team</p>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
            <p>If you did not request an admin account, please contact us immediately.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function warehouseNotificationTemplate(
  orderNumber: string,
  productName: string,
  quantity: number,
  customerName: string,
) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
          }
          .order-details {
            background-color: #f7f7f7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
          .important {
            color: #d9534f;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
            </div>
            <h2>New Order Ready for Processing</h2>
          </div>
          <p>Hello Warehouse Team,</p>
          <p>A new order has been confirmed and is ready for processing. Please find the picking list and freight slip attached to this email.</p>
          <div class="order-details">
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Customer:</strong> ${customerName}</p>
          </div>
          <p class="important">Please process this order as soon as possible.</p>
          <p>The attached documents include:</p>
          <ol>
            <li>Picking List - Use this to locate and collect the items</li>
            <li>Freight Slip - Attach this to the package for shipping</li>
          </ol>
          <p>Best regards,<br>Baladi System</p>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
