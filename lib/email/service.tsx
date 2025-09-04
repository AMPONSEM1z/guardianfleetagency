// import nodemailer from "nodemailer";
// import {
//   getShipmentCreatedTemplate,
//   getStatusUpdateTemplate,
//   getDeliveryConfirmationTemplate,
// } from "./templates";

// interface EmailConfig {
//   from: string;
//   replyTo?: string;
// }

// const emailConfig: EmailConfig = {
//   from: "GuardianFleetAgency@gmail.com <notifications@guardianfleetagency.com>",
//   replyTo: "support@guardianfleetagency.com",
// };

// async function sendEmail(
//   to: string,
//   subject: string,
//   html: string,
//   text: string
// ) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // You can switch to "smtp" for custom servers
//       auth: {
//         user: process.env.EMAIL_USER, // your email
//         pass: process.env.EMAIL_PASS, // app password or SMTP password
//       },
//     });

//     const mailOptions = {
//       from: emailConfig.from,
//       replyTo: emailConfig.replyTo,
//       to,
//       subject,
//       html,
//       text,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✅ Email sent to ${to}: ${info.messageId}`);

//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     return { success: false, error };
//   }
// }

// // ==========================
// // 📦 Shipment Emails
// // ==========================

// // Shipment created email
// export async function sendShipmentCreatedEmail(data: {
//   tracking_number: string;
//   sender_name: string;
//   recipient_name: string;
//   recipient_email: string;
//   service_type: string;
//   estimated_delivery_date: string;
// }) {
//   const template = getShipmentCreatedTemplate(data);
//   return await sendEmail(
//     data.recipient_email,
//     template.subject,
//     template.html,
//     template.text
//   );
// }

// // Shipment status update email
// export async function sendStatusUpdateEmail(data: {
//   tracking_number: string;
//   recipient_name: string;
//   recipient_email: string;
//   status: string;
//   event_description: string;
//   location?: string;
//   estimated_delivery_date?: string;
// }) {
//   const template = getStatusUpdateTemplate(data);
//   return await sendEmail(
//     data.recipient_email,
//     template.subject,
//     template.html,
//     template.text
//   );
// }

// // Delivery confirmation email
// export async function sendDeliveryConfirmationEmail(data: {
//   tracking_number: string;
//   recipient_name: string;
//   recipient_email: string;
//   delivery_date: string;
//   delivery_location: string;
// }) {
//   const template = getDeliveryConfirmationTemplate(data);
//   return await sendEmail(
//     data.recipient_email,
//     template.subject,
//     template.html,
//     template.text
//   );
// }

// // Sender notification email
// export async function sendSenderNotificationEmail(data: {
//   tracking_number: string;
//   sender_name: string;
//   sender_email: string;
//   recipient_name: string;
//   status: string;
//   event_description: string;
// }) {
//   const subject = `Shipment Update - ${data.status.toUpperCase()} - #${
//     data.tracking_number
//   }`;

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
//         <h1 style="color: #d4af37;">🛡️ guardianfleetagency</h1>
//         <h2>Shipment Status Update</h2>
//       </div>
//       <div style="padding: 20px;">
//         <p>Dear ${data.sender_name},</p>
//         <p>Your shipment to ${data.recipient_name} has been updated:</p>
//         <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
//           <p><strong>Tracking Number:</strong> ${data.tracking_number}</p>
//           <p><strong>Status:</strong> ${data.status.toUpperCase()}</p>
//           <p><strong>Update:</strong> ${data.event_description}</p>
//         </div>
//         <p>Track the shipment: <a href="https://guardianfleetagency.netlify.app/track?tracking=${
//           data.tracking_number
//         }">View Details</a></p>
//       </div>
//     </div>
//   `;

//   const text = `
// guardianfleetagency - Shipment Update

// Dear ${data.sender_name},

// Your shipment to ${data.recipient_name} has been updated:

// Tracking Number: ${data.tracking_number}
// Status: ${data.status.toUpperCase()}
// Update: ${data.event_description}

// Track: https://guardianfleetagency.netlify.app/track?tracking=${
//     data.tracking_number
//   }
//   `;

//   return await sendEmail(data.sender_email, subject, html, text);
// }

// // ==========================
// // ✉️ Contact Form Email
// // ==========================

// export async function sendContactEmail(data: {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   subject: string;
//   message: string;
// }) {
//   const subject = `📩 New Contact Form Submission: ${data.subject}`;

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
//         <h1 style="color: #d4af37;">🛡️ guardianfleetagency</h1>
//         <h2>New Contact Form Submission</h2>
//       </div>
//       <div style="padding: 20px;">
//         <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
//         <p><strong>Email:</strong> ${data.email}</p>
//         <p><strong>Phone:</strong> ${data.phone}</p>
//         <hr style="margin:20px 0;" />
//         <p><strong>Message:</strong></p>
//         <p>${data.message}</p>
//       </div>
//     </div>
//   `;

//   const text = `
// New Contact Form Submission

// Name: ${data.firstName} ${data.lastName}
// Email: ${data.email}
// Phone: ${data.phone}

// Message:
// ${data.message}
//   `;

//   return await sendEmail(
//     "support@guardianfleetagency.com", // 👈 change if you want to receive elsewhere
//     subject,
//     html,
//     text
//   );
// }

