// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Lesson from "@/models/Lesson";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { car, instructor, application, date } = await req.json();

    const newLesson = new Lesson({
      car,
      instructor,
      application,
      date,
    });

    const exists = await Lesson.findOne({ application });
    if (exists) {
      return NextResponse.json(
        {
          status: false,
          message: "This Lesson is already registered.",
        },
        { status: 500 }
      );
    }
    const lesson = await newLesson.save();
    if (lesson) {
      return NextResponse.json(
        {
          status: true,
          message: `Lesson has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating Lesson",
    });
  }
}
