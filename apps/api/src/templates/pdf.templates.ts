import { OrderResponse } from '@/types/order.types';

export function pickingListTemplate(order: OrderResponse) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Picking List - Order #${order._id.toString()}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          margin: 15mm;
        }
        
        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.3;
          color: #000;
          background: #fff;
        }
        
        .container {
          width: 100%;
          max-width: 100%;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 15px;
        }
        
        .logo {
          height: 60px;
          width: auto;
        }
        
        .header-info {
          text-align: right;
        }
        
        .company-name {
          font-size: 20px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 5px;
        }
        
        .document-title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }
        
        .order-section {
          background: #f8f9fa;
          padding: 15px;
          margin-bottom: 20px;
          border-left: 4px solid #2563eb;
        }
        
        .order-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }
        
        .order-item {
          margin-bottom: 8px;
        }
        
        .label {
          font-weight: bold;
          font-size: 10px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        
        .value {
          font-size: 12px;
          color: #000;
          font-weight: 500;
        }
        
        .items-title {
          font-size: 16px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 15px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        
        .items-table th {
          background: #2563eb;
          color: white;
          padding: 8px;
          text-align: left;
          font-weight: bold;
          font-size: 11px;
        }
        
        .items-table td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
          font-size: 11px;
        }
        
        .items-table tr:nth-child(even) {
          background: #f9f9f9;
        }
        
        .quantity-highlight {
          font-weight: bold;
          color: #2563eb;
          font-size: 14px;
          text-align: center;
        }
        
        .total-summary {
          background: #e8f5e8;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        
        .total-summary h3 {
          color: #059669;
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .signature-row {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
        }
        
        .signature-box {
          width: 180px;
          text-align: center;
        }
        
        .signature-line {
          border-top: 1px solid #333;
          margin-bottom: 5px;
          height: 30px;
        }
        
        .signature-label {
          font-size: 10px;
          font-weight: bold;
          color: #666;
        }
        
        .footer {
          margin-top: 20px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
          text-align: center;
          font-size: 10px;
          color: #666;
        }
        
        .notes-section {
          background: #fff3cd;
          border: 1px solid #ffc107;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 4px;
        }
        
        .notes-title {
          font-weight: bold;
          color: #856404;
          margin-bottom: 5px;
        }
        
        .notes-text {
          color: #856404;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <img src="https://res.cloudinary.com/dv7ar9aca/image/upload/v1748515719/w700h700_1-removebg-preview_ykrmdu.png" alt="Baladi Engross" class="logo">
          <div class="header-info">
            <div class="company-name">Baladi Engross</div>
            <div class="document-title">PICKING LIST</div>
          </div>
        </div>
        
        <!-- Order Information -->
        <div class="order-section">
          <div class="order-grid">
            <div class="order-item">
              <div class="label">Order ID</div>
              <div class="value">#${order._id.toString()}</div>
            </div>
            <div class="order-item">
              <div class="label">Customer</div>
              <div class="value">${order.userId.name}</div>
            </div>
            <div class="order-item">
              <div class="label">Status</div>
              <div class="value">${order.status.toUpperCase()}</div>
            </div>
            <div class="order-item">
              <div class="label">Date</div>
              <div class="value">${new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="order-item">
              <div class="label">Total Amount</div>
              <div class="value">$${order.totalAmount.toFixed(2)}</div>
            </div>
            <div class="order-item">
              <div class="label">Customer Email</div>
              <div class="value">${order.userId.email}</div>
            </div>
          </div>
        </div>
        
        <!-- Items to Pick -->
        <div class="items-title">Items to Pick</div>
        <table class="items-table">
          <thead>
            <tr>
              <th style="width: 8%">#</th>
              <th style="width: 50%">Product Name</th>
              <th style="width: 15%">Quantity</th>
              <th style="width: 15%">Unit Price</th>
              <th style="width: 12%">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td><strong>${(item.productId as any)?.name || 'Product'}</strong><br><small>ID: ${typeof item.productId === 'object' ? (item.productId as any)._id : item.productId}</small></td>
                <td class="quantity-highlight">${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><strong>$${(item.quantity * item.price).toFixed(2)}</strong></td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>
        
        <div class="total-summary">
          <h3>Total Items to Pick: ${order.items.reduce((total, item) => total + item.quantity, 0)} items</h3>
          <p>Total Products: ${order.items.length} different products</p>
        </div>
        
        ${
          order.notes
            ? `
        <div class="notes-section">
          <div class="notes-title">Special Notes</div>
          <div class="notes-text">${order.notes}</div>
        </div>
        `
            : ''
        }
        
        <!-- Signatures -->
        <div class="signature-row">
          <div class="signature-box">
            <div class="signature-line"></div>
            <div class="signature-label">Picker Signature</div>
          </div>
          <div class="signature-box">
            <div class="signature-line"></div>
            <div class="signature-label">Date & Time</div>
          </div>
          <div class="signature-box">
            <div class="signature-line"></div>
            <div class="signature-label">Supervisor</div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p>Generated: ${new Date().toLocaleString()}</p>
          <p>Baladi Engross - Picking List</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function freightLabelTemplate(order: OrderResponse) {
  const formatAddress = (addr: OrderResponse['shippingAddress']) => {
    if (!addr) return 'Address not provided';
    return `${addr.addressLine1}${addr.addressLine2 ? ', ' + addr.addressLine2 : ''}, ${addr.city}, ${addr.state} ${addr.postalCode}, ${addr.country}`;
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Freight Label - ${order._id.toString()}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          margin: 5mm;
          size: 4in 6in;
        }
        
        body {
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.2;
          color: #000;
          background: #fff;
        }
        
        .label {
          width: 4in;
          height: 6in;
          border: 2px solid #000;
          position: relative;
          padding: 8px;
        }
        
        .header {
          text-align: center;
          border-bottom: 1px solid #2563eb;
          padding-bottom: 8px;
          margin-bottom: 10px;
        }
        
        .logo {
          height: 35px;
          width: auto;
          margin-bottom: 3px;
        }
        
        .company-name {
          font-size: 14px;
          font-weight: bold;
          color: #2563eb;
        }
        
        .label-title {
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .address-block {
          border: 1px solid #ccc;
          padding: 6px;
          margin-bottom: 8px;
          background: #f9f9f9;
        }
        
        .address-label {
          font-size: 8px;
          font-weight: bold;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        
        .address-text {
          font-size: 10px;
          font-weight: 500;
          line-height: 1.2;
        }
        
        .order-info {
          background: #f0f0f0;
          padding: 6px;
          margin-bottom: 8px;
          font-size: 9px;
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        
        .info-label {
          font-weight: bold;
        }
        
        .barcode-section {
          text-align: center;
          margin: 8px 0;
          background: #f9f9f9;
          padding: 6px;
        }
        
        .barcode {
          height: 25px;
          background: #000;
          background-image: repeating-linear-gradient(
            90deg,
            #000 0px,
            #000 1px,
            #fff 1px,
            #fff 2px
          );
          margin-bottom: 3px;
        }
        
        .tracking-code {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: 9px;
          letter-spacing: 1px;
        }
        
        .service-info {
          display: flex;
          justify-content: space-between;
          background: #e3f2fd;
          padding: 4px 6px;
          margin-bottom: 6px;
          font-size: 9px;
        }
        
        .service-type {
          font-weight: bold;
          color: #1976d2;
        }
        
        .priority {
          background: #ff5722;
          color: white;
          padding: 1px 4px;
          border-radius: 2px;
          font-size: 8px;
          font-weight: bold;
        }
        
        .package-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 8px;
        }
        
        .package-item {
          border: 1px solid #ddd;
          padding: 4px;
          text-align: center;
          font-size: 8px;
        }
        
        .package-label {
          font-weight: bold;
          color: #666;
          text-transform: uppercase;
        }
        
        .package-value {
          font-weight: bold;
          font-size: 9px;
        }
        
        .notes {
          background: #fff3cd;
          border: 1px solid #ffc107;
          padding: 4px;
          margin-bottom: 6px;
          font-size: 8px;
        }
        
        .notes-title {
          font-weight: bold;
          color: #856404;
          margin-bottom: 2px;
        }
        
        .notes-text {
          color: #856404;
        }
        
        .footer {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
          text-align: center;
          font-size: 7px;
          color: #666;
          border-top: 1px solid #ccc;
          padding-top: 3px;
        }
        
      </style>
    </head>
    <body>
      <div class="label">
        <!-- Header -->
        <div class="header">
          <img src="https://res.cloudinary.com/dv7ar9aca/image/upload/v1748515719/w700h700_1-removebg-preview_ykrmdu.png" alt="Baladi Engross" class="logo">
          <div class="company-name">Baladi Engross</div>
          <div class="label-title">Freight Label</div>
        </div>
        
        <!-- Shipping Addresses -->
        <div class="address-block">
          <div class="address-label">Ship From</div>
          <div class="address-text">
            <strong>Baladi Engross</strong><br>
            Distribution Center<br>
            Dubai, UAE
          </div>
        </div>
        
        <div class="address-block">
          <div class="address-label">Ship To</div>
          <div class="address-text">
            <strong>${order.userId.name}</strong><br>
            ${formatAddress(order.shippingAddress)}
          </div>
        </div>
        
        <!-- Order Details -->
        <div class="order-info">
          <div class="info-row">
            <span class="info-label">Order:</span>
            <span>#${order._id.toString()}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Date:</span>
            <span>${new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Items:</span>
            <span>${order.items.length} products</span>
          </div>
          <div class="info-row">
            <span class="info-label">Qty:</span>
            <span>${order.items.reduce((total, item) => total + item.quantity, 0)} units</span>
          </div>
          <div class="info-row">
            <span class="info-label">Value:</span>
            <span>$${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        
        <!-- Barcode -->
        <div class="barcode-section">
          <div class="barcode"></div>
          <div class="tracking-code">${order._id.toString().toUpperCase()}</div>
        </div>
        
        <!-- Package Info -->
        <div class="package-grid">
          <div class="package-item">
            <div class="package-label">Weight</div>
            <div class="package-value">${(order.items.reduce((total, item) => total + item.quantity, 0) * 0.5).toFixed(1)} kg</div>
          </div>
          <div class="package-item">
            <div class="package-label">Pieces</div>
            <div class="package-value">1 of 1</div>
          </div>
        </div>
        
        ${
          order.notes
            ? `
        <div class="notes">
          <div class="notes-title">Special Instructions</div>
          <div class="notes-text">${order.notes}</div>
        </div>
        `
            : ''
        }
        
        <!-- Footer -->
        <div class="footer">
          <div>Generated: ${new Date().toLocaleString()}</div>
          <div>Handle with Care</div>
        </div>
      </div>
    </body>
    </html>
  `;
}
