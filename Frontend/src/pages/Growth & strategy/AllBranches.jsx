import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  DeleteBranch,
  GetAllBranch,
} from "@/store/features/branch/branchSlice";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Shop from "../../assets/branch.png";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import BackButton from "@/components/BackButton";

function AllBranches() {
  const branchStatus = useSelector((state) => state.branch.status);
  const branch = useSelector((state) => state.branch.branch);
  const error = useSelector((state) => state.branch.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (branchId) => {
    dispatch(DeleteBranch(branchId))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          toast.success(response?.message, { autoClose: 2000 });
          dispatch(GetAllBranch());
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    dispatch(GetAllBranch());
  }, [dispatch]);

  if (branchStatus === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading Branches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>An unexpected error occurred while fetching branches.</p>
      </div>
    );
  }

  return (
    <>
      <div className=" items-start align-middle mb-5 sm:bg-white">
        <div>
          <BackButton />
        </div>
        <h1 className="text-lg font-semibold md:text-2xl">Branch</h1>
      </div>
      <div className="flex flex-wrap justify-between mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {branch?.Branches?.length > 0 ? (
            branch.Branches.map((branch) => (
              <Card
                key={branch._id}
                className="bg-white border border-slate-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4"
              >
                {" "}
                <CardHeader className="w-full px-4">
                  <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
                    {/* Right Aligned: Edit Icon */}
                    <FiEdit
                      className="cursor-pointer"
                      size={"18px"}
                      color="gray"
                      onClick={() => {
                        navigate(`/admin/branch/update/${branch._id}`);
                      }}
                    />
                    {/* Left Aligned: Trash Icon */}
                    <RiDeleteBinLine
                      className="cursor-pointer"
                      size={"18px"}
                      color="gray"
                      onClick={() => {
                        handleDelete(branch._id);
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <img
                    src={Shop}
                    alt="Branch logo"
                    className="w-24 h-24 object-cover mb-4"
                  />
                  <h2 className="text-lg font-semibold text-center mb-2">
                    {branch.branch_name}
                  </h2>
                  <div className="flex items-center text-gray-500">
                    <MdOutlineEditLocationAlt className="mr-2" size={18} />
                    <p className="text-sm">Add Site</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center w-full text-gray-500">
              No branches available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default AllBranches;
