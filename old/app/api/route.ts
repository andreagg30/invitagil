import clientPromise from "@/lib/db-client"

export async function GET() {
  const client = await clientPromise
  const db = client.db("invitagil")

  const invitations = await db.collection("invitations").find().toArray()

  return Response.json(invitations)
}