"use client"
import { deleteUser } from "@/app/actions/users";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../common/Loader";
import { ApplicationProps } from "@/types/application";
import { IoFolderOpenSharp } from "react-icons/io5";

const CoursesTable = ({ applications }: { applications: ApplicationProps[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setLoading(true)
    const res = await deleteUser(id);
    if (res.status) {
      setShowModal(true);
    }
    setLoading(false)
  }
  return (
    <>
      <SucessModal
        isOpen={showModal}
        title="User deleted"
        message="Instructor deleted successfully"
        onClose={() => {
          setShowModal(false);
          router.refresh();
        }}
        url=""
      />
      {loading && <Loader />}
      {showForm &&
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Create Lesson
            </h3>
          </div>
          <form >
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Select Instructor
                </label>
                <input
                  type="text"
                  placeholder="Course Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Select Car
                </label>
                <input
                  type="number"
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>


              <div className="w-full flex justify-between mb-4">
                <div className="w-[66%]">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Set Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="Course Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <button type="button" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Create Lesson
              </button>
            </div>
          </form>
        </div>
      }
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Applicant
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Course
                </th>

                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {application.user.name}
                    </h5>
                    <p className="text-sm">Email: {application.user.email}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {application.course}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {/* View */}
                      <button className="bg-primary rounded-lg text-white p-3" onClick={() => { setShowForm(!showForm) }}>
                        {showForm ? "close" : "Create Lesson"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CoursesTable;
