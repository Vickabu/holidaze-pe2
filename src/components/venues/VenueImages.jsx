import React, { useState } from "react";

const VenueImages = ({ media = [] }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!media.length) return null;

  const prevImage = () => {
    setMainImageIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setMainImageIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative w-full h-100">
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded p-2 hover:bg-opacity-75 z-10"
          aria-label="Last image"
        >
          ‹
        </button>

        <img
          src={media[mainImageIndex]?.url}
          alt={media[mainImageIndex]?.alt || "Venue Image"}
          className="w-full h-100 object-cover rounded shadow cursor-pointer transition-opacity duration-300 ease-in-out"
          onClick={() => setIsModalOpen(true)}
        />

        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded p-2 hover:bg-opacity-75 z-10"
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {media.length > 1 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Gallery</h2>
          <div className="flex gap-4">
            {media.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.alt || `Venue image ${index + 1}`}
                onClick={() => setMainImageIndex(index)}
                className={`w-24 h-16 object-cover rounded cursor-pointer border-2 transition duration-200 ${
                  index === mainImageIndex
                    ? "border-blue-500 scale-110"
                    : "border-transparent hover:border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-60 rounded px-4 pb-2 text-4xl text-black"
            aria-label="Last image"
          >
            ‹
          </button>

          <img
            src={media[mainImageIndex]?.url}
            alt={media[mainImageIndex]?.alt || "Large image"}
            className="max-w-3xl max-h-[80vh] object-contain rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-60 rounded px-4 pb-2 text-4xl text-black"
            aria-label="Next image"
          >
            ›
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default VenueImages;
