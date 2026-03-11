import clientPromise from "@/lib/db-client";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("invitagil");

  const guests = await db.collection("guests").find().toArray();

  return Response.json(guests);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db("invitagil");
  const { invitacionId, group, name, email, phone, passes, assignedPasses } = await request.json();

  if (!invitacionId || !name || !passes) {
    return new Response("Invalid guest data", { status: 400 });
  }
  db.collection("guests").insertOne({ invitacionId, group, name, email, phone, assignedPasses, passes });

  return new Response("Guest added successfully", { status: 201 });
}

export async function DELETE(request: Request) {
  const client = await clientPromise;
  const db = client.db("invitagil");
  const { group } = await request.json();
  await db.collection("guests").deleteOne({ group });
  return new Response("Guest deleted successfully", { status: 200 });
}

export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db("invitagil");
  const { group, name, passes } = await request.json();
  await db
    .collection("guests")
    .updateOne({ group }, { $set: { name, passes } });
  return new Response("Guest updated successfully", { status: 200 });
}
