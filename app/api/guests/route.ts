import clientPromise from "@/lib/db-client";
import { ObjectId } from "mongodb";



export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db("invitagil");
  const url = new URL(request.url);
  const id = url.searchParams.get("_id");
  if(!process.env.MONGODB_URI) {
    return new Response("MongoDB URI not configured", { status: 500 });
  }
  let guests;
  if (id) {
    guests = await db.collection("guests").findOne({ _id: new ObjectId(id) });
    if (!guests) {
      return new Response("Guest not found", { status: 404 });
    }
  } else {
    guests = await db.collection("guests").find().toArray();
  }

  return Response.json(guests);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db("invitagil");
  const { invitacionId, name, email, phone, passes, assignedPasses } =
    await request.json();

  if (!invitacionId || !name || !passes) {
    return new Response("Invalid guest data", { status: 400 });
  }
  db.collection("guests").insertOne({
    invitacionId,
    name,
    email,
    phone,
    assignedPasses,
    passes,
  });

  return new Response("Guest added successfully", { status: 201 });
}

export async function DELETE(request: Request) {
  const client = await clientPromise;
  const db = client.db("invitagil");
  const { _id } = await request.json();
  await db.collection("guests").deleteOne({ _id: new ObjectId(_id) });
  return new Response("Guest deleted successfully", { status: 200 });
}

export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db("invitagil");
  const { _id, invitacionId, name, email, phone, assignedPasses, passes } =
    await request.json();

  if (!name && passes) {
    await db
      .collection("guests")
      .updateOne({ _id: new ObjectId(_id) }, { $set: { passes } });
  } else {
    await db
      .collection("guests")
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { invitacionId, name, email, phone, assignedPasses, passes } },
      );
  }
  return new Response("Guest updated successfully", { status: 200 });
}
