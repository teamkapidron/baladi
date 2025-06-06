import PDFDocument from 'pdfkit';
import { IOrder, IOrderItem } from '@/models/interfaces/order.model';
import { IProduct } from '@/models/interfaces/product.model';
import { IUser } from '@/models/interfaces/user.model';
import { IAddress } from '@/models/interfaces/address.model';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { promisify } from 'util';

// Enhanced color palette with more modern colors
const colors = {
  primary: '#1f365c',
  secondary: '#2f4e78',
  accent: '#4f7eaa',
  backgroundLight: '#f1f5fa',
  text: '#222222',
  gray: '#b0bec5',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  gradient: {
    start: '#1f365c',
    end: '#4f7eaa',
  },
};

// Helper function to download and save image
async function downloadAndSaveImage(imageUrl: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), 'uploads');

  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate a unique filename
  const filename = `product_${Date.now()}.png`;
  const filepath = path.join(uploadsDir, filename);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https
      .get(imageUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();

          resolve(filepath);
        });

        file.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there's an error
          reject(err);
        });
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there's an error
        reject(err);
      });
  });
}

// Helper function to create gradient background
function createGradientBackground(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const gradient = doc.linearGradient(x, y, x, y + height);
  gradient.stop(0, colors.gradient.start);
  gradient.stop(1, colors.gradient.end);
  doc.rect(x, y, width, height).fill(gradient);
}

// Helper function to add decorative pattern
function addDecorativePattern(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  doc.save();
  doc.strokeColor(colors.accent + '15');
  doc.lineWidth(1);

  // Create diagonal line pattern
  for (let i = 0; i < width + height; i += 20) {
    doc
      .moveTo(x, y + i)
      .lineTo(x + i, y)
      .stroke();
  }
  doc.restore();
}

// Helper function to add modern card with shadow
function addCard(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number = 10,
) {
  // Shadow
  doc.save();
  doc.fillColor('#000000');
  doc.opacity(0.06); // 6% opacity for shadow
  doc.roundedRect(x + 3, y + 3, width, height, radius).fill();
  doc.opacity(1);
  doc.restore();

  // Card with semi-transparent background
  doc.save();
  doc.fillColor('#ffffff');
  doc.opacity(0.5); // 50% opacity for card background
  doc.strokeColor(colors.accent);
  doc.opacity(0.5);
  doc.lineWidth(1);
  doc.roundedRect(x, y, width, height, radius).fillAndStroke();
  doc.opacity(1);
  doc.restore();
}

// Helper function to add header with gradient
function addHeader(doc: PDFKit.PDFDocument, title: string, subtitle: string) {
  doc.save();
  // Semi-transparent gradient background
  const gradient = doc.linearGradient(0, 0, 0, 150);
  gradient.stop(0, colors.primary);
  gradient.stop(1, colors.secondary);
  doc.opacity(0.8); // 80% opacity for header background
  doc.rect(0, 0, doc.page.width, 150).fill(gradient);
  doc.opacity(1);
  // Text with shadow for better readability
  doc.fillColor('#ffffff');
  doc.fontSize(36).font('Helvetica-Bold').text(title, 50, 50);
  doc.fontSize(14).font('Helvetica').text(subtitle, 50, 90);
  doc.restore();
}

// Helper function to add price tag
function addPriceTag(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  price: number,
  originalPrice?: number,
) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  doc.save();
  // Price background
  doc.roundedRect(x, y, 120, 60, 8).fill(colors.secondary);

  // Price text
  doc.fillColor('#ffffff');
  doc.fontSize(14).text('Price', x + 10, y + 10);
  doc
    .fontSize(24)
    .font('Helvetica-Bold')
    .text(formattedPrice, x + 10, y + 30);

  if (originalPrice && originalPrice > price) {
    const discount = Math.round(
      ((originalPrice - price) / originalPrice) * 100,
    );
    const formattedOriginal = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(originalPrice);

    // Discount badge
    doc.save();
    doc.translate(x + 90, y);
    doc.rotate(-15);
    doc.roundedRect(0, 0, 50, 50, 25).fill(colors.success);
    doc.fillColor('#ffffff');
    doc
      .fontSize(16)
      .text(`${discount}%`, 0, 15, { width: 50, align: 'center' });
    doc.fontSize(10).text('OFF', 0, 35, { width: 50, align: 'center' });
    doc.restore();

    // Original price
    doc.fillColor(colors.gray);
    doc.fontSize(12).text(`Was: ${formattedOriginal}`, x + 10, y + 50);
  }
  doc.restore();
}

