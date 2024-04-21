// import { getNotifications } from "@/app/actions/action";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import NavComponent from "./NavComponent";

type notificationProps = {
    id: string,
    title: string,
    description: string
}

const Navbar = async () => {
    const session = await getServerSession(options);

    // const res: notificationProps = await getNotifications(session?.user.id!);
    const notification: notificationProps = { id: '', title: '', description: '' }

    return (
        <NavComponent notifications={notification} />
    );
}

export default Navbar;