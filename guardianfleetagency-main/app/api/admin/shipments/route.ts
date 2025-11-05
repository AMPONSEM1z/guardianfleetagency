import { createClient } from "@/lib/supabase/server"
import { sendShipmentCreatedEmail } from "@/lib/email/service"
import { type NextRequest, NextResponse } from "next/server"

// Generate tracking number
function generateTrackingNumber(): string {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `GFA${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Generate tracking number
    const tracking_number = generateTrackingNumber()

    // Calculate estimated delivery date based on service type
    const now = new Date()
    let estimatedDays = 5 // default for standard

    switch (body.service_type) {
      case "express":
        estimatedDays = 2
        break
      case "overnight":
        estimatedDays = 1
        break
      case "standard":
      default:
        estimatedDays = 5
        break
    }

    const estimated_delivery_date = new Date(now.getTime() + estimatedDays * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]

    // Insert shipment
    const { data: shipment, error: shipmentError } = await supabase
      .from("shipments")
      .insert({
        tracking_number,
        sender_name: body.sender_name,
        sender_email: body.sender_email,
        sender_phone: body.sender_phone,
        sender_address: body.sender_address,
        recipient_name: body.recipient_name,
        recipient_email: body.recipient_email,
        recipient_phone: body.recipient_phone,
        recipient_address: body.recipient_address,
        package_description: body.package_description,
        weight_kg: body.weight_kg,
        dimensions_cm: body.dimensions_cm,
        service_type: body.service_type,
        status: "pending",
        estimated_delivery_date,
        shipping_cost: body.shipping_cost,
      })
      .select()
      .single()

    if (shipmentError) {
      console.error("Error creating shipment:", shipmentError)
      return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 })
    }

    // Create initial tracking event
    const { error: eventError } = await supabase.from("tracking_events").insert({
      shipment_id: shipment.id,
      event_type: "created",
      event_description: "Shipment created and ready for pickup",
      location: "Processing Center",
    })

    if (eventError) {
      console.error("Error creating tracking event:", eventError)
      // Don't fail the request if event creation fails
    }

    try {
      await sendShipmentCreatedEmail({
        tracking_number: shipment.tracking_number,
        sender_name: shipment.sender_name,
        recipient_name: shipment.recipient_name,
        recipient_email: shipment.recipient_email,
        service_type: shipment.service_type,
        estimated_delivery_date: shipment.estimated_delivery_date,
      })
    } catch (emailError) {
      console.error("Error sending shipment created email:", emailError)
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({
      success: true,
      tracking_number: shipment.tracking_number,
      shipment_id: shipment.id,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
