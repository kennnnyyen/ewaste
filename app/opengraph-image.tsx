import { ImageResponse } from "next/og";

export const alt =
  "Recore — e-waste recycling, computer component recovery and data destruction enquiries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 74px",
          width: "100%",
          height: "100%",
          background: "#f5f2ea",
          color: "#182d35",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 42, letterSpacing: -2 }}>
          recore<span style={{ color: "#b74b2a" }}>↗</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            letterSpacing: -4,
          }}
        >
          <span>Old technology.</span>
          <span style={{ color: "#b74b2a" }}>New possibilities.</span>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #c5c9bf",
            paddingTop: 24,
            fontSize: 23,
          }}
        >
          E-waste recycling · Component recovery · Data destruction
        </div>
      </div>
    ),
    size,
  );
}
