import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

/**
 * Displays a gallery of venue images with navigation arrows and a modal for enlarged viewing.
 *
 * @param {Object} props
 * @param {Array<{url: string, alt?: string}>} [props.media=[]] - Array of image objects with URL and optional alt text.
 *
 * @returns {JSX.Element|null} Image gallery component or null if no images provided.
 */

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

  const hasMultipleImages = media.length > 1;

  return (
    <>
      <div className="relative w-full h-100">
        {hasMultipleImages && (
          <button
            onClick={prevImage}
            className="
            absolute left-2 top-1/2 transform -translate-y-1/2 
            bg-black/80 hover:bg-black/90
            text-white rounded py-2
            shadow-md hover:shadow-lg 
            transition duration-300 ease-in-out
          "
            aria-label="Previous image"
          >
            <HiChevronLeft className="w-8 h-8" aria-hidden="true" />
          </button>
        )}

        <img
          src={media[mainImageIndex]?.url}
          alt={media[mainImageIndex]?.alt || "Venue Image"}
          className="w-full h-100 object-cover rounded shadow cursor-pointer transition-opacity duration-300 ease-in-out"
          onClick={() => setIsModalOpen(true)}
        />

        {hasMultipleImages && (
          <button
            onClick={nextImage}
            className="
            absolute right-2 top-1/2 transform -translate-y-1/2 
            bg-black/80 hover:bg-black/90
            text-white rounded py-2 
            shadow-md hover:shadow-lg 
            transition duration-300 ease-in-out
          "
            aria-label="Next image"
          >
            <HiChevronRight className="w-8 h-8" aria-hidden="true" />
          </button>
        )}
      </div>

      {hasMultipleImages && (
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
                    ? "border-[#1F3B3C] scale-110"
                    : "border-transparent hover:border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 bg-black/90 backdrop-blur-sm h-screen"
          onClick={() => setIsModalOpen(false)}
        >
          {hasMultipleImages && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-10 top-1/2 transform -translate-y-1/2 
              bg-white/70 hover:bg-white
              rounded py-2 
              shadow-md hover:shadow-lg 
              transition duration-300 ease-in-out
              "
              aria-label="Previous image"
            >
              <HiChevronLeft
                className="w-8 h-8 text-black"
                aria-hidden="true"
              />
            </button>
          )}

          <img
            src={media[mainImageIndex]?.url}
            alt={media[mainImageIndex]?.alt || "Large image"}
            className="max-w-3xl max-h-[80vh] object-contain rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {hasMultipleImages && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="
                  absolute right-10 top-1/2 transform -translate-y-1/2 
                  bg-white/70 hover:bg-white
                  rounded py-2
                  shadow-md hover:shadow-lg 
                  transition duration-300 ease-in-out
                "
              aria-label="Next image"
            >
              <HiChevronRight
                className="w-8 h-8 text-black"
                aria-hidden="true"
              />
            </button>
          )}

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
