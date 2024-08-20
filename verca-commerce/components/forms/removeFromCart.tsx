"use client";

import { addToCart, removeFromCart } from "@/lib/actions/product.actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="badge badge-error font-bold"
    >
      {pending ? (
        <>
          <span className="animate-spin" /> &nbsp; Removing to Cart...
        </>
      ) : (
        "Remove from Cart"
      )}
    </button>
  );
}

function RemoveFromCart({ productId }: { productId: string }) {
  console.log("ProductId form addToCart Form", productId);
  const removeFromCartId = removeFromCart.bind(null, productId); // Adjusted binding here
  const [formState, action] = useFormState(removeFromCartId, {
    success: false,
    errors: {
      title: [""],
    },
  });
  return (
    <form action={action} className="flex items-center">
      <SubmitButton />
      {formState?.errors && (
        <div className="text-red-500 text-sm mt-2">
          {formState?.errors.title.join(", ")}
        </div>
      )}
    </form>
  );
}

export default RemoveFromCart;
