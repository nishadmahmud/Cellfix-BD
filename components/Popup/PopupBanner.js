"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API || "https://api.cellfixbd.com";
const USER_ID = process.env.NEXT_PUBLIC_USER_ID || "1";
const POPUP_API_URL = `${API_BASE.replace(/\/$/, "")}/public/popups/${USER_ID}`;

export default function PopupBanner() {
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPopup = async () => {
      try {
        const res = await fetch(POPUP_API_URL, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Popup API failed: ${res.status}`);
        }

        const json = await res.json();
        const firstPopup = Array.isArray(json?.data) ? json.data[0] : null;

        if (isMounted) {
          setPopup(firstPopup?.image ? firstPopup : null);
        }
      } catch (error) {
        console.error("Failed to load popup banner:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPopup();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!popup || closed) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [popup, closed]);

  if (loading || !popup || closed) return null;

  const imageElement = (
    <img
      src={popup.image}
      alt={popup.title || "Promotional popup"}
      className="w-full h-auto max-h-[88vh] md:max-h-[76vh] object-contain select-none"
    />
  );

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-3 md:p-6 bg-black/45">
      <div className="relative w-full max-w-[95vw] md:max-w-[760px]">
        <button
          onClick={() => setClosed(true)}
          aria-label="Close popup"
          className="absolute right-2 top-2 z-10 h-9 w-9 rounded-full bg-black/55 text-white text-2xl leading-none hover:bg-black/75 transition-colors"
        >
          ×
        </button>

        {popup.url ? (
          <a
            href={popup.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open offer"
          >
            {imageElement}
          </a>
        ) : (
          imageElement
        )}
      </div>
    </div>
  );
}
