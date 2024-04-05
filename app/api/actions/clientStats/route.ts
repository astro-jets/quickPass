// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import Subscription from "@/models/Subscription";
import Claim from "@/models/Claim";
import { NextResponse } from "next/server";
import Service from "@/models/Service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user");

    await dbConnect();

    const claims = await Claim.countDocuments({ user: userId });
    const subscriptions = await Subscription.countDocuments({ user: userId });
    const payementsSet = await Subscription.find({ user: userId });
    let payments = 0;
    for (let i = 0; i < payementsSet.length; i++) {
      const subscription = payementsSet[i];
      const service = await Service.findById(subscription.service);
      payments += parseInt(service.price as string);
    }

    const stats = {
      claims,
      subscriptions,
      payments,
    };

    return NextResponse.json({ stats }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
