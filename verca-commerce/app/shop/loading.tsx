import ProductCartSkeleton from "@/components/skeletons/ProductCartSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center  gap-4 p-4">
      <ProductCartSkeleton />
    </div>
  );
};

export default loading;
