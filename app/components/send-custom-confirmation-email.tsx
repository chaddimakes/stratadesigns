"use client";

import { useEffect } from "react";

export default function SendCustomConfirmationEmail({
  sessionId,
}: {
  sessionId: string;
}) {
  useEffect(() => {
    const storageKey = `custom_confirmation_sent_${sessionId}`;
    if (localStorage.getItem(storageKey)) return;

    fetch("/api/send-custom-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
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
