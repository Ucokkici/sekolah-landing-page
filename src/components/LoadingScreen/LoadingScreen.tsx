
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
      <div className="loading-content">
        <motion.div
          className="loader"
          animate={{
            rotate: 360,
            borderRadius: ["50%", "20%", "50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          SMK Cool
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
