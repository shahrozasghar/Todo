
import DBcon from "@/libs/db"
import { NextResponse } from "next/server";
import Todomodel from '@/Models/Todo';
// PUT: Update a Todo item
export async function PUT(request, { params }) {
    try {
        const id = params.id;
        const { title, desc } = await request.json();

        // Validate the input
        if (!title || !desc) {
            return NextResponse.json({ message: "Title and description are required" }, { status: 400 });
        }

        // Connect to the database
        await DBcon();

        // Find the todo item by ID
        const findtodo = await Todomodel.findById(id);

        // Check if the todo item exists
        if (!findtodo) {
            return NextResponse.json({ message: "No todo found" }, { status: 404 });
        }

        // Update the todo item
        const updateTodo = await Todomodel.findByIdAndUpdate(id, { title, desc }, { new: true });

        // Return the updated todo item
        return NextResponse.json({ message: "Todo updated successfully", todo: updateTodo }, { status: 200 });

    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}

// DELETE: Delete a Todo item
export async function DELETE(request, { params }) {
    try {
        const id = params.id;

        // Connect to the database
        await DBcon();

        // Find the todo item by ID
        const findtodo = await Todomodel.findById(id);

        // Check if the todo item exists
        if (!findtodo) {
            return NextResponse.json({ message: "No todo found" }, { status: 404 });
        }

        // Delete the todo item
        const deleteTodo = await Todomodel.findByIdAndDelete(id);

        // Return success message
        return NextResponse.json({ message: "Todo deleted successfully", todo: deleteTodo }, { status: 200 });

    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}
export async function GET(request, { params }) {
    try {
        const id = params.id;

        // Connect to the database
        await DBcon();

        // Find the todo item by ID
        const findtodo = await Todomodel.findById(id);

        // Check if the todo item exists
        if (!findtodo) {
            return NextResponse.json({ message: "No todo found" }, { status: 404 });
        }
 

        // Return success message
        return NextResponse.json({ message: "find TODO successfully", todo: findtodo }, { status: 200 });

    } catch (error) {
        console.error("Error  todo:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}

