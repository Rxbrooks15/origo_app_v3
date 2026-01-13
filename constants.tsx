import React from "react";



export const COLORS = {
  primary: "#A8BBA2",
  primaryDark: "#8a9c84",
  primaryLight: "#cce0c8",
  accent: "#E6A88E",
  bg: "#f9fbf9",
  text: "#3A4238",
  textLight: "#7A8576",
  airplaneYellow: "#FFC107",
  airplaneShadow: "#E65100",
};

/** ✅ NEW: LampSVG using lamp.svg (mirrored) + same toggle + light cone */
export const LampSVG = ({
  className,
  lampOn,
  onToggle,
}: {
  className?: string;
  lampOn: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={[
        // same default placement you were using before
        "absolute bottom-[110px] right-[38px] w-[220px] h-[300px] cursor-pointer select-none z-10",
        "transition-transform duration-300 active:scale-[0.99]",
        className || "",
      ].join(" ")}
      onClick={onToggle}
      role="button"
      aria-label={lampOn ? "Turn lamp off" : "Turn lamp on"}
    >
      {/* Light cone (same functionality as your prior lamp) */}
      {lampOn && (
        <div
          className="absolute left-[-40px] top-[98px] w-[270px] h-[380px] -z-10 blur-[0.5px]"
          style={{
            clipPath: "polygon(52% 0%, 0% 100%, 100% 100%)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 45%, rgba(255,255,255,0))",
          }}
        />
      )}

      {/* Mirrored SVG */}
      <LampIcon
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: "scaleX(-1)", // ✅ mirror
          transformOrigin: "center",
          filter: lampOn
            ? "drop-shadow(0 0 14px rgba(255,245,180,0.45))"
            : "none",
        }}
      />
    </div>
  );
};

