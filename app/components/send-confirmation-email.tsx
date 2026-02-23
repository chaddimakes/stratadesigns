"use client";

import { useEffect } from "react";

export default function SendConfirmationEmail({
  sessionId,
}: {
  sessionId: string;
}) {
  useEffect(() => {
    const storageKey = `confirmation_sent_${sessionId}`;
    if (localStorage.getItem(storageKey)) return;

    fetch("/api/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        origin: window.location.origin,
      }),
    })
      .then((res) => {
        if (res.ok) localStorage.setItem(storageKey, "1");
      })
      .catch(() => {
        // Silently fail — order was successful regardless
      });
  }, [sessionId]);

  return null;
}
