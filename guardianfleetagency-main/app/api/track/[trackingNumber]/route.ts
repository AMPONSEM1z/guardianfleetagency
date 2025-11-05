import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { trackingNumber: string } }) {
  try {
    const supabase = await createClient()
    const { trackingNumber } = params

    // Validate tracking number format
    if (!trackingNumber || !trackingNumber.match(/^GFA\d{12}$/)) {
      return NextResponse.json(
        { error: "Invalid tracking number format. Please use format: GFA followed by 12 digits." },
        { status: 400 },
      )
    }

    // Fetch shipment data
    const { data: shipment, error: shipmentError } = await supabase
      .from("shipments")
      .select("*")
      .eq("tracking_number", trackingNumber)
      .single()

    if (shipmentError || !shipment) {
      return NextResponse.json(
        { error: "Tracking number not found. Please check your tracking number and try again." },
        { status: 404 },
      )
    }

    // Fetch tracking events
    const { data: trackingEvents, error: eventsError } = await supabase
      .from("tracking_events")
      .select("*")
      .eq("shipment_id", shipment.id)
      .order("event_timestamp", { ascending: false })

    if (eventsError) {
      console.error("Error fetching tracking events:", eventsError)
      return NextResponse.json(
        { error: "Error retrieving tracking information. Please try again later." },
        { status: 500 },
      )
    }

    // Format the response
    const response = {
      shipment: {
        tracking_number: shipment.tracking_number,
        status: shipment.status,
        service_type: shipment.service_type,
        estimated_delivery_date: shipment.estimated_delivery_date,
        actual_delivery_date: shipment.actual_delivery_date,
        sender_name: shipment.sender_name,
        recipient_name: shipment.recipient_name,
        recipient_address: shipment.recipient_address,
        package_description: shipment.package_description,
        weight_kg: shipment.weight_kg,
        dimensions_cm: shipment.dimensions_cm,
        created_at: shipment.created_at,
      },
      tracking_events: trackingEvents || [],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 })
  }
}