export const PaperAirplaneSVG = ({
  className,
  mainColor = "#E6E6E6",
  health = 100,
}: {
  className?: string;
  mainColor?: string;
  health?: number;
}) => {
  const safeHealth = Math.max(0, Math.min(health ?? 100, 100));
  const integrity = safeHealth / 100;

  const jitter = safeHealth < 55 ? (55 - safeHealth) / 6 : 0;

  const uid = React.useId();
  const filterId = `crumpleFilter-${uid}`;

  const light = mainColor;
  const mid = "#CBCBCB";
  const dark = "#B5B5B5";

  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Paper airplane"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={safeHealth < 55 ? 0.75 : 0}
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={jitter * 2} />
        </filter>
      </defs>

      <g
        filter={`url(#${filterId})`}
        style={{
          filter: `grayscale(${Math.round(100 - safeHealth)}%)`,
          opacity: 0.65 + integrity * 0.35,
        }}
      >
        <path
          d="M 69.73 745.51 L 68.17 745.88 C59.88,747.79 58.33,748.15 58.05,747.71 C57.99,747.61 57.99,747.46 58.00,747.29 C58.00,747.24 58.00,747.19 58.00,747.14 C58.00,746.67 60.81,745.35 64.25,744.20 C67.69,743.06 91.88,734.85 118.00,725.96 C144.12,717.07 168.65,708.76 172.50,707.50 C179.55,705.18 188.15,702.26 286.00,668.98 C315.42,658.98 341.98,649.98 345.00,649.00 C348.02,648.01 374.58,639.03 404.00,629.03 C433.42,619.04 463.35,608.89 470.50,606.49 C477.65,604.09 504.20,595.08 529.50,586.48 C554.80,577.89 581.35,568.88 588.50,566.47 C595.65,564.06 616.12,557.12 634.00,551.05 C651.88,544.97 666.62,540.00 666.76,540.00 C666.91,540.00 666.91,556.52 666.76,576.70 L 666.50 613.41 L 614.00 625.05 C540.50,641.34 458.76,659.43 381.50,676.48 C345.20,684.50 309.65,692.39 302.50,694.02 C295.35,695.64 269.92,701.28 246.00,706.54 C156.67,726.19 80.16,743.11 69.73,745.51 Z"
          fill={dark}
        />

        <path
          d="M 146.00 686.05 C70.98,733.18 58.00,741.21 58.00,740.52 C58.00,739.86 68.04,731.97 108.52,700.84 C128.86,685.19 154.27,665.64 165.00,657.39 C175.73,649.14 197.32,632.54 213.00,620.50 C228.68,608.47 246.23,594.95 252.00,590.46 C257.77,585.97 319.20,538.74 388.50,485.49 C457.80,432.24 525.97,379.82 540.00,369.01 C600.28,322.54 611.55,314.03 612.46,314.32 C612.98,314.50 615.80,321.13 618.72,329.07 C635.28,374.10 636.33,376.93 635.38,377.98 C635.26,378.12 635.10,378.23 634.93,378.39 C634.14,379.11 618.88,388.84 601.00,400.00 C583.12,411.16 566.25,421.75 563.50,423.52 C558.04,427.04 467.83,483.75 427.00,509.33 C412.98,518.12 387.10,534.39 369.50,545.50 C351.90,556.60 327.60,571.90 315.50,579.49 C303.40,587.09 283.83,599.39 272.00,606.83 C260.17,614.27 245.10,623.71 238.50,627.81 C231.90,631.91 224.25,636.73 221.50,638.52 C218.75,640.31 184.77,661.70 146.00,686.05 Z"
          fill={mid}
        />

        <path
          d="M 146.00 686.05 C184.77,661.70 218.75,640.31 221.50,638.52 C224.25,636.73 231.90,631.91 238.50,627.81 C245.10,623.71 260.17,614.27 272.00,606.83 C283.83,599.39 303.40,587.09 315.50,579.49 C327.60,571.90 351.90,556.60 369.50,545.50 C387.10,534.39 412.98,518.12 427.00,509.33 C467.83,483.75 558.04,427.04 563.50,423.52 C566.25,421.75 583.12,411.16 601.00,400.00 C618.88,388.84 634.14,379.11 634.93,378.39 C635.10,378.23 635.26,378.12 635.38,377.98 C636.33,376.93 635.28,374.10 618.72,329.07 C615.80,321.13 612.98,314.50 612.46,314.32 C611.55,314.03 600.28,322.54 540.00,369.01 C525.97,379.82 457.80,432.24 388.50,485.49 C319.20,538.74 257.77,585.97 252.00,590.46 C246.23,594.95 228.68,608.47 213.00,620.50 C197.32,632.54 175.73,649.14 165.00,657.39 C154.27,665.64 128.86,685.19 108.52,700.84 C68.04,731.97 58.00,739.86 58.00,740.52 C58.00,741.21 70.98,733.18 146.00,686.05 ZM 44.00 750.18 C44.00,749.74 50.76,740.17 59.03,728.93 C67.29,717.70 76.67,704.90 79.86,700.50 C83.06,696.10 110.12,659.20 140.00,618.50 C189.15,551.57 242.74,478.54 352.43,329.00 C373.21,300.67 391.22,276.45 392.45,275.18 L 394.69 272.85 L 422.10 277.88 C471.07,286.86 498.95,291.98 529.50,297.61 C546.00,300.65 571.32,305.29 585.76,307.91 C600.20,310.54 612.25,312.92 612.54,313.21 C612.80,313.47 614.14,316.82 617.26,325.17 C620.28,333.06 621.62,336.57 621.09,335.51 C635.28,374.10 636.33,376.93 635.38,377.98 C635.10,378.23 634.93,378.39 634.93,378.39 L 722.37 323.86 L 732.94 328.30 C798.24,355.79 829.85,369.12 890.00,394.50 C928.78,410.86 964.52,425.89 969.42,427.89 C974.33,429.90 978.51,432.04 978.72,432.66 C978.94,433.32 974.79,435.26 968.80,437.29 C963.13,439.22 931.28,450.03 898.00,461.32 C785.42,499.49 727.59,519.12 702.50,527.66 C688.75,532.34 675.25,536.92 672.50,537.84 L 667.50 539.50 L 666.50 613.41 L 614.00 625.05 C540.50,641.34 458.76,659.43 381.50,676.48 C345.20,684.50 309.65,692.39 302.50,694.02 C295.35,695.64 269.92,701.28 246.00,706.54 C156.67,726.19 80.16,743.11 69.73,745.51 L 44.00 750.18 Z"
          fill={light}
        />
      </g>
    </svg>
  );
};

export const CrumpledBallSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#E0E0E0" stroke="#3A215D" strokeWidth="4" />
    <path d="M30 40C30 40 40 30 50 40C60 50 70 40 70 40" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 70C40 70 50 60 60 70" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 55C20 55 35 50 40 60" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
    <path d="M60 30C60 30 75 35 80 50" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 65L35 75M75 65L65 75M50 20L50 35" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
