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

export function newArrivalTemplate(
  productName: string,
  productDescription: string,
  productPrice: string,
  productImage: string,
  customerName: string,
  validUntil?: string,
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Arrival - ${productName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Lato', sans-serif;
            line-height: 1.6;
            color: #222222;
            background: linear-gradient(135deg, #f1f5fa 0%, #e8f1fc 100%);
            margin: 0;
            padding: 20px;
          }

          .email-container {
            max-width: 650px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(31, 54, 92, 0.15);
          }

          .header {
            background: linear-gradient(135deg, #1f365c 0%, #2f4e78 50%, #4f7eaa 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            );
            animation: shimmer 20s linear infinite;
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .logo {
            position: relative;
            z-index: 2;
            display: inline-block;
            background: rgba(255,255,255,0.1);
            padding: 15px 25px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
          }

          .logo-text {
            font-family: 'Albert Sans', sans-serif;
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 2px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }

          .header-subtitle {
            position: relative;
            z-index: 2;
            color: rgba(255,255,255,0.9);
            font-size: 16px;
            margin-top: 15px;
            font-weight: 300;
          }

          .content {
            padding: 40px 30px;
          }

          .new-arrival-badge {
            display: inline-block;
            background: linear-gradient(135deg, #4caf50, #66bb6a);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 25px;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
          }

          .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1f365c;
            margin-bottom: 15px;
            font-family: 'Albert Sans', sans-serif;
          }

          .intro-text {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.7;
          }

          .product-showcase {
            background: linear-gradient(135deg, #f8fbff 0%, #f1f5fa 100%);
            border-radius: 20px;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid rgba(79, 126, 170, 0.1);
            position: relative;
            overflow: hidden;
          }

          .product-showcase::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #1f365c, #4f7eaa, #1f365c);
          }

          .product-image {
            width: 100%;
            max-width: 300px;
            height: 200px;
            object-fit: cover;
            border-radius: 15px;
            margin: 0 auto 25px;
            display: block;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .product-image:hover {
            transform: scale(1.02);
          }

          .product-name {
            font-family: 'Albert Sans', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #1f365c;
            text-align: center;
            margin-bottom: 15px;
            line-height: 1.3;
          }

          .product-description {
            font-size: 16px;
            color: #555;
            text-align: center;
            margin-bottom: 25px;
            line-height: 1.6;
          }

          .price-container {
            text-align: center;
            margin-bottom: 30px;
          }

          .price {
            font-size: 32px;
            font-weight: 700;
            color: #4caf50;
            font-family: 'Albert Sans', sans-serif;
          }

          .price-label {
            font-size: 14px;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }

          .cta-container {
            text-align: center;
            margin: 40px 0;
          }

          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #1f365c 0%, #4f7eaa 100%);
            color: white;
            text-decoration: none;
            padding: 18px 40px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(31, 54, 92, 0.3);
            border: none;
            cursor: pointer;
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(31, 54, 92, 0.4);
          }

          .validity-notice {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border-left: 4px solid #ff9800;
            padding: 20px;
            border-radius: 10px;
            margin: 30px 0;
            font-size: 14px;
            color: #e65100;
          }

          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
          }

          .footer-text {
            font-size: 14px;
            color: #6c757d;
            margin-bottom: 15px;
          }

          .social-links {
            margin: 20px 0;
          }

          .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: #1f365c;
            border-radius: 50%;
            margin: 0 8px;
            line-height: 40px;
            color: white;
            text-decoration: none;
            transition: background 0.3s ease;
          }

          .social-link:hover {
            background: #4f7eaa;
          }

          .unsubscribe {
            font-size: 12px;
            color: #adb5bd;
            margin-top: 20px;
          }

          .unsubscribe a {
            color: #6c757d;
            text-decoration: none;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-container {
              border-radius: 15px;
            }

            .header {
              padding: 30px 20px;
            }

            .content {
              padding: 30px 20px;
            }

            .product-showcase {
              padding: 20px;
            }

            .logo-text {
              font-size: 24px;
            }

            .greeting {
              font-size: 20px;
            }

            .product-name {
              font-size: 24px;
            }

            .price {
              font-size: 28px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo-text">BALADI</div>
            <div class="logo">

              <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
            </div>
            <div class="header-subtitle">Premium Quality, Delivered Fresh</div>
          </div>

          <div class="content">
            <div class="new-arrival-badge">✨ New Arrival</div>

            <div class="greeting">Hello ${customerName}!</div>

            <div class="intro-text">
              We're excited to introduce our latest addition to the Baladi family.
              This premium product has just arrived and we thought you'd love to be among
              the first to experience its exceptional quality.
            </div>

            <div class="product-showcase">
              <img src="${productImage}" alt="${productName}" class="product-image" />

              <div class="product-name">${productName}</div>

              <div class="product-description">${productDescription}</div>

              <div class="price-container">
                <div class="price-label">Special Launch Price</div>
                <div class="price">${productPrice}</div>
              </div>
            </div>

            <div class="cta-container">
              <a href="#" class="cta-button">Order Now</a>
            </div>

            ${
              validUntil
                ? `
              <div class="validity-notice">
                <strong>⏰ Limited Time Offer:</strong> This special pricing is valid until ${validUntil}.
                Don't miss out on this exclusive opportunity!
              </div>
            `
                : ''
            }
          </div>

          <div class="footer">
            <div class="footer-text">
              Thank you for choosing Baladi. We're committed to bringing you
              the finest products with exceptional quality and service.
            </div>

            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">📸</a>
              <a href="#" class="social-link">🐦</a>
            </div>

            <div class="unsubscribe">
              © ${new Date().getFullYear()} Baladi. All rights reserved.<br>
              <a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function campaignTemplate(
  campaignTitle: string,
  campaignDescription: string,
  discountPercentage: string,
  featuredProducts: Array<{
    name: string;
    originalPrice: string;
    salePrice: string;
    image: string;
  }>,
  customerName: string,
  validFrom: string,
  validUntil: string,
  campaignCode?: string,
) {
  const productCards = featuredProducts
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-card-image" />
      <div class="product-card-content">
        <h3 class="product-card-name">${product.name}</h3>
        <div class="product-card-prices">
          <span class="original-price">${product.originalPrice}</span>
          <span class="sale-price">${product.salePrice}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${campaignTitle} - Baladi Campaign</title>
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Lato', sans-serif;
            line-height: 1.6;
            color: #222222;
            background: linear-gradient(135deg, #f1f5fa 0%, #e8f1fc 100%);
            margin: 0;
            padding: 20px;
          }

          .email-container {
            max-width: 700px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 25px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(31, 54, 92, 0.2);
          }

          .header {
            background: linear-gradient(135deg, #1f365c 0%, #2f4e78 30%, #4f7eaa 70%, #66bb6a 100%);
            padding: 50px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }

          .logo {
            position: relative;
            z-index: 2;
            display: inline-block;
            background: rgba(255,255,255,0.15);
            padding: 20px 30px;
            border-radius: 20px;
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255,255,255,0.3);
            margin-bottom: 25px;
          }

          .logo-text {
            font-family: 'Albert Sans', sans-serif;
            font-size: 36px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 3px;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
          }

          .campaign-badge {
            position: relative;
            z-index: 2;
            display: inline-block;
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white;
            padding: 12px 30px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 20px;
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .discount-circle {
            position: relative;
            z-index: 2;
            display: inline-block;
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #4caf50, #66bb6a);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.4);
            border: 4px solid rgba(255,255,255,0.3);
          }

          .discount-text {
            color: white;
            font-family: 'Albert Sans', sans-serif;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }

          .content {
            padding: 50px 30px;
          }

          .greeting {
            font-size: 28px;
            font-weight: 600;
            color: #1f365c;
            margin-bottom: 20px;
            font-family: 'Albert Sans', sans-serif;
            text-align: center;
          }

          .campaign-title {
            font-size: 32px;
            font-weight: 700;
            color: #2f4e78;
            text-align: center;
            margin-bottom: 20px;
            font-family: 'Albert Sans', sans-serif;
            line-height: 1.2;
          }

          .campaign-description {
            font-size: 18px;
            color: #555;
            text-align: center;
            margin-bottom: 40px;
            line-height: 1.7;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .validity-info {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
            border: 2px solid rgba(33, 150, 243, 0.2);
          }

          .validity-title {
            font-weight: 700;
            color: #1976d2;
            font-size: 18px;
            margin-bottom: 10px;
            font-family: 'Albert Sans', sans-serif;
          }

          .validity-dates {
            font-size: 16px;
            color: #0d47a1;
            font-weight: 600;
          }

          ${
            campaignCode
              ? `
            .promo-code {
              background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
              border: 2px dashed #ff9800;
              border-radius: 15px;
              padding: 25px;
              margin: 30px 0;
              text-align: center;
            }

            .promo-code-label {
              font-size: 14px;
              color: #e65100;
              text-transform: uppercase;
              font-weight: 600;
              letter-spacing: 1px;
              margin-bottom: 10px;
            }

            .promo-code-value {
              font-size: 24px;
              font-weight: 700;
              color: #bf360c;
              font-family: 'Albert Sans', sans-serif;
              letter-spacing: 3px;
              background: rgba(255,255,255,0.7);
              padding: 10px 20px;
              border-radius: 10px;
              display: inline-block;
            }
          `
              : ''
          }

          .products-section {
            margin: 50px 0;
          }

          .products-title {
            font-size: 24px;
            font-weight: 700;
            color: #1f365c;
            text-align: center;
            margin-bottom: 30px;
            font-family: 'Albert Sans', sans-serif;
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 25px;
            margin: 30px 0;
          }

          .product-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid rgba(79, 126, 170, 0.1);
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
          }

          .product-card-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
          }

          .product-card-content {
            padding: 20px;
          }

          .product-card-name {
            font-size: 16px;
            font-weight: 600;
            color: #1f365c;
            margin-bottom: 15px;
            font-family: 'Albert Sans', sans-serif;
            line-height: 1.3;
          }

          .product-card-prices {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .original-price {
            font-size: 14px;
            color: #999;
            text-decoration: line-through;
          }

          .sale-price {
            font-size: 18px;
            font-weight: 700;
            color: #4caf50;
            font-family: 'Albert Sans', sans-serif;
          }

          .cta-container {
            text-align: center;
            margin: 50px 0;
          }

          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #1f365c 0%, #4f7eaa 100%);
            color: white;
            text-decoration: none;
            padding: 20px 50px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(31, 54, 92, 0.3);
            border: none;
            cursor: pointer;
          }

          .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(31, 54, 92, 0.4);
          }

          .footer {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 40px 30px;
            text-align: center;
            border-top: 1px solid #dee2e6;
          }

          .footer-text {
            font-size: 14px;
            color: #6c757d;
            margin-bottom: 20px;
            line-height: 1.6;
          }

          .social-links {
            margin: 25px 0;
          }

          .social-link {
            display: inline-block;
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, #1f365c, #4f7eaa);
            border-radius: 50%;
            margin: 0 10px;
            line-height: 45px;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 18px;
          }

          .social-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(31, 54, 92, 0.3);
          }

          .unsubscribe {
            font-size: 12px;
            color: #adb5bd;
            margin-top: 25px;
            line-height: 1.5;
          }

          .unsubscribe a {
            color: #6c757d;
            text-decoration: none;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-container {
              border-radius: 20px;
            }

            .header {
              padding: 40px 20px;
            }

            .content {
              padding: 40px 20px;
            }

            .logo-text {
              font-size: 28px;
              letter-spacing: 2px;
            }

            .campaign-title {
              font-size: 24px;
            }

            .greeting {
              font-size: 22px;
            }

            .products-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .discount-circle {
              width: 100px;
              height: 100px;
            }

            .discount-text {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
            </div>

            <div class="campaign-badge">🎯 Special Campaign</div>

            <div class="discount-circle">
              <div class="discount-text">${discountPercentage}</div>
            </div>
          </div>

          <div class="content">
            <div class="greeting">Hello ${customerName}!</div>

            <div class="campaign-title">${campaignTitle}</div>

            <div class="campaign-description">${campaignDescription}</div>

            <div class="validity-info">
              <div class="validity-title">🗓️ Campaign Period</div>
              <div class="validity-dates">${validFrom} - ${validUntil}</div>
            </div>

            ${
              campaignCode
                ? `
              <div class="promo-code">
                <div class="promo-code-label">Use Promo Code</div>
                <div class="promo-code-value">${campaignCode}</div>
              </div>
            `
                : ''
            }

            <div class="products-section">
              <div class="products-title">Featured Campaign Products</div>
              <div class="products-grid">
                ${productCards}
              </div>
            </div>

            <div class="cta-container">
              <a href="#" class="cta-button">Shop Campaign Now</a>
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">
              Don't miss out on these incredible savings! This campaign is for a limited time only.
              <br>Thank you for being a valued customer of Baladi.
            </div>

            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">📸</a>
              <a href="#" class="social-link">🐦</a>
              <a href="#" class="social-link">💼</a>
            </div>

            <div class="unsubscribe">
              © ${new Date().getFullYear()} Baladi. All rights reserved.<br>
              <a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a> | <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function ljabruFruktmarkedTemplate(
  title: string,
  subtitle: string,
  products: Array<{
    name: string;
    price: string;
    image: string;
    description: string;
  }>,
  customerName: string,
  specialOffer?: string,
  validUntil?: string,
) {
  const productRows = products
    .map(
      (product) => `
    <tr>
      <td style="padding: 20px; border-bottom: 1px solid #e9ecef;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="120" style="padding-right: 20px; vertical-align: top;">
              <img src="${product.image}" alt="${product.name}"
                   style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px; border: 2px solid #4caf50;">
            </td>
            <td style="vertical-align: top;">
              <h3 style="margin: 0 0 8px 0; font-family: 'Albert Sans', sans-serif; font-size: 18px; color: #1f365c; font-weight: 600;">
                ${product.name}
              </h3>
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; line-height: 1.5;">
                ${product.description}
              </p>
              <div style="font-size: 20px; font-weight: 700; color: #4caf50; font-family: 'Albert Sans', sans-serif;">
                ${product.price}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `,
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - Ljabru Fruktmarked Style</title>
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Lato', sans-serif; line-height: 1.6; color: #222222; margin: 0; padding: 20px; background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(76, 175, 80, 0.15);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #81c784 100%); padding: 40px 30px; text-align: center; position: relative;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <!-- Logo -->
                    <div style="display: inline-block; background: rgba(255,255,255,0.15); padding: 20px 30px; border-radius: 15px; margin-bottom: 20px; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3);">
                      <img src="${COMPANY_LOGO}" alt="Baladi Logo" style="max-width: 150px; height: auto;">
                    </div>

                    <!-- Fresh badge -->
                    <div style="display: inline-block; background: linear-gradient(135deg, #2e7d32, #388e3c); color: white; padding: 10px 25px; border-radius: 25px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);">
                      🌱 Farm Fresh Quality
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">

              <!-- Greeting -->
              <h2 style="margin: 0 0 15px 0; font-size: 24px; font-weight: 600; color: #2e7d32; font-family: 'Albert Sans', sans-serif; text-align: center;">
                Hello ${customerName}! 🌟
              </h2>

              <!-- Title -->
              <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #1f365c; font-family: 'Albert Sans', sans-serif; text-align: center; line-height: 1.3;">
                ${title}
              </h1>

              <!-- Subtitle -->
              <p style="margin: 0 0 30px 0; font-size: 16px; color: #555; text-align: center; line-height: 1.7;">
                ${subtitle}
              </p>

              ${
                specialOffer
                  ? `
                <!-- Special Offer -->
                <div style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); border: 2px solid #ffc107; border-radius: 15px; padding: 25px; margin: 30px 0; text-align: center;">
                  <h3 style="margin: 0 0 10px 0; font-family: 'Albert Sans', sans-serif; font-size: 20px; color: #e65100; font-weight: 700;">
                    🎉 Special Offer
                  </h3>
                  <p style="margin: 0; font-size: 16px; color: #bf360c; font-weight: 600;">
                    ${specialOffer}
                  </p>
                </div>
              `
                  : ''
              }

              <!-- Products Section -->
              <div style="margin: 40px 0;">
                <h3 style="margin: 0 0 25px 0; font-size: 22px; font-weight: 700; color: #2e7d32; text-align: center; font-family: 'Albert Sans', sans-serif;">
                  🥬 Fresh from our Market
                </h3>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f8fff8; border-radius: 15px; border: 1px solid rgba(76, 175, 80, 0.2); overflow: hidden;">
                  ${productRows}
                </table>
              </div>

              ${
                validUntil
                  ? `
                <!-- Validity Notice -->
                <div style="background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-left: 4px solid #4caf50; padding: 20px; border-radius: 10px; margin: 30px 0;">
                  <p style="margin: 0; font-size: 14px; color: #2e7d32; font-weight: 600;">
                    🕒 <strong>Available until:</strong> ${validUntil}
                  </p>
                </div>
              `
                  : ''
              }

              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="#" style="display: inline-block; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); color: white; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-size: 16px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3); transition: all 0.3s ease;">
                  🛒 Visit Our Market
                </a>
              </div>

              <!-- Quality Promise -->
              <div style="background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%); border-radius: 15px; padding: 25px; margin: 30px 0; text-align: center; border: 1px solid rgba(129, 199, 132, 0.3);">
                <h4 style="margin: 0 0 15px 0; font-family: 'Albert Sans', sans-serif; font-size: 18px; color: #2e7d32; font-weight: 600;">
                  🌿 Our Quality Promise
                </h4>
                <p style="margin: 0; font-size: 14px; color: #388e3c; line-height: 1.6;">
                  Every product is carefully selected from local farmers and suppliers who share our commitment
                  to quality, freshness, and sustainable practices. From farm to your table, we ensure the highest standards.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); padding: 30px; text-align: center; border-top: 1px solid #a5d6a7;">

              <p style="margin: 0 0 20px 0; font-size: 14px; color: #2e7d32; line-height: 1.6;">
                Thank you for choosing Baladi - where quality meets tradition.<br>
                Fresh. Local. Sustainable.
              </p>

              <!-- Social Links -->
              <div style="margin: 20px 0;">
                <a href="#" style="display: inline-block; width: 40px; height: 40px; background: #4caf50; border-radius: 50%; margin: 0 8px; line-height: 40px; color: white; text-decoration: none; font-size: 16px;">📘</a>
                <a href="#" style="display: inline-block; width: 40px; height: 40px; background: #4caf50; border-radius: 50%; margin: 0 8px; line-height: 40px; color: white; text-decoration: none; font-size: 16px;">📸</a>
                <a href="#" style="display: inline-block; width: 40px; height: 40px; background: #4caf50; border-radius: 50%; margin: 0 8px; line-height: 40px; color: white; text-decoration: none; font-size: 16px;">🐦</a>
              </div>

              <!-- Footer Text -->
              <div style="font-size: 12px; color: #558b2f; margin-top: 20px;">
                © ${new Date().getFullYear()} Baladi - Ljabru Fruktmarked Style. All rights reserved.<br>
                <a href="#" style="color: #689f38; text-decoration: none;">Unsubscribe</a> |
                <a href="#" style="color: #689f38; text-decoration: none;">Contact Us</a>
              </div>

            </td>
          </tr>

        </table>

      </body>
    </html>
  `;
}
