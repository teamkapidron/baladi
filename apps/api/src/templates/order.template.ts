import { OrderResponse } from '@/types/order.types';

export function pickingListTemplate(order: OrderResponse) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Picking List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      background-color: #f4f4f4;
      color: #333;
    }

    .sheet {
      background: white;
      padding: 30px;
      max-width: 800px;
      margin: auto;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    h1 {
      margin-bottom: 5px;
    }

    .top-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .summary {
      font-weight: bold;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 12px;
      text-align: left;
    }

    th {
      background-color: #eee;
    }

    .order-header {
      background-color: #f8f8f8;
      font-weight: bold;
      padding: 10px;
      border: 1px solid #ddd;
      margin-top: 20px;
    }

    .order-header span {
      font-weight: normal;
      float: right;
      font-size: 14px;
      color: #555;
    }

    .checkbox {
      text-align: center;
    }

    .dashed-row td {
      border-style: dashed;
    }
  </style>
</head>
<body>

  <div class="sheet">
    <div class="top-info">
      <div>
        <h1>Pick List</h1>
        <div><strong>Baladi Engros</strong></div>
      </div>
      <div style="text-align: right;">
        <strong>Date:</strong> ${new Date().toLocaleDateString()}
      </div>
    </div>

    <div class="summary">
      You are picking for ${order.items.length} shipment:
      &nbsp;&nbsp;&nbsp; Total Items: ${order.items.length} &nbsp;&nbsp;&nbsp; Total Quantity: ${order.items.reduce((total, item) => total + item.quantity, 0)}
    </div>

    <div class="order-header">
      Order #${order._id.toString()} <span>Attn: ${order.userId.name}</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Qty</th>
          <th>SKU</th>
          <th>Barcode</th>
          <th>Picked</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map(
          (item) => `
          <tr class="dashed-row">
            <td>${item.productId.name ?? 'N/A'}</td>
            <td>${item.quantity ?? 'N/A'}</td>
            <td>${item.productId.sku ?? 'N/A'}</td>
            <td>${item.productId.barcode ?? 'N/A'}</td>
            <td class="checkbox">☐</td>
          </tr>
        `,
        )}
      </tbody>
    </table>
  </div>

</body>
</html>
`;
}

export function freightLabelTemplate(order: OrderResponse) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #fff;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .label {
      padding: 30px;
      width: 100%;
      max-width: 800px;
      box-sizing: border-box;
    }

    .section {
      margin-bottom: 25px;
    }

    .section h2 {
      margin: 0 0 10px;
      font-size: 28px;
      border-bottom: 1px solid #000;
      padding-bottom: 5px;
    }

    .section div {
      margin-bottom: 6px;
      font-size: 25px;
      line-height: 1.4;
    }

    .barcode-box {
      margin-top: 30px;
      text-align: center;
    }

    .barcode-box .barcode {
      font-size: 24px;
      letter-spacing: 4px;
    }

    .footer {
      text-align: right;
      font-size: 12px;
      color: #555;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <div class="label">
    <div class="section">
      <h2>Shipping From</h2>
      <div><strong>Baladi Engros</strong></div>
      <div>Andersrudveien 1</div>
      <div>1914 Ytre Enebakk</div>
      <div>Norway</div>
    </div>

    <div class="section">
      <h2>Shipping To</h2>
      <div><strong>${order.userId.name}</strong></div>
      <div>${order.shippingAddress.addressLine1}</div>
      <div>${order.shippingAddress.addressLine2}</div>
      <div>
        ${order.shippingAddress.city}, ${order.shippingAddress.state}
        ${order.shippingAddress.postalCode}
      </div>
      <div>${order.shippingAddress.country}</div>
    </div>

    <div class="section">
      <h2>Order Info</h2>
      <div><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</div>
      <div><strong>Total Items:</strong> ${order.items.length}</div>
      <div><strong>Total Quantity:</strong> ${order.items.reduce((sum, i) => sum + i.quantity, 0)}</div>
    </div>

    <div class="barcode-box">
      <div class="barcode">${order._id.toString().toUpperCase()}</div>
    </div>

    <div class="footer">
      Printed on ${new Date().toLocaleString()}
    </div>
  </div>

</body>
</html>
`;
}
