import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import cron from "node-cron";

export async function GET(request: NextRequest) {
  dbConnect();
  try {
    const user = await getDataFromToken(request);
    const product = await Product.aggregate([
      { $match: { userId: user } },
      { $match: { expiryDate: { $lte: new Date(Date.now()) } } },
      {
        $sort: { expiryDate: -1 }
      }
    ]).exec();

    if (!product || product.length === 0) {
      return NextResponse.json(
        { message: 'No expired products found', success: false },
        { status: 404 }
      );
    }

   
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b61e387d9a939d",
        pass: "4939f06eb98fc1"
      }
    });

    const mailOptions = {
      from: 'raj@raj.email',
      to: 'welcome@gmail.com',
      subject: 'Product Expiry Notification',
      html: generateExpiryEmailHtml(product)
    };

   
    cron.schedule('* * * * *', async () => {
        await transport.sendMail(mailOptions);
      
      
    });

    return NextResponse.json(
      { message: ' email sent', success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(" checking expiry dates Error", { error });
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

function generateExpiryEmailHtml(products: any[]): string {
  const productRows = products.map(product => `
    <tr>
      <td>${product.productName}</td>
      <td>${product.quantity}</td>
      <td>${product.category}</td>
      <td>${new Date(product.manufacturedDate).toLocaleDateString()}</td>
      <td>${new Date(product.expiryDate).toLocaleDateString()}</td>
    </tr>
  `).join('');

  return `
    <html>
      <body>
        <h1>Product Expiry Notification</h1>
        <p>The following products have expired:</p>
        <table border="1" cellpadding="5" cellspacing="0">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Manufactured Date</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>
        <p>Please take the necessary actions.</p>
      </body>
    </html>
  `;
}