// // Auto-reply to contact form sender
// export async function sendContactConfirmationEmail(data: {
//   firstName: string;
//   lastName: string;
//   email: string;
// }) {
//   const subject = `We received your message - Guardian Fleet Agency`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
//         <h1 style="color: #d4af37;">🛡️ Guardian Fleet Agency</h1>
//       </div>
//       <div style="padding: 20px;">
//         <p>Dear ${data.firstName} ${data.lastName},</p>
//         <p>Thank you for reaching out to us. We’ve received your message and our support team will get back to you soon.</p>
//         <p>Best regards,<br/>Guardian Fleet Agency Team</p>
//       </div>
//     </div>
//   `;
//   const text = `
// Guardian Fleet Agency

// Dear ${data.firstName} ${data.lastName},

// Thank you for reaching out. We have received your message and will get back to you soon.

// Best regards,
// Guardian Fleet Agency Team
//   `;

//   return await sendEmail(data.email, subject, html, text);
// }

import nodemailer from "nodemailer";
import {
  getShipmentCreatedTemplate,
  getStatusUpdateTemplate,
  getDeliveryConfirmationTemplate,
} from "./templates";

interface EmailConfig {
  from: string;
  replyTo?: string;
}

const emailConfig: EmailConfig = {
  from: "GuardianFleetAgency@gmail.com <notifications@guardianfleetagency.com>",
  replyTo: "support@guardianfleetagency.com",
};

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: emailConfig.from,
      replyTo: emailConfig.replyTo,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
}

// ==========================
// 📦 Shipment Emails
// ==========================

// Shipment created email
export async function sendShipmentCreatedEmail(data: {
  tracking_number: string;
  sender_name: string;
  recipient_name: string;
  recipient_email: string;
  service_type: string;
  estimated_delivery_date: string;
}) {
  const template = getShipmentCreatedTemplate(data);
  return await sendEmail(
    data.recipient_email,
    template.subject,
    template.html,
    template.text
  );
}

// Shipment status update email
export async function sendStatusUpdateEmail(data: {
  tracking_number: string;
  recipient_name: string;
  recipient_email: string;
  status: string;
  event_description: string;
  location?: string;
  estimated_delivery_date?: string;
}) {
  const template = getStatusUpdateTemplate(data);
  return await sendEmail(
    data.recipient_email,
    template.subject,
    template.html,
    template.text
  );
}

// Delivery confirmation email
export async function sendDeliveryConfirmationEmail(data: {
  tracking_number: string;
  recipient_name: string;
  recipient_email: string;
  delivery_date: string;
  delivery_location: string;
}) {
  const template = getDeliveryConfirmationTemplate(data);
  return await sendEmail(
    data.recipient_email,
    template.subject,
    template.html,
    template.text
  );
}

// Sender notification email
export async function sendSenderNotificationEmail(data: {
  tracking_number: string;
  sender_name: string;
  sender_email: string;
  recipient_name: string;
  status: string;
  event_description: string;
}) {
  const subject = `Shipment Update - ${data.status.toUpperCase()} - #${
    data.tracking_number
  }`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
        <h1 style="color: #d4af37;">🛡️ guardianfleetagency</h1>
        <h2>Shipment Status Update</h2>
      </div>
      <div style="padding: 20px;">
        <p>Dear ${data.sender_name},</p>
        <p>Your shipment to ${data.recipient_name} has been updated:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Tracking Number:</strong> ${data.tracking_number}</p>
          <p><strong>Status:</strong> ${data.status.toUpperCase()}</p>
          <p><strong>Update:</strong> ${data.event_description}</p>
        </div>
        <p>Track the shipment: <a href="https://guardianfleetagency.com/track?tracking=${
          data.tracking_number
        }">View Details</a></p>
      </div>
    </div>
  `;

  const text = `
guardianfleetagency - Shipment Update

Dear ${data.sender_name},

Your shipment to ${data.recipient_name} has been updated:

Tracking Number: ${data.tracking_number}
Status: ${data.status.toUpperCase()}
Update: ${data.event_description}

Track: https://guardianfleetagency.com/track?tracking=${data.tracking_number}
  `;

  return await sendEmail(data.sender_email, subject, html, text);
}

// ==========================
// ✉️ Contact Form Email
// ==========================

export async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const subject = `📩 New Contact Form Submission: ${data.subject}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
        <h1 style="color: #d4af37;">🛡️ guardianfleetagency</h1>
        <h2>New Contact Form Submission</h2>
      </div>
      <div style="padding: 20px;">
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <hr style="margin:20px 0;" />
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      </div>
    </div>
  `;

  const text = `
New Contact Form Submission

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
  `;

  return await sendEmail(
    "support@guardianfleetagency.com",
    subject,
    html,
    text
  );
}

// Auto-reply to contact form sender
export async function sendContactConfirmationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  const subject = `We received your message - Guardian Fleet Agency`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
        <h1 style="color: #d4af37;">🛡️ Guardian Fleet Agency</h1>
      </div>
      <div style="padding: 20px;">
        <p>Dear ${data.firstName} ${data.lastName},</p>
        <p>Thank you for reaching out to us. We’ve received your message and our support team will get back to you soon.</p>
        <p>Best regards,<br/>Guardian Fleet Agency Team</p>
      </div>
    </div>
  `;
  const text = `
Guardian Fleet Agency

Dear ${data.firstName} ${data.lastName},

Thank you for reaching out. We have received your message and will get back to you soon.

Best regards,
Guardian Fleet Agency Team
  `;

  return await sendEmail(data.email, subject, html, text);
}
