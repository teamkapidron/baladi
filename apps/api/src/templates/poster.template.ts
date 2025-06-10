export function promotionPosterTemplate(product: {
  name: string;
  price: number;
  originalPrice?: number;
  tagline: string;
  promotionTitle: string;
  image: string;
  backgroundImage?: number;
}) {
  const companyName = 'BALADI';
  const backgroundImageUrl =
    product.backgroundImage ||
    'https://res.cloudinary.com/dv7ar9aca/image/upload/v1748522389/default-background_mw1xib.jpg';
  const companyLogo =
    'https://res.cloudinary.com/dv7ar9aca/image/upload/v1748515719/w700h700_1-removebg-preview_ykrmdu.png';

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${companyName} - ${product.promotionTitle}</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Sora:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'DM Sans', sans-serif;
        color: #183c6c;
        background: #f0f4f8;
      }

      .poster {
        width: 210mm;
        height: 297mm;
        position: relative;
        overflow: hidden;
      }

      .background-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 22%;
        background: linear-gradient(135deg, #7dd3fc 0%, #bae6fd 30%, #e0f2fe 70%, #f8fafc 100%);
        z-index: 0;
      }

      .background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('${backgroundImageUrl}');
        background-size: cover;
        background-position: center;
        opacity: 0.1;
        z-index: 1;
      }

      .content-layer {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 12mm;
        z-index: 2;
      }

      .decorative-element {
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 40%;
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20,20 Q30,10 40,20 Q50,30 60,20 Q70,10 80,20 L80,40 Q70,50 60,40 Q50,30 40,40 Q30,50 20,40 Z" fill="%23ffffff" opacity="0.1"/></svg>');
        background-repeat: no-repeat;
        background-size: contain;
        opacity: 0.3;
        z-index: 1;
      }

      .header {
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: space-between;
        justify-content: space-between;
        z-index: 3;
      }

      .logo {
        height: 55mm;
      }

      .brand-name {
        font-family: 'Sora', sans-serif;
        font-size: 68px;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 3px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
        margin-bottom: 2mm;
      }

      .collection-subtitle {
        font-family: 'DM Sans', sans-serif;
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
        letter-spacing: 1px;
        opacity: 0.9;
      }

      .product-title {
        font-family: 'Sora', sans-serif;
        font-size: 42px;
        font-weight: 700;
        color: #1e3a8a;
        text-align: center;
        margin: 12mm 0;
        line-height: 1.2;
        z-index: 3;
      }

      .product-content {
        display: flex;
        gap: 15mm;
        align-items: flex-start;
        flex: 1;
        z-index: 3;
        margin-bottom: 8mm;
      }

      .product-image-container {
        width: 100mm;
        height: 110mm;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5mm;
      }

      .product-image {
        max-width: 120%;
        max-height: 120%;
        object-fit: contain;
      }

      .product-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6mm;
        height: 100mm;
      }

      .pricing-section {
        background: rgba(255, 255, 255, 0.95);
        padding: 6mm;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      }

      .original-price {
        font-size: 24px;
        color: #94a3b8;
        text-decoration: line-through;
        margin-bottom: 2mm;
      }

      .current-price {
        font-size: 48px;
        font-weight: 800;
        color: #1e3a8a;
        margin-bottom: 4mm;
      }

      .bulk-offer {
        background: linear-gradient(135deg, #dcfce7, #bbf7d0);
        border-left: 6px solid #10b981;
        padding: 4mm;
        border-radius: 8px;
        margin-bottom: 4mm;
      }

      .bulk-title {
        font-weight: 600;
        color: #1e3a8a;
        font-size: 16px;
        margin-bottom: 2mm;
      }

      .bulk-price {
        font-size: 24px;
        font-weight: 700;
        color: #065f46;
      }

      .qr-placeholder {
        width: 25mm;
        height: 25mm;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid #cbd5e1;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: #64748b;
        text-align: center;
        margin-top: auto;
      }

      .special-offer-section {
        background: linear-gradient(135deg, #d97706, #f59e0b);
        color: #ffffff;
        text-align: center;
        padding: 6mm;
        border-radius: 12px;
        margin-bottom: 6mm;
        box-shadow: 0 6px 24px rgba(217, 119, 6, 0.3);
        z-index: 3;
      }

      .special-offer-text {
        font-family: 'Sora', sans-serif;
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 2px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
      }

      .cta-button {
        background: linear-gradient(135deg, #1e3a8a, #3b82f6);
        color: #ffffff;
        border: none;
        border-radius: 12px;
        padding: 8mm 0;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 1px;
        box-shadow: 0 6px 20px rgba(30, 58, 138, 0.4);
        cursor: pointer;
        transition: transform 0.2s;
        z-index: 3;
        margin-top: auto;
      }

      .cta-button:hover {
        transform: translateY(-2px);
      }

      @page {
        size: A4;
        margin: 0;
      }

      @media print {
        .cta-button { display: none; }
      }
    </style>
  </head>
  <body>
    <div class="poster">
      <div class="background-layer"></div>
      <div class="background-image"></div>
      <div class="decorative-element"></div>

      <div class="content-layer">
        <div class="header">
          <div>
            <img src="${companyLogo}" alt="Company Logo" class="logo" />
          </div>
          <div class="brand-name">${companyName}</div>
        </div>

        <div class="product-title">${product.name}</div>

        <div class="product-content">
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image"
              onerror="this.onerror=null;this.src='https://via.placeholder.com/300x300?text=Image+Unavailable';" />
          </div>

          <div class="product-details">
            <div class="pricing-section">
              ${product.originalPrice ? `<div class="original-price">$${product.originalPrice.toFixed(2)}</div>` : ''}
              <div class="current-price">$${product.price.toFixed(2)}</div>

              <div class="bulk-offer">
                <div class="bulk-title">Buy 3 or more:</div>
                <div class="bulk-price">$${(product.price * 0.92).toFixed(2)} each</div>
              </div>
            </div>


          </div>
        </div>

        <div class="special-offer-section">
          <div class="special-offer-text">${product.promotionTitle.toUpperCase()}</div>
        </div>

        <button class="cta-button">ORDER NOW</button>
      </div>
    </div>
  </body>
</html>
`;
}
