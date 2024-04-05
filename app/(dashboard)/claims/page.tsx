import { getclaimsByUser } from "@/app/actions/claims";
import { getSubscriptions } from "@/app/actions/subcriptions";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ClaimsComponent from "@/app/components/claimsComponent";
import { getServerSession } from "next-auth";


const Claims = async () => {
    const session = await getServerSession(options);
    if (!session) { return };
    const claims = await getclaimsByUser(session.user.id);
    console.log("Claims => ", claims)
    const subscriptions = await getSubscriptions(session.user.id)

    return (
        <ClaimsComponent claims={claims.claimsData} subscriptions={subscriptions} />
    )
}

export default Claims;