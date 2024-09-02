import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl animate-pulse">
      <figure className="w-full h-64 bg-gray-300"></figure>
      <div className="card-body rounded-xl text-gray-400">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
        <div className="card-actions justify-between items-center">
          <div className="badge bg-gray-300 text-transparent h-6 w-20"></div>
          <div className="flex space-x-2">
            <div className="badge bg-gray-300 text-transparent h-6 w-14"></div>
            <div className="badge bg-gray-300 text-transparent h-6 w-14"></div>
            <div className="badge bg-gray-300 text-transparent h-6 w-14"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
