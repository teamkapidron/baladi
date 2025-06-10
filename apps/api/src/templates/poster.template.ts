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
