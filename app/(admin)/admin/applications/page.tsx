import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ApplicationsTable from "@/components/Tables/ApplicationsTable";
import { getcourses } from "@/app/actions/courses";
import { CourseProps } from "@/types/course";
import { getApplications } from "@/app/actions/Applications";

export const metadata: Metadata = {
    title: "Applications",
    description: "Applications page",
};



const Applications = async () => {
    const res = await getApplications();
    const applications = res.applications;
    console.log("Applications => ", applications)
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Applications" />

            <div className="flex flex-col gap-10">
                <ApplicationsTable applications={applications} />
            </div>
        </DefaultLayout>
    );
};

export default Applications;
