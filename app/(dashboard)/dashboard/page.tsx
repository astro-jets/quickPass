import GridStats from "@/app/components/Stats/TopStats";
import { BsArchive, BsCarFront, BsCreditCard, BsFolder2Open, BsWrenchAdjustableCircle } from "react-icons/bs";
import { getPaymentsData, getStats, getTransData } from "@/app/actions/action";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import ClientTransChart from "../components/ClientTransChart";
import PaymentsGraph from "../components/Payments";
import Loader from "@/components/loader/page";

type statsType = {
    stats: {
        claims: string;
        subscriptions: string;
        payments: string;
    }
};

async function Dashboard() {
    let loading = true;
    const session = await getServerSession(options);
    if (!session) { return }
    const res: statsType = await getStats(session.user.id)
    const stats = res.stats;
    const transactions = await getTransData(session.user.id)
    const payments = await getPaymentsData(session.user.id)
    if (payments && transactions && res) {
        loading = false;
    }

    const statsData = [
        { link: '/claims', label: 'Lessons Completed', value: stats.claims, icon: <BsCarFront color={'orange'} size={50} />, positive: false },
        { link: '/subscriptions', label: 'Subscriptions', value: stats.subscriptions, icon: <BsWrenchAdjustableCircle color={'orange'} size={50} />, positive: false },
        { link: '', label: 'Payments', value: `K${stats.payments.toLocaleString()}`, icon: <BsCreditCard color={'orange'} size={50} />, positive: false },
    ]
    console.log("Payments => ", payments)

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="w-full h-full flex flex-col space-y-10">
                <h1 className="text-lg text-blue-500 font-bold">Dashboard</h1>
                <div className="w-full flex  justify-around">
                    {statsData.map((stat, index) => (
                        <GridStats key={index} {...stat} />
                    ))}
                </div>
                <h1 className="text-xl text-blue-500">Your Transactions</h1>
                <ClientTransChart transactions={transactions.result} />

                <h1 className="text-xl text-blue-500">Your Payments</h1>
                <PaymentsGraph payments={payments.result} />

            </div>
        </>
    )
}
export default Dashboard;