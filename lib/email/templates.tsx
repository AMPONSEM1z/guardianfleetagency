interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface ShipmentCreatedData {
  tracking_number: string;
  sender_name: string;
  recipient_name: string;
  recipient_email: string;
  service_type: string;
  estimated_delivery_date: string;
}

interface StatusUpdateData {
  tracking_number: string;
  recipient_name: string;
  status: string;
  event_description: string;
  location?: string;
  estimated_delivery_date?: string;
}

interface DeliveryConfirmationData {
  tracking_number: string;
  recipient_name: string;
  delivery_date: string;
  delivery_location: string;
}

const formatServiceType = (serviceType: string) => {
  switch (serviceType.toLowerCase()) {
    case "standard":
      return "Standard Shipping";
    case "express":
      return "Express Delivery";
    case "overnight":
      return "Overnight Service";
    default:
      return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
  }
};

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function getShipmentCreatedTemplate(
  data: ShipmentCreatedData
): EmailTemplate {
  const subject = `Shipment Created - Tracking #${data.tracking_number}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1a365d; color: white; padding: 30px 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; color: #d4af37; margin-bottom: 10px; }
        .content { background-color: #ffffff; padding: 30px 20px; }
        .tracking-box { background-color: #f8f9fa; border: 2px solid #d4af37; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .tracking-number { font-size: 24px; font-weight: bold; color: #1a365d; font-family: monospace; }
        .details { margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #1a365d; }
        .button { display: inline-block; background-color: #4a5d23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🛡️ GuardianFleetAgency</div>
          <h1>Shipment Created Successfully</h1>
        </div>
        
        <div class="content">
          <p>Dear ${data.recipient_name},</p>
          
          <p>Your shipment has been created and is ready for pickup. We'll handle your package with military-grade precision and care.</p>
          
          <div class="tracking-box">
            <div style="margin-bottom: 10px; color: #666;">Your Tracking Number:</div>
            <div class="tracking-number">${data.tracking_number}</div>
          </div>
          
          <div class="details">
            <div class="detail-row">
              <span class="label">Service Type:</span> ${formatServiceType(
                data.service_type
              )}
            </div>
            <div class="detail-row">
              <span class="label">Estimated Delivery:</span> ${formatDate(
                data.estimated_delivery_date
              )}
            </div>
            <div class="detail-row">
              <span class="label">From:</span> ${data.sender_name}
            </div>
          </div>
          
          <p>You can track your package anytime using the tracking number above.</p>
          
          <div style="text-align: center;">
            <a href="https://guardianfleetagency.com/track?tracking=${
              data.tracking_number
            }" class="button">Track Your Package</a>
          </div>
          
          <p>We'll send you updates as your package moves through our network. Thank you for choosing GuardFleetAgency!</p>
        </div>
        
        <div class="footer">
          <p><strong>GuardianFleetAgency</strong> - Military-Grade Shipping & Logistics</p>
          <p>📞 1-800-GUARD-FL | 📧 info@guardianfleetagency.com</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
GuardianFleetAgency - Shipment Created

Dear ${data.recipient_name},

Your shipment has been created and is ready for pickup.

Tracking Number: ${data.tracking_number}
Service Type: ${formatServiceType(data.service_type)}
Estimated Delivery: ${formatDate(data.estimated_delivery_date)}
From: ${data.sender_name}

Track your package: https://guardianfleetagency.com/track?tracking=${
    data.tracking_number
  }

Thank you for choosing GuardFleetAgency!

---
GuardFleetAgency - Military-Grade Shipping & Logistics
Phone: 1-800-GUARD-FL
Email: info@guardianfleetagency.com
  `;

  return { subject, html, text };
}

