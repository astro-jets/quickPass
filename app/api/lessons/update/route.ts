// api/lessons/new
import dbConnect from "@/lib/db";
import Lesson from "@/models/Lesson";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const lessonId = searchParams.get("lesson");

    const updateData = { $set: { status: status } };

    const updatedLesson = await Lesson.findOneAndUpdate(
      { _id: lessonId },
      updateData
    );

    if (!updatedLesson) {
      return NextResponse.json(
        {
          status: false,
          message: `Failed to update lesson with ID "${lessonId}"`,
        },
        { status: 409 } // Conflict
      );
    }

    console.log("Updated Lesson => ", updatedLesson);
    // const user = updatedLesson.user;
    // const title = `Lesson ${status}`;
    // const description = `Your lesson ${updatedLesson.title} has been ${status}.`;
    // const notification = new Notification({
    //   user,
    //   title,
    //   description,
    // });
    // const newNotification = await notification.save();
    // console.log("New Notification => ", newNotification);

    return NextResponse.json(
      {
        status: true,
        message: `Lesson ${status} successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error updating lesson",
    });
  }
}
