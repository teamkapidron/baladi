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
  products: {
    name: string;
    price: number;
    image: string;
  }[],
  customerName: string = 'Valued Customer',
) {
  const productCards = products
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">$${product.price}</div>
      </div>
    </div>
  `,
    )
    .join('');

  return `
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: #f8fafc;
            margin: 0;
            padding: 20px;
          }

          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .header {
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            padding: 32px 24px;
            text-align: center;
            position: relative;
          }

          .logo {
            font-family: 'Sora', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }

          .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            font-weight: 400;
          }

          .content {
            padding: 32px 24px;
          }

          .badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #34d399);
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 20px;
          }

          .greeting {
            font-family: 'Sora', sans-serif;
            font-size: 20px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 12px;
          }

          .intro-text {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 24px;
            line-height: 1.5;
          }

          .products-section {
            margin: 24px 0;
          }

          .products-title {
            font-family: 'Sora', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 16px;
            text-align: center;
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin: 20px 0;
          }

          .product-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .product-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          .product-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
          }

          .product-info {
            padding: 12px;
          }

          .product-name {
            font-family: 'DM Sans', sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #0f172a;
            margin-bottom: 4px;
            line-height: 1.3;
          }

          .product-price {
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: #10b981;
          }

          .cta-container {
            text-align: center;
            margin: 32px 0;
          }

          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-family: 'DM Sans', sans-serif;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.2s ease;
          }

          .cta-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(24, 60, 108, 0.4);
          }

          .footer {
            background: #f1f5f9;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer-text {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 16px;
          }

          .unsubscribe {
            font-size: 12px;
            color: #94a3b8;
          }

          .unsubscribe a {
            color: #64748b;
            text-decoration: none;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-container {
              border-radius: 12px;
            }

            .header {
              padding: 24px 16px;
            }

            .content {
              padding: 24px 16px;
            }

            .products-grid {
              grid-template-columns: 1fr;
              gap: 12px;
            }

            .greeting {
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo">BALADI</div>
            <div class="header-subtitle">Premium Quality, Delivered Fresh</div>
          </div>

          <div class="content">
            <div class="badge">✨ New Arrivals</div>

            <div class="greeting">Hello ${customerName}!</div>

            <div class="intro-text">
              We're excited to share our latest arrivals with you! 
              These premium products have just been added to our collection.
            </div>

            ${
              products.length > 0
                ? `
            <div class="products-section">
              <div class="products-title">Featured New Products</div>
              <div class="products-grid">
                ${productCards}
              </div>
            </div>
            `
                : ''
            }

            <div class="cta-container">
              <a href="#" class="cta-button">Shop New Arrivals</a>
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">
              Thank you for choosing Baladi. We're committed to bringing you
              the finest products with exceptional quality.
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

export function productPromotionTemplate(
  products: {
    name: string;
    price: number;
    image: string;
  }[],
  customerName: string = 'Valued Customer',
) {
  const productCards = products
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">$${product.price}</div>
      </div>
    </div>
  `,
    )
    .join('');

  return `
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: #f8fafc;
            margin: 0;
            padding: 20px;
          }

          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .header {
            background: linear-gradient(135deg, #ff9f45 0%, #f59e0b 50%, #d97706 100%);
            padding: 32px 24px;
            text-align: center;
            position: relative;
          }

          .logo {
            font-family: 'Sora', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }

          .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            font-weight: 400;
          }

          .promotion-badge {
            display: inline-block;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-top: 16px;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }

          .content {
            padding: 32px 24px;
          }

          .badge {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 20px;
          }

          .greeting {
            font-family: 'Sora', sans-serif;
            font-size: 20px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 12px;
          }

          .promo-title {
            font-family: 'Sora', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #f59e0b;
            text-align: center;
            margin-bottom: 16px;
          }

          .intro-text {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 24px;
            line-height: 1.5;
            text-align: center;
          }

          .discount-highlight {
            background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
            text-align: center;
          }

          .discount-text {
            font-family: 'Sora', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #c2410c;
            margin-bottom: 8px;
          }

          .discount-subtitle {
            font-size: 14px;
            color: #9a3412;
          }

          .products-section {
            margin: 24px 0;
          }

          .products-title {
            font-family: 'Sora', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 16px;
            text-align: center;
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin: 20px 0;
          }

          .product-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            position: relative;
          }

          .product-card::before {
            content: 'SALE';
            position: absolute;
            top: 8px;
            right: 8px;
            background: #ef4444;
            color: white;
            font-size: 10px;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 4px;
            z-index: 1;
          }

          .product-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          .product-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
          }

          .product-info {
            padding: 12px;
          }

          .product-name {
            font-family: 'DM Sans', sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #0f172a;
            margin-bottom: 4px;
            line-height: 1.3;
          }

          .product-price {
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: #ef4444;
          }

          .cta-container {
            text-align: center;
            margin: 32px 0;
          }

          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-family: 'DM Sans', sans-serif;
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.2s ease;
          }

          .cta-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
          }

          .footer {
            background: #f1f5f9;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer-text {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 16px;
          }

          .unsubscribe {
            font-size: 12px;
            color: #94a3b8;
          }

          .unsubscribe a {
            color: #64748b;
            text-decoration: none;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-container {
              border-radius: 12px;
            }

            .header {
              padding: 24px 16px;
            }

            .content {
              padding: 24px 16px;
            }

            .products-grid {
              grid-template-columns: 1fr;
              gap: 12px;
            }

            .greeting {
              font-size: 18px;
            }

            .promo-title {
              font-size: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo">BALADI</div>
            <div class="header-subtitle">Premium Quality, Delivered Fresh</div>
            <div class="promotion-badge">🔥 Special Promotion</div>
          </div>

          <div class="content">
            <div class="badge">🎯 Limited Time Offer</div>

            <div class="greeting">Hello ${customerName}!</div>

            <div class="promo-title">Don't Miss Our Special Promotion!</div>

            <div class="intro-text">
              We're offering exclusive discounts on selected premium products. 
              This is your chance to get the best quality at unbeatable prices.
            </div>

            <div class="discount-highlight">
              <div class="discount-text">Save on Premium Products</div>
              <div class="discount-subtitle">Limited time offer - while stocks last</div>
            </div>

            ${
              products.length > 0
                ? `
            <div class="products-section">
              <div class="products-title">Promotional Products</div>
              <div class="products-grid">
                ${productCards}
              </div>
            </div>
            `
                : ''
            }

            <div class="cta-container">
              <a href="#" class="cta-button">Shop Promotion Now</a>
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">
              Don't miss out on these incredible savings! This promotion is for a limited time only.
              <br>Thank you for being a valued customer of Baladi.
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

export function promotionPosterTemplate(
  products: {
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    description?: string;
  }[],
  posterType: 'new-arrival' | 'discounted' = 'discounted',
) {
  const generateProductPage = (product: any, index: number) => {
    const isDiscounted = posterType === 'discounted';
    const hasDiscount =
      product.originalPrice && product.originalPrice > product.price;
    const discountPercent = hasDiscount
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

    return `
      <div class="poster-page" style="page-break-after: ${index < products.length - 1 ? 'always' : 'auto'};">
        <!-- Header Section -->
        <div class="header-section">
          <div class="leaf-decoration leaf-left"></div>
          <div class="leaf-decoration leaf-right"></div>
          <div class="brand-header">
            <h1 class="brand-name">BALADI</h1>
            <p class="brand-subtitle">Premium Collection</p>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <!-- Product Title -->
          <div class="product-title-section">
            <h2 class="product-title">${product.name}</h2>
          </div>

          <!-- Product and Pricing Layout -->
          <div class="product-layout">
            <!-- Product Image -->
            <div class="product-image-container">
              <img src="${product.image}" alt="${product.name}" class="product-image" />
            </div>

            <!-- Pricing Section -->
            <div class="pricing-section">
              ${
                hasDiscount
                  ? `
                <div class="original-price">$${product.originalPrice.toFixed(2)}</div>
              `
                  : ''
              }
              <div class="current-price">$${product.price.toFixed(2)}</div>
              
              ${
                isDiscounted
                  ? `
                <div class="bulk-offer">
                  <div class="bulk-text">Buy 3 or more:</div>
                  <div class="bulk-price">$${(product.price * 0.92).toFixed(2)} each</div>
                </div>
              `
                  : ''
              }
            </div>

            <!-- QR Code Placeholder -->
            <div class="qr-section">
              <div class="qr-placeholder">
                <div class="qr-icon">⊞</div>
              </div>
            </div>
          </div>

          <!-- Special Offer Banner -->
          <div class="offer-banner">
            <h3 class="offer-text">
              ${isDiscounted ? 'SPECIAL RAMADAN OFFER' : 'NEW ARRIVAL COLLECTION'}
            </h3>
          </div>

          <!-- CTA Button -->
          <div class="cta-section">
            <button class="cta-button">
              ${isDiscounted ? 'ORDER NOW' : 'DISCOVER MORE'}
            </button>
          </div>
        </div>
      </div>
    `;
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Baladi Promotion Poster</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', sans-serif;
            background: #ffffff;
            color: #183c6c;
            line-height: 1.4;
          }

          .poster-page {
            width: 210mm;
            height: 297mm;
            position: relative;
            background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          /* Header Section */
          .header-section {
            background: linear-gradient(135deg, #7fb3d4 0%, #5a8db3 50%, #4a7aa0 100%);
            height: 120mm;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .leaf-decoration {
            position: absolute;
            width: 80mm;
            height: 80mm;
            opacity: 0.15;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01MCA5NUMzMC41IDk1IDE1IDc5LjUgMTUgNjBDMTUgNDAuNSAzMC41IDI1IDUwIDI1QzY5LjUgMjUgODUgNDAuNSA4NSA2MEM4NSA3OS41IDY5LjUgOTUgNTAgOTVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHA+CjwvcGF0aD4KPC9zdmc+');
            background-size: contain;
            background-repeat: no-repeat;
          }

          .leaf-left {
            top: -20mm;
            left: -20mm;
            transform: rotate(-25deg);
          }

          .leaf-right {
            top: -10mm;
            right: -30mm;
            transform: rotate(45deg);
          }

          .brand-header {
            text-align: center;
            z-index: 2;
            color: white;
          }

          .brand-name {
            font-family: 'Sora', sans-serif;
            font-size: 48px;
            font-weight: 800;
            letter-spacing: 4px;
            margin-bottom: 8px;
            text-shadow: 0 2px 8px rgba(0,0,0,0.3);
          }

          .brand-subtitle {
            font-size: 18px;
            font-weight: 400;
            letter-spacing: 2px;
            opacity: 0.95;
          }

          /* Main Content */
          .main-content {
            flex: 1;
            padding: 30mm 20mm 20mm 20mm;
            display: flex;
            flex-direction: column;
          }

          .product-title-section {
            text-align: center;
            margin-bottom: 25mm;
          }

          .product-title {
            font-family: 'Sora', sans-serif;
            font-size: 42px;
            font-weight: 700;
            color: #183c6c;
            line-height: 1.2;
            margin-bottom: 5mm;
          }

          /* Product Layout */
          .product-layout {
            display: flex;
            align-items: flex-start;
            gap: 15mm;
            margin-bottom: 20mm;
            flex: 1;
          }

          .product-image-container {
            flex: 1;
            max-width: 80mm;
          }

          .product-image {
            width: 100%;
            height: auto;
            max-height: 100mm;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(24, 60, 108, 0.15);
          }

          .pricing-section {
            flex: 1;
            text-align: left;
            padding-left: 10mm;
          }

          .original-price {
            font-size: 24px;
            color: #94a3b8;
            text-decoration: line-through;
            margin-bottom: 5mm;
            font-weight: 500;
          }

          .current-price {
            font-family: 'Sora', sans-serif;
            font-size: 56px;
            font-weight: 800;
            color: #183c6c;
            margin-bottom: 10mm;
            line-height: 1;
          }

          .bulk-offer {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #0ea5e9;
            border-radius: 12px;
            padding: 15mm 10mm;
            margin-top: 8mm;
          }

          .bulk-text {
            font-size: 18px;
            color: #0369a1;
            font-weight: 600;
            margin-bottom: 3mm;
          }

          .bulk-price {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #0c4a6e;
          }

          .qr-section {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .qr-placeholder {
            width: 35mm;
            height: 35mm;
            border: 3px solid #e2e8f0;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
          }

          .qr-icon {
            font-size: 24px;
            color: #64748b;
          }

          /* Offer Banner */
          .offer-banner {
            text-align: center;
            margin-bottom: 15mm;
          }

          .offer-text {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 3px;
            color: #d97706;
            text-transform: uppercase;
          }

          /* CTA Section */
          .cta-section {
            text-align: center;
          }

          .cta-button {
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            color: white;
            border: none;
            padding: 15mm 25mm;
            border-radius: 12px;
            font-family: 'Sora', sans-serif;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(24, 60, 108, 0.4);
            transition: all 0.3s ease;
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(24, 60, 108, 0.5);
          }

          /* Print Optimization */
          @media print {
            body {
              margin: 0;
              background: white;
            }
            
            .poster-page {
              margin: 0;
              page-break-inside: avoid;
            }
          }

          /* PDF Export Optimization */
          @page {
            size: A4;
            margin: 0;
          }
        </style>
      </head>
      <body>
        ${products.map((product, index) => generateProductPage(product, index)).join('')}
      </body>
    </html>
  `;
}
