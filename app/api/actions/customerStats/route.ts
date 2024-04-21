// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Car from "@/models/Car";
import { NextResponse } from "next/server";
import Application from "@/models/Application";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const applications = await Application.find({ user: id });
    const lessons = await Lesson.find({ user: id });

    let paymentsCount = 0;
    for (let i = 0; i < applications.length; i++) {
      const application = applications[i];
      const course = await Course.findById(application.course);
      paymentsCount += parseInt(course.price as string);
    }
    const stats = {
      lessons: applications.length,
      applications: applications.length,
      payments: paymentsCount,
    };

    return NextResponse.json({ stats }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching User ${error}`,
    });
  }
}
