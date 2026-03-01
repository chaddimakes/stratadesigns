import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0d0d0d",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* PP mark — top left */}
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 60,
            width: 56,
            height: 56,
            borderRadius: 10,
            backgroundColor: "#e07b39",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            fontSize: 24,
            fontWeight: 700,
            color: "white",
          }}
        >
          PP
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#e07b39",
              textAlign: "center",
              letterSpacing: "-1px",
              lineHeight: 1.15,
            }}
          >
            I Built an E-Commerce Website
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#e07b39",
              textAlign: "center",
              letterSpacing: "-1px",
              lineHeight: 1.15,
            }}
          >
            with Zero Coding Experience
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 40,
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.85)",
              textAlign: "center",
            }}
          >
            The side business was always the plan.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.85)",
              textAlign: "center",
            }}
          >
            The website was always the excuse.
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
