"use client";

import { CartProvider } from "../context/CartContext";
import CartSidebar from "./Shared/CartSidebar";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
    return (
        <CartProvider>
            {children}
            <CartSidebar />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1f2937',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '12px',
                    },
                }}
            />
        </CartProvider>
    );
}
