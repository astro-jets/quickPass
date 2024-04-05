import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getUsers } from "@/app/actions/users";

export const metadata: Metadata = {
  title: "Quick Pass Admin",
  description: "This is the dashboard",
};
type userType = {
  id: string; name: string; email: string; role: string
}[]
type dataProps = {
  students: string, instructors: string
}

export default async function Home() {
  const res = await getUsers();
  const users: userType = res.usersData;
  const students = users.filter(user => user.role == 'user')
  const instructors = users.filter(user => user.role == 'instructor')
  console.log("Students => ", students)
  const data: dataProps = {
    instructors: instructors.length.toString(),
    students: students.length.toString()
  }
  return (
    <>
      <DefaultLayout>
        <ECommerce data={data} />
      </DefaultLayout>
    </>
  );
}
