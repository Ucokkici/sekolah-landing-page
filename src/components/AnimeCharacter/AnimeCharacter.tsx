import { motion } from "framer-motion";
import "./AnimeCharacter.scss";

// Import gambar dari folder assets
import animeCharacterImage from "../../assets/Gemini_Generated_Image_3vcg6l3vcg6l3vcg-removebg-preview.png";

const AnimeCharacter = () => {
  return (
    <motion.div
      className="anime-character"
      // --- ANIMASI SLIDE MASUK DARI KANAN ---
      initial={{ opacity: 0, x: 300 }} // Mulai dari tak terlihat & 300px di kanan
      animate={{ opacity: 1, x: 0 }} // Bergerak ke posisi normal & muncul
      transition={{
        duration: 2.5, // Durasi 2.5 detik (pelan-pelan)
        ease: "easeOut", // Animasi melambat di akhir
        delay: 0.8, // Muncul setelah 0.8 detik
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Klik aku!"
    >
      <img
        src={animeCharacterImage}
        alt="Anime Character"
        className="anime-character__img"
      />
    </motion.div>
  );
};

export default AnimeCharacter;
