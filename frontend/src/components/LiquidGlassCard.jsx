import { motion } from "framer-motion";

const intensityMap = {
    none: {
        blur: "",
        shadow: "shadow-none",
        glow: "opacity-0",
    },
    xs: {
        blur: "backdrop-blur-sm",
        shadow: "shadow-sm",
        glow: "opacity-20",
    },
    sm: {
        blur: "backdrop-blur-md",
        shadow: "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)]",
        glow: "opacity-30",
    },
    md: {
        blur: "backdrop-blur-xl",
        shadow: "shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]",
        glow: "opacity-50",
    },
};

const LiquidGlassCard = ({
    children,
    glowIntensity = "sm",
    shadowIntensity = "sm",
    blurIntensity = "sm",
    borderRadius = "12px",
    className = "",
    draggable = false,
}) => {
    const glow = intensityMap[glowIntensity];
    const blur = intensityMap[blurIntensity];
    const shadow = intensityMap[shadowIntensity];

    return (
        <motion.div
            drag={draggable}
            whileHover={{ scale: 1.02 }}
            className={`
        relative
        bg-white/20
        ${blur.blur}
        ${shadow.shadow}
        border border-[rgba(255,255,255,0.1)]
        p-10
        overflow-hidden
        ${className}
      `}
            style={{ borderRadius }}
        >
            {/* Glow layer */}
            <div
                className={`
          absolute -inset-1
          bg-gradient-to-r from-[#747def]/40 via-pink-400/30 to-purple-400/40
          blur-xl
          ${glow.glow}
          pointer-events-none
        `}
            />

            {/* Liquid highlight */}
            <div
                className="
          absolute inset-0
          bg-gradient-to-br from-white/60 via-white/10 to-transparent
          opacity-70
          pointer-events-none
        "
            />

            {/* Content */}
            <div className="relative z-30">
                {children}
            </div>
        </motion.div>
    );
};

export default LiquidGlassCard;
