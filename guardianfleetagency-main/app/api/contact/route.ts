import { NextResponse } from "next/server";
import {
  sendContactEmail,
  sendContactConfirmationEmail,
} from "@/lib/email/service";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("📩 Contact form submission:", data);

    // 1. Send email to admin/support
    const adminResult = await sendContactEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    // 2. Send confirmation email to the sender
    await sendContactConfirmationEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    if (!adminResult.success) {
      return NextResponse.json(
        { message: "Failed to notify admin.", error: adminResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Your message has been received. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error handling contact form:", error);
    return NextResponse.json(
      { message: "Failed to submit message." },
      { status: 500 }
    );
  }
}
