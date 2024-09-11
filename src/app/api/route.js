import DBcon from "@/libs/db"
import { NextResponse } from "next/server";
import Todomodel from '@/Models/Todo';

export async function POST(request) {
    try {
        const { title, desc } = await request.json();

        // Validate the input
        if (!title || !desc) {
            return NextResponse.json({ success: false, message: "Title and description are required" }, { status: 400 });
        }

        // Connect to the database
        await DBcon();

        // Create a new todo item
        const createNew = await Todomodel.create({ title, desc });

        // Return success message
        return NextResponse.json({ success: true, message: "Todo created successfully", todo: createNew }, { status: 200 });

    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({ success: false, message: "Internal server error", error }, { status: 500 });
    }
}

// GET: Retrieve all Todo items
export async function GET(request) {
    try {
        // Connect to the database
        await DBcon();

        // Fetch all todos
        const todos = await Todomodel.find();

        // Check if any todos exist
        if (!todos || todos.length === 0) {
            return NextResponse.json({ success: true, message: "No todos found", todos: [] }, { status: 404 });
        }

        // Return the list of todos
        return NextResponse.json({ success: true, message: "Todos retrieved successfully", todos }, { status: 200 });

    } catch (error) {
        console.error("Error retrieving todos:", error);
        return NextResponse.json({ success: false, message: "Internal server error", error }, { status: 500 });
    }
}