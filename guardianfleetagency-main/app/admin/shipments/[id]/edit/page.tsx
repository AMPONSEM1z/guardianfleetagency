import { EditShipmentForm } from "@/components/edit-shipment-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

async function getShipment(id: string) {
  const supabase = await createClient()

  const { data: shipment, error } = await supabase.from("shipments").select("*").eq("id", id).single()

  if (error || !shipment) {
    return null
  }

  return shipment
}

export default async function EditShipmentPage({ params }: { params: { id: string } }) {
  const shipment = await getShipment(params.id)

  if (!shipment) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Edit Shipment</h1>
        <p className="text-gray-600">Update shipment details and status</p>
      </div>

      <EditShipmentForm shipment={shipment} />
    </div>
  )
}