export function getStatusUpdateTemplate(data: StatusUpdateData): EmailTemplate {
  const subject = `Shipment Update - ${formatStatus(data.status)} - #${
    data.tracking_number
  }`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1a365d; color: white; padding: 30px 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; color: #d4af37; margin-bottom: 10px; }
        .content { background-color: #ffffff; padding: 30px 20px; }
        .status-box { background-color: #4a5d23; color: white; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .status { font-size: 20px; font-weight: bold; }
        .tracking-number { font-size: 18px; font-family: monospace; color: #d4af37; margin-top: 10px; }
        .update-details { background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .button { display: inline-block; background-color: #4a5d23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🛡️ GuardianFleetAgency</div>
          <h1>Shipment Status Update</h1>
        </div>
        
        <div class="content">
          <p>Dear ${data.recipient_name},</p>
          
          <p>We have an update on your shipment:</p>
          
          <div class="status-box">
            <div class="status">${formatStatus(data.status)}</div>
            <div class="tracking-number">${data.tracking_number}</div>
          </div>
          
          <div class="update-details">
            <p><strong>Update:</strong> ${data.event_description}</p>
            ${
              data.location
                ? `<p><strong>Location:</strong> ${data.location}</p>`
                : ""
            }
            ${
              data.estimated_delivery_date
                ? `<p><strong>Estimated Delivery:</strong> ${formatDate(
                    data.estimated_delivery_date
                  )}</p>`
                : ""
            }
          </div>
          
          <div style="text-align: center;">
            <a href="https://guardianfleetagency.com/track?tracking=${
              data.tracking_number
            }" class="button">View Full Tracking Details</a>
          </div>
          
          <p>Thank you for choosing GuardFleetAgency for your shipping needs!</p>
        </div>
        
        <div class="footer">
          <p><strong>GuardianFleetAgency</strong> - Military-Grade Shipping & Logistics</p>
          <p>📞 1-800-GUARD-FL | 📧 info@guardianfleetagency.com</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
GuardianFleetAgency - Shipment Update

Dear ${data.recipient_name},

Shipment Status: ${formatStatus(data.status)}
Tracking Number: ${data.tracking_number}

Update: ${data.event_description}
${data.location ? `Location: ${data.location}` : ""}
${
  data.estimated_delivery_date
    ? `Estimated Delivery: ${formatDate(data.estimated_delivery_date)}`
    : ""
}

Track your package: https://guardianfleetagency.com/track?tracking=${
    data.tracking_number
  }

Thank you for choosing GuardianFleetAgency!

---
GuardianFleetAgency - Military-Grade Shipping & Logistics
Phone: 1-800-GUARD-FL
Email: info@guardianfleetagency.com
  `;

  return { subject, html, text };
}

export function getDeliveryConfirmationTemplate(
  data: DeliveryConfirmationData
): EmailTemplate {
  const subject = `Package Delivered - #${data.tracking_number}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1a365d; color: white; padding: 30px 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; color: #d4af37; margin-bottom: 10px; }
        .content { background-color: #ffffff; padding: 30px 20px; }
        .success-box { background-color: #22c55e; color: white; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .success-icon { font-size: 48px; margin-bottom: 10px; }
        .tracking-number { font-size: 18px; font-family: monospace; margin-top: 10px; }
        .delivery-details { background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .button { display: inline-block; background-color: #d4af37; color: #1a365d; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🛡️ GuardianFleetAgency</div>
          <h1>Package Delivered Successfully!</h1>
        </div>
        
        <div class="content">
          <p>Dear ${data.recipient_name},</p>
          
          <div class="success-box">
            <div class="success-icon">✅</div>
            <div style="font-size: 20px; font-weight: bold;">DELIVERED</div>
            <div class="tracking-number">${data.tracking_number}</div>
          </div>
          
          <p>Great news! Your package has been successfully delivered.</p>
          
          <div class="delivery-details">
            <p><strong>Delivery Date:</strong> ${formatDate(
              data.delivery_date
            )}</p>
            <p><strong>Delivery Location:</strong> ${data.delivery_location}</p>
          </div>
          
          <p>Mission accomplished! Your package has reached its destination safely, handled with the precision and care that defines GuardFleetAgency.</p>
          
          <div style="text-align: center;">
            <a href="https://guardianfleetagency.com/track?tracking=${
              data.tracking_number
            }" class="button">View Delivery Details</a>
          </div>
          
          <p>Thank you for trusting GuardFleetAgency with your shipping needs. We look forward to serving you again!</p>
          
          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
            <strong>Rate Your Experience:</strong> Help us improve our service by sharing your feedback at 
            <a href="https://guardianfleetagency.com/feedback" style="color: #1a365d;">guardfleetagency.com/feedback</a>
          </p>
        </div>
        
        <div class="footer">
          <p><strong>GuardianFleetAgency</strong> - Military-Grade Shipping & Logistics</p>
          <p>📞 1-800-GUARD-FL | 📧 info@guardianfleetagency.com</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
GuardFleetAgency - Package Delivered

Dear ${data.recipient_name},

✅ DELIVERED

Your package has been successfully delivered!

Tracking Number: ${data.tracking_number}
Delivery Date: ${formatDate(data.delivery_date)}
Delivery Location: ${data.delivery_location}

View delivery details: https://guardianfleetagency.com/track?tracking=${
    data.tracking_number
  }

Thank you for choosing GuardFleetAgency!

Rate your experience: https://guardianfleetagency.com/feedback

---
GuardFleetAgency - Military-Grade Shipping & Logistics
Phone: 1-800-GUARD-FL
Email: info@guardianfleetagency.com
  `;

  return { subject, html, text };
}
