import { motion } from "framer-motion";
import "./LoadingScreen.scss";

const LoadingScreen = () => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background particles */}
      <div className="loading-screen__particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="loading-content">
        {/* Main Loader */}
        <div className="loader-container">
          {/* Outer rotating ring */}
          <motion.div
            className="loader-ring loader-ring--outer"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width="140" height="140">
              <circle
                cx="70"
                cy="70"
                r="60"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10 5"
              />
            </svg>
          </motion.div>

          {/* Middle pulsing ring */}
          <motion.div
            className="loader-ring loader-ring--middle"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="pulsing-circle" />
          </motion.div>

          {/* Inner morphing shape */}
          <motion.div
            className="loader-ring loader-ring--inner"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="morphing-shape"
              animate={{
                borderRadius: [
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                  "70% 30% 30% 70% / 70% 70% 30% 30%",
                  "50% 50% 50% 50% / 50% 50% 50% 50%",
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                ],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Orbiting dots */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="orbiting-dot"
              animate={{
                rotate: [angle, angle + 360],
                x: [
                  Math.cos((angle * Math.PI) / 180) * 65 - 6,
                  Math.cos(((angle + 360) * Math.PI) / 180) * 65 - 6,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 65 - 6,
                  Math.sin(((angle + 360) * Math.PI) / 180) * 65 - 6,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Text content */}
        <motion.div
          className="loading-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h2 className="loading-title">LSP SMKN 17 Jakarta</motion.h2>

          <motion.div
            className="loading-dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="loading-dot"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          <motion.p
            className="loading-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1] }}
            transition={{ delay: 0.8, duration: 1.5 }}
          >
            Lembaga Sertifikasi Profesi Berlisensi BNSP
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="progress-bar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="progress-bar__fill"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="corner-decoration corner-decoration--top"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="corner-decoration corner-decoration--bottom"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
