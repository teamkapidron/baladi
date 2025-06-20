export function newArrivalTemplate(
  products: {
    name: string;
    price: number;
    image: string;
  }[],
  customerName: string = 'Verdsatt Kunde',
) {
  const productCards = products
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">${product.price} kr</div>
      </div>
    </div>
  `,
    )
    .join('');

  return `
    <html lang="no">
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
            <div class="header-subtitle">Premium Kvalitet, Levert Friskt</div>
          </div>

          <div class="content">
            <div class="badge">✨ Nye Ankomster</div>

            <div class="greeting">Hei ${customerName}!</div>

            <div class="intro-text">
              Vi er glade for å dele våre nyeste ankomster med deg!
              Disse premium produktene har nettopp blitt lagt til i vår samling.
            </div>

            ${
              products.length > 0
                ? `
            <div class="products-section">
              <div class="products-title">Utvalgte Nye Produkter</div>
              <div class="products-grid">
                ${productCards}
              </div>
            </div>
            `
                : ''
            }

            <div class="cta-container">
              <a href="#" class="cta-button">Handle Nye Ankomster</a>
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">
              Takk for at du velger Baladi. Vi er forpliktet til å bringe deg
              de fineste produktene med eksepsjonell kvalitet.
            </div>

            <div class="unsubscribe">
              © ${new Date().getFullYear()} Baladi. Alle rettigheter reservert.<br>
              <a href="#">Avmeld</a> | <a href="#">Oppdater Preferanser</a>
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
  customerName: string = 'Verdsatt Kunde',
) {
  const productCards = products
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">${product.price} kr</div>
      </div>
    </div>
  `,
    )
    .join('');

  return `
    <html lang="no">
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
            content: 'SALG';
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
            <div class="header-subtitle">Premium Kvalitet, Levert Friskt</div>
            <div class="promotion-badge">🔥 Spesiell Kampanje</div>
          </div>

          <div class="content">
            <div class="badge">🎯 Begrenset Tilbud</div>

            <div class="greeting">Hei ${customerName}!</div>

            <div class="promo-title">Ikke Gå Glipp Av Vår Spesielle Kampanje!</div>

            <div class="intro-text">
              Vi tilbyr eksklusive rabatter på utvalgte premium produkter.
              Dette er din sjanse til å få beste kvalitet til uslåelige priser.
            </div>

            <div class="discount-highlight">
              <div class="discount-text">Spar på Premium Produkter</div>
              <div class="discount-subtitle">Begrenset tilbud - så lenge lageret rekker</div>
            </div>

            ${
              products.length > 0
                ? `
            <div class="products-section">
              <div class="products-title">Kampanjeprodukter</div>
              <div class="products-grid">
                ${productCards}
              </div>
            </div>
            `
                : ''
            }

            <div class="cta-container">
              <a href="#" class="cta-button">Handle Kampanje Nå</a>
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">
              Ikke gå glipp av disse utrolige besparelsene! Denne kampanjen varer kun i begrenset tid.
              <br>Takk for at du er en verdsatt kunde av Baladi.
            </div>

            <div class="unsubscribe">
              © ${new Date().getFullYear()} Baladi. Alle rettigheter reservert.<br>
              <a href="#">Avmeld</a> | <a href="#">Oppdater Preferanser</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