// Helper function to add product image with modern frame
async function addProductImage(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
  imagePath: string | undefined,
) {
  if (!imagePath) {
    // Fallback image block with semi-transparent background
    doc.save();
    doc.fillColor(colors.backgroundLight);
    doc.opacity(0.5); // 50% opacity for fallback
    doc.roundedRect(x, y, width, height, 10).fill();
    doc.opacity(1);
    doc.fillColor(colors.accent);
    doc.fontSize(16);
    doc.text('Product Image Unavailable', x, y + height / 2 - 10, {
      width: width,
      align: 'center',
    });
    doc.restore();
    return;
  }

  try {
    // Download and save the image if it's a URL
    let localImagePath = imagePath;
    if (imagePath.startsWith('http')) {
      try {
        localImagePath = await downloadAndSaveImage(imagePath);
      } catch (downloadError) {
        throw downloadError;
      }
    }

    // Add shadow effect
    doc.save();
    doc.fillColor('#000000');
    doc.opacity(0.06); // 6% opacity for shadow
    doc.roundedRect(x + 5, y + 5, width, height, 10).fill();
    doc.opacity(1);
    doc.restore();

    // Add image with frame
    doc.save();
    doc.roundedRect(x, y, width, height, 10).clip();

    try {
      doc.image(localImagePath, x, y, {
        width: width,
        height: height,
        fit: [width, height],
      });
    } catch (imageError) {
      throw imageError;
    }

    doc.restore();

    // Add border
    doc.save();
    doc.strokeColor(colors.accent);
    doc.opacity(0.8); // 80% opacity for border
    doc.lineWidth(2);
    doc.roundedRect(x, y, width, height, 10).stroke();
    doc.opacity(1);
    doc.restore();

    // Clean up the downloaded file if it was a URL
    if (imagePath.startsWith('http')) {
      try {
        fs.unlinkSync(localImagePath);
      } catch (cleanupError) {}
    }
  } catch (error) {
    doc.save();
    doc.fillColor(colors.backgroundLight);
    doc.opacity(0.5); // 50% opacity for fallback
    doc.roundedRect(x, y, width, height, 10).fill();
    doc.opacity(1);
    doc.fillColor(colors.accent);
    doc.fontSize(16);
    doc.text('Product Image Unavailable', x, y + height / 2 - 10, {
      width: width,
      align: 'center',
    });
    doc.restore();
  }
}

// Helper function to add product specifications
function addProductSpecs(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  product: IProduct,
) {
  x -= 10;
  y -= 10;
  const specs = [
    { label: 'SKU', value: product.sku },
    { label: 'Stock', value: `${product.stock} units` },
    {
      label: 'Dimensions',
      value: product.dimensions
        ? `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height}`
        : undefined,
    },
    { label: 'Weight', value: product.weight },
    {
      label: 'Shelf Life',
      value: product.shelfLife
        ? `${product.shelfLife.duration} ${product.shelfLife.unit}`
        : undefined,
    },
  ];

  let currentY = y;
  specs.forEach((spec, index) => {
    if (spec.value) {
      // Add alternating background
      if (index % 2 === 0) {
        doc
          .roundedRect(x, currentY, width, 40, 10)
          .fill(colors.backgroundLight);
      }

      // Add spec item
      doc.fillColor(colors.text);
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text(spec.label + ':', x + 10, currentY + 10);
      doc
        .fontSize(12)
        .font('Helvetica')
        .text(String(spec.value), x + 100, currentY + 10);

      currentY += 40;
    }
  });

  return currentY;
}

// Helper function to add product description
function addProductDescription(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
  product: IProduct,
) {
  doc.save();

  // Description header
  doc.fillColor(colors.primary);
  doc.fontSize(18).font('Helvetica-Bold').text('Product Description', x, y);

  // Divider
  doc.strokeColor(colors.accent + '30');
  doc.lineWidth(1);
  doc
    .moveTo(x, y + 25)
    .lineTo(x + width, y + 25)
    .stroke();

  // Description content
  doc.fillColor(colors.text);
  doc.fontSize(12).font('Helvetica');

  const description =
    product.description ||
    product.shortDescription ||
    'No description available.';
  doc.text(description, x, y + 40, {
    width: width,
    align: 'justify',
  });

  doc.restore();
}

