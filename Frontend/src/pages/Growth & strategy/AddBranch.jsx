import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MdAddCircleOutline } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AddNewBranch,
  DeleteBranch,
  GetAllBranch,
} from "@/store/features/branch/branchSlice";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Shop from "../../assets/branch.png";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { DialogTitle } from "@radix-ui/react-dialog";

function AddBranch() {
  const branchStatus = useSelector((state) => state.branch.status);
  const branch = useSelector((state) => state.branch.branch);
  const error = useSelector((state) => state.branch.error);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [inputValues, setinputValues] = useState({ country: "" });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputValues((values) => ({ ...values, [name]: value }));
  };
  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setinputValues((values) => ({ ...values, [name]: file }));
  };
  const handleSubmit = () => {
    //e.preventDefault();
    console.log(inputValues);
    dispatch(AddNewBranch(inputValues))
      .unwrap()
      .then((respons) => {
        if (respons?.success == true) {
          console.log(respons);
          setinputValues({});
          setTimeout(() => {
            nevigate("/admin/branch");
          }, 2000);
          toast.success(respons?.message, { autoClose: 2000 });
        } else {
          toast.error(respons?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };
  const handleDelete = (branchId) => {
    dispatch(DeleteBranch(branchId))
      .unwrap()
      .then((respons) => {
        if (respons?.success == true) {
          toast.success(respons?.message, { autoClose: 2000 });
          dispatch(GetAllBranch());
        } else {
          toast.error(respons?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  //This UseEffect Run whenever this page load
  useEffect(() => {
    dispatch(GetAllBranch());
  }, [dispatch]);

  if (branchStatus == "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading Branch</p>
      </div>
    );
  }
  if (error == "error") {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>An Unexpected Error Occurs While Fetching Branch</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap align-top md:justify-start items-start p-6 space-x-4 space-y-4 ">
        {/* ADD NEW BRANCH */}
        <Card className="flex w-[250px] h-[300px] bg-transparent hover:shadow-gray-300 items-center justify-center hover:bg-gray-100">
          <CardContent>
            <Dialog>
              <DialogTrigger>
                <MdAddCircleOutline size={"50px"} color="gray" />
              </DialogTrigger>
              <DialogContent className={"overflow-y-scroll max-h-[90vh]"}>
                {/* <DialogTitle>
                  Add Branch
                  </DialogTitle> */}
                <DialogHeader>
                  <DialogDescription>
                    <Card className="mx-auto max-w-md my-8 ">
                      <CardHeader>
                        <CardTitle className="text-xl self-start">
                          Add Branch
                        </CardTitle>
                        <CardDescription>
                          Enter your information to create a new Branch
                        </CardDescription>
                      </CardHeader>
                      <CardContent className={"text-left"}>
                        <DialogTitle className="hidden">
                          Update Branch
                        </DialogTitle>
                        <form
                          onSubmit={handleSubmit}
                          encType="multipart/form-data"
                        >
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="manager_id">
                                Branch Name
                                <span className="text-red-700 font-bold text-xl">
                                  *
                                </span>{" "}
                              </Label>
                              <Input
                                className={
                                  "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                }
                                id="branch_name"
                                name="branch_name"
                                value={inputValues.branch_name || ""}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="manager_id">
                                Select Branch Manager{" "}
                                <span className="text-red-700 font-bold text-xl">
                                  *
                                </span>
                              </Label>
                              <Input
                                className={
                                  "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                }
                                id="manager_id"
                                name="manager_id"
                                value={inputValues.manager_id || ""}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="country">
                                  Country{" "}
                                  <span className="text-red-700 font-bold text-xl">
                                    *
                                  </span>
                                </Label>
                                <select
                                  className="rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                  id="country"
                                  name="country"
                                  value={inputValues.country}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="" disabled>
                                    Select a country
                                  </option>
                                  {/* Placeholder option */}
                                  <option value="United States">
                                    United States
                                  </option>
                                  <option value="Canada">Canada</option>
                                  <option value="United Kingdom">
                                    United Kingdom
                                  </option>
                                  <option value="Australia">Australia</option>
                                  <option value="India">India</option>
                                  <option value="Germany">Germany</option>
                                  <option value="France">France</option>
                                  {/* Add more countries here */}
                                </select>
                              </div>

                              {/* <div className="grid gap-2">
                                <Label htmlFor="country">
                                  Country{" "}
                                  <span className="text-red-700 font-bold text-xl">
                                    *
                                  </span>{" "}
                                </Label>
                                <Input
                                  className={
                                    "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                  }
                                  id="country"
                                  name="country"
                                  required
                                  value={inputValues.country || ""}
                                  onChange={handleChange}
                                />
                              </div> */}
                              <div className="grid gap-2">
                                <Label htmlFor="local_language">
                                  Local Language{" "}
                                  <span className="text-red-700 font-bold text-xl">
                                    *
                                  </span>
                                </Label>
                                <Input
                                  className={
                                    "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                  }
                                  id="local_language"
                                  name="local_language"
                                  required
                                  value={inputValues.local_language || ""}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="local_currency">
                                  Local Currency{" "}
                                  <span className="text-red-700 font-bold text-xl">
                                    *
                                  </span>
                                </Label>
                                <Input
                                  className={
                                    "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                  }
                                  id="local_currency"
                                  name="local_currency"
                                  required
                                  value={inputValues.local_currency || ""}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="local_currency_abbr">
                                  Currency Abbreviation{" "}
                                  <span className="text-red-700 font-bold text-xl">
                                    *
                                  </span>
                                </Label>
                                <Input
                                  className={
                                    "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                  }
                                  id="local_currency_abbr"
                                  name="local_currency_abbr"
                                  required
                                  value={inputValues.local_currency_abbr || ""}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="legal_doc">Legal Document</Label>
                              <Input
                                className={
                                  "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                }
                                id="legal_doc"
                                type="file"
                                name="legal_doc"
                                onChange={handleFileChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="proj_plan">Project Plan</Label>
                              <Input
                                className={
                                  "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                }
                                id="proj_plan"
                                type="file"
                                name="proj_plan"
                                onChange={handleFileChange}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="date_added">Date Added</Label>
                                <Input
                                  className={
                                    "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                  }
                                  id="date"
                                  name="date_added"
                                  type="date"
                                  value={inputValues.date_added || ""}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="branch_website_link">
                                  Website Url
                                </Label>
                                <Input
                                  className={
                                    "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                  }
                                  id="branch_website_link"
                                  name="branch_website_link"
                                  value={inputValues.branch_website_link || ""}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="grid gap-2 mb-4">
                              <Label htmlFor="description">
                                Branch Description
                              </Label>
                              <Textarea
                                className={
                                  "rounded-2xl py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-transparent"
                                }
                                id="description"
                                placeholder="Branch description"
                                required
                                name="description"
                                type="text"
                                value={inputValues.description || ""}
                                onChange={handleChange}
                              />
                            </div>
                            <Button
                              disabled={
                                branchStatus == "loading" ? true : false
                              }
                              type="submit"
                              className="w-full rounded-3xl bg-transparent text-black border-2 border-gray-200 mt-4 hover:bg-red-950 hover:text-white hover:border-none transition-all"
                            >
                              {branchStatus == "loading"
                                ? "Adding Branch ..."
                                : "Add Branch"}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <p className="text-lg font-semibold text-gray-500">Add Site </p>
          </CardContent>
        </Card>

        {branch &&
          branch &&
          branch.Branches &&
          branch.Branches.map((branch) => {
            return (
              <>
                <Card
                  key={branch._id}
                  className="flex flex-col w-[250px] h-[300px] bg-white border border-slate-100 items-center hover:shadow-gray-300"
                >
                  <CardHeader className="w-full px-4">
                    <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
                      {/* Right Aligned: Edit Icon */}
                      <FiEdit
                        className="cursor-pointer"
                        size={"18px"}
                        color="gray"
                        onClick={() => {
                          nevigate(`/admin/branch/update/${branch._id}`);
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
                  <CardContent className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex h-20 items-center justify-center px-4 lg:h-[80px] lg:p-4 mt-2">
                      <img
                        src={Shop}
                        alt="Organicx Media logo"
                        className="w-[100px]"
                      />
                    </div>
                    <h1 className="text-md"> {branch.branch_name}</h1>
                    <div className="w-full flex space-x-3 justify-center items-center text-gray-400 text-sm mb-4">
                      <MdOutlineEditLocationAlt
                        className="cursor-pointer"
                        size={"18px"}
                        color="gray"
                      />
                      <p className="text-md text-gray-500"> Add Site</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            );
          })}
      </div>
    </>
  );
}

export default AddBranch;
