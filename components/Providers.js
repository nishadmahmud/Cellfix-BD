"use client";

import { CartProvider } from "../context/CartContext";
import CartSidebar from "./Shared/CartSidebar";

export default function Providers({ children }) {
    return (
        <CartProvider>
            {children}
            {/* The CartSidebar will sit at the root level inside the provider to access state easily */}
            <CartSidebar />
        </CartProvider>
    );
}
