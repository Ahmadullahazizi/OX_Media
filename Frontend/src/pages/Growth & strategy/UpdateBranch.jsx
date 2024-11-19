import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  GetAllBranch,
  GetSingleBranch,
  UpdateSingleBranch,
} from "@/store/features/branch/branchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateBranch() {
  const [inputValues, setInputValues] = useState({
    title: "",
    price: "",
    category: "",
    picture: "",
    description: "",
  });
  const branch = useSelector((state) => state.branch.branch);
  const status = useSelector((state) => state.branch.status);
  const error = useSelector((state) => state.branch.error);
  const { branchId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setInputValues((values) => ({
      ...values,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  // const handleCategoryChange = (value) => {
  //   setInputValues((values) => ({ ...values, category: value }));
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValues);
    dispatch(UpdateSingleBranch({ inputValues, branchId }))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response.message, { autoClose: 2000 });
          navigate("/admin/branch");
        } else {
          toast.error(response.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    inputValues((values) => ({ ...values, [name]: file }));
  };

  useEffect(() => {
    // For Getting branch Details - branch Collection
    dispatch(GetSingleBranch(branchId));
    // For Getting Category Details - Category Collection
    dispatch(GetAllBranch());
  }, [branchId, dispatch]);

  useEffect(() => {
    if (branch && branch.branch) {
      console.log(branch.branch);
      const { 
        branch_name,
        branch_website_link, 
        country, 
        manager_id, 
        local_currency,
        local_currency_abbr, 
        local_languag ,
        date_added,
        description } = branch.branch;
      setInputValues({
        branch_name: branch_name,
        branch_website_link: branch_website_link,
        country: country,
        manager_id: manager_id,
        local_currency: local_currency,
        local_currency_abbr: local_currency_abbr,
        local_languag: local_languag,
        date_added:date_added,
        description: description,
      });
    }
  }, [branch]);

  if (status == "loading") {
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
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle>Branch Details</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="manager_id">Branch Name</Label>
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
                <Label htmlFor="manager_id">Select Branch Manager</Label>
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
                  <Label htmlFor="country">Country</Label>
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="local_language">Local Language</Label>
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
                  <Label htmlFor="local_currency">Local Currency</Label>
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
                    Currency Abbreviation
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
                  <Label htmlFor="branch_website_link">Website Url</Label>
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
                <Label htmlFor="description">Niche Description</Label>
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
                disabled={status == "loading" ? true : false}
                type="submit"
                className="w-full rounded-3xl bg-transparent text-black border-2 border-gray-200 mt-4 hover:bg-red-950 hover:text-white hover:border-none transition-all"
              >
                {status == "loading" ? "Updating Branch ..." : "Update Branch"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default UpdateBranch;
