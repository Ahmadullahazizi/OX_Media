
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const navigate = useNavigate();

  // Function to go back
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      onClick={goBack}
      className="btn flex items-center gap-2 px-4 py-2 bg-sidebar-bg hover:bg-sidebar-hover text-black rounded mb-5"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      <span>Go Back</span>
    </button>
  );
};

export default BackButton;

