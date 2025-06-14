export function promotionPosterTemplate(product: {
  name: string;
  price: number;
  originalPrice?: number;
  tagline: string;
  promotionTitle: string;
  image: string;
  backgroundImage?: number;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Premium Organic Apples</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Georgia', serif;
      background: #fdf9f4;
      color: #0b2559;
      text-align: center;
    }

    .header {
      background: linear-gradient(to bottom, #5a7793, #7b93a8);
      padding: 40px 0 20px;
      color: white;
    }

    .logo {
      height: 100px;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    .header h1 {
      margin: 0;
      font-size: 38px;
      letter-spacing: 1.5px;
    }

    .header p {
      font-size: 20px;
      margin-top: 5px;
    }

    .title {
      margin: 40px 0 20px;
      font-size: 48px;
      font-weight: bold;
      line-height: 1.2;
    }

    .product-img {
      width: 250px;
      height: auto;
      margin: 20px auto;
    }

    .price-box {
      font-size: 32px;
      margin-top: 10px;
    }

    .price-box .original {
      text-decoration: line-through;
      color: #888;
      font-size: 24px;
    }

    .price-box .discounted {
      font-size: 48px;
      font-weight: bold;
      color: #0b2559;
    }

    .bulk-offer {
      font-size: 22px;
      margin-top: 10px;
    }

    .special-offer {
      margin-top: 60px;
      font-size: 28px;
      color: #9b772c;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .order-button {
      margin-top: 30px;
      background-color: #0b2559;
      color: white;
      font-size: 28px;
      padding: 20px 40px;
      border-radius: 10px;
      display: inline-block;
      font-weight: bold;
    }

    .order-button:hover {
      background-color: #163a6a;
    }

    .spacer {
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <div class="header">
    <img src="https://s3.ap-south-1.amazonaws.com/kapidron.public/baladi.png" alt="Company Logo" class="logo">
    <p>Premium Collection</p>
  </div>

  <div class="title">Premium Organic <br> Apples</div>

  <img src="https://res.cloudinary.com/dv7ar9aca/image/upload/v1749557763/iFOnK_Tagine_hvit_stor_b__nner_1_kg_x_20_1_cxiuvr.png" alt="Choultra Premium Apples" class="product-img">

  <div class="price-box">
    <div class="original">1150.00 kr</div>
    <div class="discounted">120.00 kr</div>
    <div class="bulk-offer">Buy 3 or more: <strong>110.00 kr</strong> each</div>
  </div>

  <div class="special-offer">SPECIAL RAMADAN OFFER</div>

  <div class="order-button">ORDER NOW</div>

</body>
</html>
`;
}

export function multiProductPromotionTemplate(products: {
  promotionTitle: string;
  tagline: string;
  items: {
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
  }[];
}) {
  const productBlocks = products.items
    .map(
      (p) => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" class="product-img" />
      <h3 class="product-name">${p.name}</h3>
      <div class="price-box">
        ${
          p.originalPrice
            ? `<div class="original">${p.originalPrice.toFixed(2)} kr</div>`
            : ''
        }
        <div class="discounted">${p.price.toFixed(2)} kr</div>
      </div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${products.promotionTitle}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Georgia', serif;
      background: #fdf9f4;
      color: #0b2559;
      text-align: center;
    }

    .header {
      background: linear-gradient(to bottom, #5a7793, #7b93a8);
      padding: 40px 0 20px;
      color: white;
    }

    .logo {
      height: 100px;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    .header h1 {
      margin: 0;
      font-size: 38px;
      letter-spacing: 1.5px;
    }

    .header p {
      font-size: 20px;
      margin-top: 5px;
    }

    .title {
      margin: 40px 0 20px;
      font-size: 42px;
      font-weight: bold;
      line-height: 1.2;
    }

    .products-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 30px;
      margin: 30px auto;
      max-width: 1000px;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
      width: 280px;
    }

    .product-img {
      width: 100%;
      height: auto;
      margin-bottom: 15px;
    }

    .product-name {
      font-size: 20px;
      margin: 10px 0;
    }

    .price-box {
      font-size: 22px;
    }

    .price-box .original {
      text-decoration: line-through;
      color: #888;
      font-size: 18px;
    }

    .price-box .discounted {
      font-size: 26px;
      font-weight: bold;
      color: #0b2559;
    }

    .order-button {
      margin-top: 40px;
      background-color: #0b2559;
      color: white;
      font-size: 24px;
      padding: 15px 30px;
      border-radius: 10px;
      display: inline-block;
      font-weight: bold;
    }

    .order-button:hover {
      background-color: #163a6a;
    }
  </style>
</head>
<body>

  <div class="header">
    <img src="https://s3.ap-south-1.amazonaws.com/kapidron.public/baladi.png" alt="Company Logo" class="logo">
    <p>${products.tagline}</p>
  </div>

  <div class="title">${products.promotionTitle}</div>

  <div class="products-container">
    ${productBlocks}
  </div>

  <div class="order-button">ORDER NOW</div>

</body>
</html>`;
}
