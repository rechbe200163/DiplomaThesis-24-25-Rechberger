import React from "react";

const ProductDetailsPageSkeleton = () => {
  return (
    <div className="p-4 md:p-20">
      <div className="card flex flex-col xl:flex-row w-full shadow-xl animate-pulse">
        {/* Image Placeholder */}
        <figure className="flex-none w-full xl:w-1/3 bg-gray-300 h-80 xl:h-auto rounded-xl xl:rounded-none"></figure>
        <div className="card-body flex-1 p-4 md:p-6">
          {/* Title Placeholder */}
          <div className="h-8 md:h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
          {/* Description Placeholder (Hidden on Mobile) */}
          <div className="hidden md:block mt-4 text-sm md:text-base">
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-11/12 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-10/12 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-9/12 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-8/12"></div>
          </div>
          {/* Price and Button Placeholder */}
          <div className="card-actions justify-between mt-4 md:mt-8">
            <div className="h-8 bg-gray-300 rounded w-24"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>
      {/* Mobile Accordion Placeholder for Description */}
      <div className="collapse mt-4 shadow-xl from from-gray-200 bg-gradient-to-t hover:bg-gray-300 transition-colors ease-in-out duration-500">
        <div className="collapse-title text-xl font-medium bg-gray-300 h-8 w-36 rounded"></div>
        <div className="collapse-content">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-10/12 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-9/12 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-8/12"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPageSkeleton;
