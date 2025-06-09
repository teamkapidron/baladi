import { IOrder } from '@/models/interfaces/order.model';

export function pickingListTemplate(order: IOrder) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Picking List - Order #${order._id}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #fff;
          padding: 20px;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
        }
        
        .logo-section {
          flex: 1;
        }
        
        .logo {
          max-height: 80px;
          width: auto;
        }
        
        .company-info {
          text-align: right;
          flex: 1;
        }
        
        .company-name {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 5px;
        }
        
        .document-title {
          font-size: 24px;
          color: #1f2937;
          font-weight: 600;
        }
        
        .order-info {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          border-left: 4px solid #2563eb;
        }
        
        .order-info h2 {
          color: #2563eb;
          margin-bottom: 15px;
          font-size: 20px;
        }
        
        .order-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .detail-item {
          display: flex;
          flex-direction: column;
        }
        
        .detail-label {
          font-weight: 600;
          color: #4b5563;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .detail-value {
          font-size: 16px;
          color: #1f2937;
          font-weight: 500;
        }
        
        .items-section {
          margin-bottom: 30px;
        }
        
        .items-title {
          font-size: 22px;
          color: #2563eb;
          margin-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 10px;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .items-table th {
          background: #2563eb;
          color: white;
          padding: 15px 12px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .items-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 15px;
        }
        
        .items-table tr:nth-child(even) {
          background: #f9fafb;
        }
        
        .items-table tr:hover {
          background: #f3f4f6;
        }
        
        .quantity-cell {
          font-weight: bold;
          color: #2563eb;
          font-size: 18px;
          text-align: center;
        }
        
        .product-id {
          font-family: 'Courier New', monospace;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 13px;
        }
        
        .total-items {
          background: #ecfdf5;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #10b981;
          margin-top: 20px;
        }
        
        .total-items h3 {
          color: #10b981;
          margin-bottom: 5px;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
        }
        
        .signature-section {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
        }
        
        .signature-box {
          width: 200px;
          text-align: center;
        }
        
        .signature-line {
          border-top: 2px solid #374151;
          margin-bottom: 8px;
          height: 50px;
        }
        
        .signature-label {
          font-weight: 600;
          color: #4b5563;
        }
        
        @media print {
          body {
            padding: 0;
          }
          
          .container {
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header Section -->
        <div class="header">
          <div class="logo-section">
            <img src="https://res.cloudinary.com/dv7ar9aca/image/upload/v1748515719/w700h700_1-removebg-preview_ykrmdu.png" alt="Baladi Engross Logo" class="logo">
          </div>
          <div class="company-info">
            <div class="company-name">Baladi Engross</div>
            <div class="document-title">PICKING LIST</div>
          </div>
        </div>
        
        <!-- Order Information -->
        <div class="order-info">
          <h2>Order Information</h2>
          <div class="order-details">
            <div class="detail-item">
              <span class="detail-label">Order ID</span>
              <span class="detail-value">#${order._id}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Customer ID</span>
              <span class="detail-value">${order.userId}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status</span>
              <span class="detail-value">${order.status.toUpperCase()}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Created Date</span>
              <span class="detail-value">${new Date(
                order.createdAt,
              ).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Total Amount</span>
              <span class="detail-value">$${order.totalAmount.toFixed(2)}</span>
            </div>
            ${
              order.shippingAddress
                ? `
            <div class="detail-item">
              <span class="detail-label">Shipping Address</span>
              <span class="detail-value">${order.shippingAddress}</span>
            </div>
            `
                : ''
            }
          </div>
        </div>
        
        <!-- Items Section -->
        <div class="items-section">
          <h2 class="items-title">Items to Pick</h2>
          <table class="items-table">
            <thead>
              <tr>
                <th style="width: 10%">#</th>
                <th style="width: 40%">Product ID</th>
                <th style="width: 20%">Quantity</th>
                <th style="width: 15%">Unit Price</th>
                <th style="width: 15%">Total Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item, index) => `
                <tr>
                  <td style="font-weight: bold; color: #6b7280;">${index + 1}</td>
                  <td><span class="product-id">${item.productId}</span></td>
                  <td class="quantity-cell">${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td style="font-weight: 600;">$${item.totalPrice.toFixed(2)}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
          
          <div class="total-items">
            <h3>Total Items to Pick: ${order.items.reduce((total, item) => total + item.quantity, 0)} items</h3>
            <p>Total Products: ${order.items.length} different products</p>
          </div>
        </div>
        
        ${
          order.notes
            ? `
        <div class="order-info">
          <h2>Special Notes</h2>
          <p style="font-style: italic; color: #4b5563; font-size: 15px;">${order.notes}</p>
        </div>
        `
            : ''
        }
        
        <!-- Signature Section -->
        <div class="signature-section">
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
            <div class="signature-label">Supervisor Signature</div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p>Generated on ${new Date().toLocaleString()}</p>
          <p>Baladi Engross - Picking List Document</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function freightLabelTemplate(order: IOrder) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Freight Label - Order #${order._id}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', 'Helvetica', sans-serif;
          line-height: 1.4;
          color: #000;
          background-color: #fff;
          padding: 10px;
        }
        
        .label-container {
          width: 4in;
          height: 6in;
          border: 3px solid #000;
          background: white;
          position: relative;
          padding: 15px;
          page-break-after: always;
        }
        
        .header {
          text-align: center;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        
        .logo {
          max-height: 50px;
          width: auto;
          margin-bottom: 5px;
        }
        
        .company-name {
          font-size: 18px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 3px;
        }
        
        .label-title {
          font-size: 14px;
          font-weight: bold;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .shipping-info {
          margin-bottom: 15px;
        }
        
        .address-section {
          margin-bottom: 12px;
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 4px;
        }
        
        .address-label {
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 3px;
          letter-spacing: 0.5px;
        }
        
        .address-content {
          font-size: 12px;
          font-weight: 600;
          line-height: 1.3;
          color: #000;
        }
        
        .order-details {
          background: #f8f9fa;
          padding: 8px;
          border-radius: 4px;
          margin-bottom: 12px;
          border-left: 3px solid #2563eb;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3px;
          font-size: 11px;
        }
        
        .detail-label {
          font-weight: bold;
          color: #333;
        }
        
        .detail-value {
          font-weight: normal;
          color: #000;
        }
        
        .barcode-section {
          text-align: center;
          margin-bottom: 10px;
          padding: 8px;
          background: #f8f9fa;
          border-radius: 4px;
        }
        
        .barcode-placeholder {
          height: 40px;
          background: #000;
          background-image: repeating-linear-gradient(
            90deg,
            #000 0px,
            #000 2px,
            #fff 2px,
            #fff 4px
          );
          margin-bottom: 3px;
          border-radius: 2px;
        }
        
        .tracking-number {
          font-size: 12px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
        }
        
        .service-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #e3f2fd;
          padding: 6px 8px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        
        .service-type {
          font-size: 11px;
          font-weight: bold;
          color: #1976d2;
        }
        
        .priority-badge {
          background: #ff5722;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .package-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 10px;
        }
        
        .package-detail {
          background: #fff;
          border: 1px solid #ddd;
          padding: 5px;
          border-radius: 3px;
          text-align: center;
        }
        
        .package-label {
          font-size: 9px;
          color: #666;
          text-transform: uppercase;
          font-weight: bold;
        }
        
        .package-value {
          font-size: 11px;
          font-weight: bold;
          color: #000;
        }
        
        .special-instructions {
          background: #fff3cd;
          border: 1px solid #ffc107;
          padding: 6px;
          border-radius: 3px;
          margin-bottom: 8px;
        }
        
        .instructions-title {
          font-size: 9px;
          font-weight: bold;
          color: #856404;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        
        .instructions-text {
          font-size: 10px;
          color: #856404;
          line-height: 1.2;
        }
        
        .footer {
          position: absolute;
          bottom: 10px;
          left: 15px;
          right: 15px;
          text-align: center;
          font-size: 8px;
          color: #666;
          border-top: 1px solid #ccc;
          padding-top: 5px;
        }
        
        .urgent-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #dc3545;
          color: white;
          padding: 3px 6px;
          border-radius: 3px;
          font-size: 8px;
          font-weight: bold;
          text-transform: uppercase;
          transform: rotate(15deg);
        }
        
        @media print {
          body {
            padding: 0;
          }
          
          .label-container {
            border: 2px solid #000;
          }
        }
      </style>
    </head>
    <body>
      <div class="label-container">
        ${order.status === 'pending' ? '<div class="urgent-overlay">Urgent</div>' : ''}
        
        <!-- Header Section -->
        <div class="header">
          <img src="https://res.cloudinary.com/dv7ar9aca/image/upload/v1748515719/w700h700_1-removebg-preview_ykrmdu.png" alt="Baladi Engross Logo" class="logo">
          <div class="company-name">Baladi Engross</div>
          <div class="label-title">Freight Label</div>
        </div>
        
        <!-- Shipping Information -->
        <div class="shipping-info">
          <!-- From Address -->
          <div class="address-section">
            <div class="address-label">Ship From</div>
            <div class="address-content">
              <strong>Baladi Engross</strong><br>
              Distribution Center<br>
              123 Commerce Street<br>
              Industrial District<br>
              Dubai, UAE 12345
            </div>
          </div>
          
          <!-- To Address -->
          <div class="address-section">
            <div class="address-label">Ship To</div>
            <div class="address-content">
              <strong>Customer ID: ${order.userId}</strong><br>
              ${order.shippingAddress || 'Address to be confirmed'}
            </div>
          </div>
        </div>
        
        <!-- Order Details -->
        <div class="order-details">
          <div class="detail-row">
            <span class="detail-label">Order #:</span>
            <span class="detail-value">${order._id}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Items:</span>
            <span class="detail-value">${order.items.length} products</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Total Qty:</span>
            <span class="detail-value">${order.items.reduce((total, item) => total + item.quantity, 0)} units</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Value:</span>
            <span class="detail-value">$${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <!-- Service Information -->
        <div class="service-info">
          <div class="service-type">Standard Delivery</div>
          ${order.status === 'pending' ? '<div class="priority-badge">Express</div>' : ''}
        </div>
        
        <!-- Barcode Section -->
        <div class="barcode-section">
          <div class="barcode-placeholder"></div>
          <div class="tracking-number">${order._id}</div>
        </div>
        
        <!-- Package Information -->
        <div class="package-info">
          <div class="package-detail">
            <div class="package-label">Weight</div>
            <div class="package-value">${(order.items.reduce((total, item) => total + item.quantity, 0) * 0.5).toFixed(1)} kg</div>
          </div>
          <div class="package-detail">
            <div class="package-label">Pieces</div>
            <div class="package-value">1 of 1</div>
          </div>
        </div>
        
        ${
          order.notes
            ? `
        <div class="special-instructions">
          <div class="instructions-title">Special Instructions</div>
          <div class="instructions-text">${order.notes}</div>
        </div>
        `
            : ''
        }
        
        <!-- Footer -->
        <div class="footer">
          <div>Generated: ${new Date().toLocaleString()}</div>
          <div>Handle with Care | Fragile Items</div>
        </div>
      </div>
    </body>
    </html>
  `;
}
