"use client";

import { addToCart } from "@/lib/actions/product.actions";
import { Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 size={20} className="animate-spin" /> &nbsp; Adding to
          Cart...
        </>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}

function AddToCartForm({ productId }: { productId: string }) {
  console.log("ProductId form addToCart Form", productId);
  const addToCartAction = addToCart.bind(null, productId); // Adjusted binding here
  const [formState, action] = useFormState(addToCartAction, {
    success: false,
    errors: {
      title: [""],
    },
  });
  return (
    <form action={action}>
      <SubmitButton />
      {formState?.errors && (
        <div className="text-red-500 text-sm mt-2">
          {formState?.errors.title.join(", ")}
        </div>
      )}
    </form>
  );
}

export default AddToCartForm;
