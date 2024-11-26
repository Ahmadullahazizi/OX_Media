import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  AddNewBranch,
  GetAllBranch,
} from "@/store/features/branch/branchSlice";
import BackButton from "@/components/BackButton";

function NewBranch() {
  const branchStatus = useSelector((state) => state.branch.status);
  const error = useSelector((state) => state.branch.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    branch_name: "",
    manager_id: "",
    country: "",
    local_currency: "",
    local_currency_abbr: "",
    local_language: "",
    date_added: "",
    branch_website_link: "",
    description: "",
    legal_doc: null,
    proj_plan: null,
  });

  const countryCurrencyList = [
    {
      country: "United States",
      currency: "Dollar",
      abbreviation: "USD",
      language: "English",
    },
    {
      country: "United Kingdom",
      currency: "Pound Sterling",
      abbreviation: "GBP",
      language: "English",
    },
    {
      country: "Japan",
      currency: "Yen",
      abbreviation: "JPY",
      language: "Japnese",
    },
    {
      country: "India",
      currency: "Rupee",
      abbreviation: "INR",
      language: "Hindi",
    },
    {
      country: "Canada",
      currency: "Dollar",
      abbreviation: "CAD",
      language: "English",
    },
    {
      country: "Turkiye",
      currency: "Lira",
      abbreviation: "Lir",
      language: "Turkce",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((values) => ({ ...values, [name]: value }));

    // Update currency and abbreviation based on country selection
    if (name === "country") {
      const selectedCountry = countryCurrencyList.find(
        (item) => item.country === value
      );
      if (selectedCountry) {
        setInputValues((values) => ({
          ...values,
          local_currency: selectedCountry.currency,
          local_currency_abbr: selectedCountry.abbreviation,
          local_language: selectedCountry.language,
        }));
      } else {
        // Clear the fields if the country is not in the list
        setInputValues((values) => ({
          ...values,
          local_currency: "",
          local_currency_abbr: "",
        }));
      }
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setInputValues((values) => ({ ...values, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(AddNewBranch(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success) {
          setInputValues({});
          toast.success(response?.message, { autoClose: 2000 });
          setTimeout(() => {
            navigate("/admin/branch");
          }, 2000);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error("Error submitting form", { autoClose: 2000 });
      });
  };

  useEffect(() => {
    dispatch(GetAllBranch());
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // yyyy-mm-dd format
    setInputValues((prev) => ({ ...prev, date_added: formattedDate }));
  }, [dispatch]);

  if (branchStatus === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading Branch...</p>
      </div>
    );
  }

  if (error === "error") {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>An unexpected error occurred while fetching branches.</p>
      </div>
    );
  }

  return (
    <>
      <div className="items-start align-middle mb-5 sm:bg-white">
        <div>
          <BackButton />
        </div>
        <h1 className="text-lg font-semibold md:text-2xl">Add Branch</h1>
      </div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl space-y-6"
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Add A New Branch
          </h1>

          {/* Row 1 */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Branch Name*</label>
              <input
                type="text"
                name="branch_name"
                value={inputValues.branch_name || ""}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Manager ID*</label>
              <input
                type="text"
                name="manager_id"
                value={inputValues.manager_id || ""}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Country*</label>
              <select
                name="country"
                value={inputValues.country || ""}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              >
                <option value="">Select a country</option>
                {countryCurrencyList.map((item) => (
                  <option key={item.country} value={item.country}>
                    {item.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Local Currency*</label>
              <input
                type="text"
                name="local_currency"
                value={inputValues.local_currency || ""}
                readOnly
                className="border rounded w-full px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">
                Local Currency Abbreviation*
              </label>
              <input
                type="text"
                name="local_currency_abbr"
                value={inputValues.local_currency_abbr || ""}
                readOnly
                className="border rounded w-full px-3 py-2 bg-gray-100"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Local Language*</label>
              <input
                type="text"
                name="local_language"
                value={inputValues.local_language || ""}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Date*</label>
              <input
                type="date"
                name="date_added"
                value={inputValues.date_added || ""}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Branch Website Link</label>
              <input
                type="url"
                name="branch_website_link"
                value={inputValues.branch_website_link || ""}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Legal Document (PDF)</label>
              <input
                type="file"
                name="legal_doc"
                onChange={handleFileChange}
                className="block w-full"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-medium">Project Plan (PDF)</label>
              <input
                type="file"
                name="proj_plan"
                onChange={handleFileChange}
                className="block w-full"
              />
            </div>
          </div>

          {/* Row 6 */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2">
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={inputValues.description || ""}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewBranch;
