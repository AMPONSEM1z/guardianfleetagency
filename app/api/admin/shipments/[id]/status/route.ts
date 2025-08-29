import { createClient } from "@/lib/supabase/server"
import { sendStatusUpdateEmail, sendSenderNotificationEmail, sendDeliveryConfirmationEmail } from "@/lib/email/service"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const { id } = params
    const body = await request.json()

    const { status, event_description, location } = body

    // Update shipment status
    const { data: shipment, error: shipmentError } = await supabase
      .from("shipments")
      .update({
        status,
        ...(status === "delivered" && { actual_delivery_date: new Date().toISOString().split("T")[0] }),
      })
      .eq("id", id)
      .select()
      .single()

    if (shipmentError || !shipment) {
      return NextResponse.json({ error: "Failed to update shipment" }, { status: 500 })
    }

    // Create tracking event
    const { error: eventError } = await supabase.from("tracking_events").insert({
      shipment_id: id,
      event_type: status,
      event_description,
      location,
    })

    if (eventError) {
      console.error("Error creating tracking event:", eventError)
    }

    // Send email notifications
    try {
      if (status === "delivered") {
        // Send delivery confirmation
        await sendDeliveryConfirmationEmail({
          tracking_number: shipment.tracking_number,
          recipient_name: shipment.recipient_name,
          recipient_email: shipment.recipient_email,
          delivery_date: shipment.actual_delivery_date || new Date().toISOString(),
          delivery_location: location || "Delivery Address",
        })
      } else {
        // Send status update to recipient
        await sendStatusUpdateEmail({
          tracking_number: shipment.tracking_number,
          recipient_name: shipment.recipient_name,
          recipient_email: shipment.recipient_email,
          status,
          event_description,
          location,
          estimated_delivery_date: shipment.estimated_delivery_date,
        })
      }

      // Send notification to sender
      await sendSenderNotificationEmail({
        tracking_number: shipment.tracking_number,
        sender_name: shipment.sender_name,
        sender_email: shipment.sender_email,
        recipient_name: shipment.recipient_name,
        status,
        event_description,
      })
    } catch (emailError) {
      console.error("Error sending notification emails:", emailError)
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({
      success: true,
      shipment: {
        id: shipment.id,
        tracking_number: shipment.tracking_number,
        status: shipment.status,
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