// Helper function to add footer
function addFooter(doc: PDFKit.PDFDocument, text: string) {
  const footerY = doc.page.height - 40;
  doc.save();
  // Semi-transparent gradient background
  const gradient = doc.linearGradient(0, footerY, 0, doc.page.height);
  gradient.stop(0, colors.primary);
  gradient.stop(1, colors.secondary);
  doc.opacity(0.8); // 80% opacity for footer background
  doc.rect(0, footerY, doc.page.width, 40).fill(gradient);
  doc.opacity(1);
  doc.fillColor('#ffffff');
  doc.fontSize(10).font('Helvetica');
  doc.text(text, 0, footerY + 15, {
    align: 'center',
    width: doc.page.width,
  });
  doc.restore();
}

// Helper function to add background image
async function addBackgroundImage(
  doc: PDFKit.PDFDocument,
  backgroundUrl?: string,
) {
  try {
    let backgroundPath = backgroundUrl;

    // If no URL provided, use default background
    if (!backgroundPath) {
      backgroundPath = path.join(
        process.cwd(),
        'public',
        'default-background.jpg',
      );
    }

    // Download and save if it's a URL
    if (backgroundPath.startsWith('http')) {
      try {
        backgroundPath = await downloadAndSaveImage(backgroundPath);
      } catch (downloadError) {
        return; // Skip background if download fails
      }
    }

    // Add background image
    doc.save();
    doc.image(backgroundPath, 0, 0, {
      width: doc.page.width,
      height: doc.page.height,
      fit: [doc.page.width, doc.page.height],
    });
    doc.restore();

    // Add very light overlay to ensure text readability
    doc.save();
    doc.fillColor(colors.backgroundLight);
    doc.opacity(0.2); // 20% opacity overlay
    doc.rect(0, 0, doc.page.width, doc.page.height).fill();
    doc.opacity(1);
    doc.restore();
    // Clean up if it was a URL
    if (backgroundUrl?.startsWith('http')) {
      try {
        fs.unlinkSync(backgroundPath);
      } catch (cleanupError) {}
    }
  } catch (error) {}
}

export async function generatePickingList(
  order: IOrder & {
    items: Array<IOrderItem & { productID: IProduct }>;
    userID: IUser;
    shippingAddress?: IAddress;
  },
): Promise<Buffer> {
  return new Promise((resolve) => {
    const buffers: Buffer[] = [];
    const doc = new PDFDocument({ margin: 50 });
    const pageWidth = doc.page.width - 100;
    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    doc.fontSize(20).text('PICKING LIST', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Date: ${order.createdAt.toLocaleDateString()}`);
    doc.text(`Status: ${order.status.toUpperCase()}`);
    doc.moveDown();

    doc.fontSize(14).text('Product Information');
    doc.moveDown(0.5);

    doc.fontSize(10);
    doc.text('Product', 50, doc.y, { width: 200 });
    doc.text('SKU', 250, doc.y, { width: 100 });
    doc.text('Quantity', 350, doc.y, { width: 100 });
    doc.text('Location', 450, doc.y, { width: 100 });

    doc.moveDown(0.5);
    doc.lineCap('butt').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    let yPosition = doc.y;
    for (const item of order.items) {
      doc.text(item.productID.name, 50, yPosition, { width: 200 });
      doc.text(item.productID.sku || 'N/A', 250, yPosition, { width: 100 });
      doc.text(item.quantity.toString(), 350, yPosition, { width: 100 });
      doc.text('Warehouse A', 450, yPosition, { width: 100 });
      yPosition += 20;
    }

    doc.y = yPosition + 30;

    const centerX = 50;
    const textWidth = pageWidth;

    doc.fontSize(14).text('Customer Information', centerX, doc.y, {
      align: 'center',
      width: textWidth,
    });
    doc.moveDown(0.5);
    doc.fontSize(10);
    doc.text(`Name: ${order.userID.name}`, centerX, doc.y, {
      align: 'center',
      width: textWidth,
    });
    doc.text(`Email: ${order.userID.email}`, centerX, doc.y, {
      align: 'center',
      width: textWidth,
    });
    doc.moveDown();

    if (order.notes) {
      doc
        .fontSize(14)
        .text('Notes', centerX, doc.y, { align: 'center', width: textWidth });
      doc.moveDown(0.5);
      doc.fontSize(10).text(order.notes, centerX, doc.y, {
        align: 'center',
        width: textWidth,
      });
      doc.moveDown();
    }

    doc.fontSize(14).text('Warehouse Instructions', centerX, doc.y, {
      align: 'center',
      width: textWidth,
    });
    doc.moveDown(0.5);
    doc.fontSize(10);
    doc.text(
      '1. Locate the product in the specified location',
      centerX,
      doc.y,
      { align: 'center', width: textWidth },
    );
    doc.text('2. Check the product condition before picking', centerX, doc.y, {
      align: 'center',
      width: textWidth,
    });
    doc.text('3. Pack the product securely', centerX, doc.y, {
      align: 'center',
      width: textWidth,
    });
    doc.text('4. Attach the freight slip to the package', centerX, doc.y, {
      align: 'center',
      width: textWidth,
    });

    doc.moveDown(2);
    doc
      .fontSize(10)
      .text('Picked by: _______________________', centerX, doc.y, {
        align: 'center',
        width: textWidth,
      });
    doc.text('Date: _______________________', centerX, doc.y, {
      align: 'center',
      width: textWidth,
    });

    doc.end();
  });
}

export async function generateFreightSlip(
  order: IOrder & {
    items: Array<IOrderItem & { productID: IProduct }>;
    userID: IUser;
    shippingAddress?: IAddress;
  },
): Promise<Buffer> {
  return new Promise((resolve) => {
    const buffers: Buffer[] = [];
    const doc = new PDFDocument({ margin: 50, size: 'A5' });

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    doc.fontSize(16).text('FREIGHT SLIP', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text('Shipping Information', { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(10).text('From:');
    doc.text('Baladi Company');
    doc.text('123 Warehouse Street');
    doc.text('Warehouse District, City 12345');
    doc.moveDown();

    doc.fontSize(10).text('To:');
    doc.text(order.userID.name);

    if (order.shippingAddress) {
      doc.text(order.shippingAddress.addressLine1);
      if (order.shippingAddress.addressLine2) {
        doc.text(order.shippingAddress.addressLine2);
      }
      doc.text(
        `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`,
      );
      doc.text(order.shippingAddress.country);

      if (order.shippingAddress.phoneNumber) {
        doc.text(`Phone: ${order.shippingAddress.phoneNumber}`);
      }
    } else {
      doc.text('No shipping address provided');
    }

    doc.moveDown();

    doc.fontSize(12).text('Order Details', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date: ${order.createdAt.toLocaleDateString()}`);
    doc.text(`Total Items: ${order.items.length}`);
    doc.text(`Total Amount: $${order.totalAmount.toFixed(2)}`);

    doc.moveDown();
    doc.fontSize(12).text('Handling Instructions', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).text('Handle with care. Keep dry.');

    doc.end();
  });
}

