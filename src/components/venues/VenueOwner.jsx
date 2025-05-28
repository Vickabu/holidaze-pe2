import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Component to display venue owner information.
 * Clicking navigates to the owner's profile or seller page depending on user.
 *
 * @param {Object} props
 * @param {Object} props.owner - Owner details.
 * @param {string} props.owner.name - Owner's name.
 * @param {string} [props.owner.email] - Owner's email.
 * @param {Object} [props.owner.avatar] - Owner's avatar image details.
 * @param {string} props.owner.avatar.url - URL of the avatar image.
 * @param {string} [props.owner.avatar.alt] - Alt text for the avatar image.
 * @param {string} [props.owner.bio] - Owner biography or description.
 */
const VenueOwner = ({ owner }) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isOwner = userInfo?.name === owner?.name;

  const handleClick = () => {
    if (isOwner) {
      navigate("/profile");
    } else {
      navigate(`/sellers/${owner.name}`);
    }
  };

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition h-fit"
      onClick={handleClick}
    >
      <h2 className="text-xl font-semibold mb-2">Owner</h2>
      <div className="flex items-center space-x-4">
        {owner?.avatar?.url && (
          <img
            src={owner.avatar.url}
            alt={owner.avatar.alt || "Owner image"}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold">{owner.name}</p>
          <p className="text-sm text-gray-600">{owner.email}</p>
        </div>
      </div>
      {owner.bio && <p className="mt-2 text-gray-700">{owner.bio}</p>}
    </div>
  );
};

export default VenueOwner;
