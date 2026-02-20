"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/cart-context";

// Clears the cart after a successful purchase.
// Rendered inside the server success page as a client island.
export default function ClearCartOnSuccess() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