/**
 * Generates a modern, clean product sheet with a focus on product images and key information
 * Enhanced with customer-centric design elements and attractive background
 */
export async function generateProductSheet1(
  product: IProduct,
  backgroundUrl?: string,
): Promise<Buffer> {
  return new Promise(async (resolve) => {
    const buffers: Buffer[] = [];
    const doc = new PDFDocument({ margin: 0, size: 'A4' });

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    // Add background image first
    await addBackgroundImage(doc, backgroundUrl);

    // Header
    addHeader(doc, 'BALADI', 'Premium Collection');

    // Main content area
    const contentStartY = 180;
    const contentWidth = doc.page.width - 100;
    const leftMargin = 50;

    // Product title
    addCard(doc, leftMargin, contentStartY, contentWidth, 60);
    doc.fillColor(colors.primary);
    doc.fontSize(24).font('Helvetica-Bold');
    doc.text(product.name, leftMargin + 20, contentStartY + 18, {
      width: contentWidth - 40,
    });

    // Product image
    const imageStartY = contentStartY + 80;
    const imageWidth = 300;
    if (product.images && product.images.length > 0) {
      await addProductImage(
        doc,
        leftMargin,
        imageStartY,
        imageWidth,
        imageWidth,
        product.images[0],
      );
    }

    // Product details
    const detailsX = leftMargin + imageWidth + 30;
    const detailsWidth = contentWidth - imageWidth - 30;

    // Price tag
    addPriceTag(
      doc,
      detailsX,
      imageStartY,
      product.salePrice,
      product.costPrice,
    );

    // Product specifications
    const specsY = imageStartY + 100;
    addCard(doc, detailsX, specsY, detailsWidth, 200);
    addProductSpecs(
      doc,
      detailsX + 10,
      specsY + 10,
      detailsWidth - 20,
      product,
    );

    // Description
    const descY = imageStartY + imageWidth + 30;
    addCard(doc, leftMargin, descY, contentWidth, 180);
    addProductDescription(
      doc,
      leftMargin + 20,
      descY + 20,
      contentWidth - 40,
      140,
      product,
    );

    // Footer
    addFooter(
      doc,
      'BALADI • Premium Products • www.baladi.com • Contact: sales@baladi.com • Tel: +1-234-567-8900',
    );

    doc.end();
  });
}
