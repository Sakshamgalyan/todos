import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const { text } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db('todoapp');
    const todos = db.collection('todos');
    const result = await todos.insertOne({ text });
    return new Response(JSON.stringify({ id: result.insertedId }), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('todoapp');
    const todos = await db.collection('todos').find({}).toArray();
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
 
export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db('todoapp');
    const todos = db.collection('todos');
    await todos.deleteOne({ _id: ObjectId.createFromHexString(id) });
    return new Response(JSON.stringify({ message: 'Todo deleted' }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, text } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db('todoapp');
    const todos = db.collection('todos');
    await todos.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { text } });
    return new Response(JSON.stringify({ message: 'Todo updated' }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
