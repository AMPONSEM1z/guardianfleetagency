import { CreateShipmentForm } from "@/components/create-shipment-form"

export default function CreateShipmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Create New Shipment</h1>
        <p className="text-gray-600">Enter shipment details to create a new package</p>
      </div>

      <CreateShipmentForm />
    </div>
  )
}
