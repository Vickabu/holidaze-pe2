import React from "react";
import { useNavigate } from "react-router-dom";

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
      className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition"
      onClick={handleClick}
    >
      <h2 className="text-xl font-semibold mb-2">Eier</h2>
      <div className="flex items-center space-x-4">
        {owner?.avatar?.url && (
          <img
            src={owner.avatar.url}
            alt={owner.avatar.alt || "Eierbilde"}
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
