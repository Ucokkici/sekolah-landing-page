// ✅ PERBAIKAN: Pisahkan import nilai dan import tipe
import { motion, useInView, AnimatePresence } from "framer-motion"; // Import untuk NILAI (fungsi)
import type { Variants } from "framer-motion"; // Import untuk TIPE
import { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, MapPin, Award, BookOpen } from "lucide-react";
import "./FacilitiesSection.scss";
import pertiImg from "../assets/perti.png";
import tanjungImg from "../assets/tanjung.png";
import triRatnaImg from "../assets/tri ratna.png";
import tomangRayaImg from "../assets/tomang raya.png";
import fatahilahImg from "../assets/fatahilah.png";
import santoLeoImg from "../assets/santo leo.png";
import stradaIIImg from "../assets/strada 2.png";
import rahmaniImg from "../assets/rahmani.png";
import putraMandiriImg from "../assets/putra mandiri.png";
import yadika2Img from "../assets/yadika 2.png";
import smkn17Img from "../assets/smk17.png";

// Interface disederhanakan, hanya menyisakan properti yang dibutuhkan
interface Facility {
  id: number;
  name: string;
  expertise: string[];
  tuk: string[];
  image: string;
  address: string;
}

const FacilitiesSection = () => {
  const [selectedImage, setSelectedImage] = useState<Facility | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Data fasilitas ditambah menjadi 13
  const facilities: Facility[] = [
    {
      id: 1,
      name: "SMK Islam Perti",
      image: pertiImg,
      address: "Jl. Tawakal Raya No.99, RT 8/RW.16, Tomang, Jakarta Barat",
      expertise: [
        "Akuntansi dan Keuangan Lembaga",
        "Otomatisasi dan Tata Kelola Perkantoran",
      ],
      tuk: ["TUK AKL", "TUK OTKP"],
    },
    {
      id: 2,
      name: "SMK Islam Fatahilah",
      image:
        fatahilahImg,
      address: "Jl. Keutamaan No.89, RT 8/RW.1, Krukut, Jakarta Barat",
      expertise: [
        "Akuntansi dan Keuangan Lembaga",
        "Otomatisasi dan Tata Kelola Perkantoran",
      ],
      tuk: ["TUK AKL", "TUK OTKP"],
    },
    {
      id: 3,
      name: "SMK Kristen Rahmani",
      image:
        rahmaniImg,
      address: "Jl. Tamansari VIII No.83A, Maphar, Tamansari, Jakarta Barat",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 4,
      name: "SMK Santo Leo",
      image:
        santoLeoImg,
      address:
        "Jl. Raya Mangga Besar No.43, RT.1/RW.3, Mangga Besar, Jakarta Barat",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 5,
      name: "SMK Strada II",
      image:
        stradaIIImg,
      address: "Jalan Mangga Besar IX No. 2D, Tangki, Tamansari, Jakarta Barat",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 6,
      name: "SMK Tri Ratna",
      image:
        triRatnaImg,
      address: "Jl. Taib Raya No.35, RT.9/RW.7, Krukur, Jakarta Barat",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 7,
      name: "SMK Tomang Raya",
      image:
        tomangRayaImg,
      address: "Jl. Kemuning No.14A, RT.5/RW.1, Jaitpulo, Jakarta Barat",
      expertise: ["Otomatisasi dan Tata Kelola Perkantoran"],
      tuk: ["TUK OTKP"],
    },
    {
      id: 8,
      name: "SMK Tanjung",
      image:
        tanjungImg,
      address:
        "JL. DR. NURDIN 4 NO 1, Grogol, Kec. Grogol Petamburan, Kota Jakarta Barat Prov. D.K.I. Jakarta",
      expertise: ["Rekayasa Perangkat Lunak"],
      tuk: ["TUK RPL"],
    },
    {
      id: 9,
      name: "SMK Putra Mandiri",
      image:
        putraMandiriImg,
      address:
        "Jl. Asia Baru Kepa Duri No 60 RT 08/04, Duri Kepa, Kec. Kebon Jeruk, Kota Jakarta Barat, D.K.I. Jakarta",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 10,
      name: "SMK Yadika 2",
      image:
        yadika2Img,
      address:
        "Jl. Manggis III No.5, RT.7/RW.4, Tj. Duren Sel., Kec. Grogol Petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470",
      expertise: [
        "Akuntansi dan Keuangan Lembaga",
        "Otomatisasi dan Tata Kelola Perkantoran",
      ],
      tuk: ["TUK AKL", "TUK OTKP"],
    },
    {
      id: 11,
      name: "SKBN 24",
      image:
        tomangRayaImg,
      address:
        "Rawa Kepa XIII No. 1, Tomang, Kec. Grogol Petamburan, Kota Jakarta Barat, D.K.I. Jakarta",
      expertise: ["Bisnis Daring dan Pemasaran"],
      tuk: ["TUK BDP"],
    },
    {
      id: 12,
      name: "SKBN 05",
      image:
        tomangRayaImg,
      address:
        "Jl. Latumenten I RT.04/05 No.76, Jelambar, Kec. Grogol Petamburan, Kota Jakarta Barat, D.K.I. Jakarta",
      expertise: ["Bisnis Daring dan Pemasaran"],
      tuk: ["TUK BDP"],
    },
    {
      id: 13,
      name: "SMK NEGERI 17",
      image:
        smkn17Img,
      address: "Jl. G. Süpi Palmerah, Jakarta Barat",
      expertise: [
       "Akuntansi dan Keuangan Lembaga",
       "Otomatisasi dan Tata Kelola Perkantoran",
       "Rekayasa Perangkat Lunak",
       "Bisnis Daring dan Pemasaran"
      ],
      tuk: ["TUK BDP", "TUK OTKP", "TUK RPL", "TUK AKL" ],
    },
  ];

  const openImage = (facility: Facility, index: number) => {
    setSelectedImage(facility);
    setImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    let newIndex;
    if (direction === "prev") {
      newIndex = imageIndex === 0 ? facilities.length - 1 : imageIndex - 1;
    } else {
      newIndex = imageIndex === facilities.length - 1 ? 0 : imageIndex + 1;
    }

    setImageIndex(newIndex);
    setSelectedImage(facilities[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "Escape") closeImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, imageIndex]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const modalContentVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <section id="fasilitas" className="facilities" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2>
            Sekolah <span className="highlight"> Jejaring </span>
          </h2>
          <p>Dukungan infrastruktur modern untuk pembelajaran yang optimal diwujudkan melalui 13 sekolah jejaring yang dilengkapi dengan fasilitas lengkap dan Tempat Uji Kompetensi (TUK) untuk keahlian AKL, OTKP, RPL, dan BDP, memastikan siswa siap menghadapi dunia kerja.</p>
        </motion.div>

        <motion.div
          className="facilities__gallery"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              className="facility-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openImage(facility, index)}
            >
              <div className="facility-card__image">
                <img src={facility.image} alt={facility.name} />
                <div className="facility-card__overlay">
                  <ZoomIn size={24} />
                </div>
              </div>
              <div className="facility-card__name">
                <h3>{facility.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal"
            onClick={closeImage}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="image-modal__content"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeImage}>
                <X size={24} />
              </button>

              <button
                className="nav-button prev-button"
                onClick={() => navigateImage("prev")}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="nav-button next-button"
                onClick={() => navigateImage("next")}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="image-container">
                <img src={selectedImage.image} alt={selectedImage.name} />
              </div>

              {/* Bagian detail diperbarui untuk menampilkan expertise dan TUK */}
              <div className="facility-details">
                <div className="facility-header">
                  <h3>{selectedImage.name}</h3>
                  <div className="image-counter">
                    {imageIndex + 1} / {facilities.length}
                  </div>
                </div>

                <div className="facility-info">
                  <div className="info-item">
                    <MapPin size={18} />
                    <span>{selectedImage.address}</span>
                  </div>
                </div>

                {/* Menampilkan expertise */}
                {selectedImage.expertise && selectedImage.expertise.length > 0 && (
                  <div className="facility-section">
                    <div className="section-title">
                      <BookOpen size={18} />
                      <span>Keahlian</span>
                    </div>
                    <div className="tag-container">
                      {selectedImage.expertise.map((item, index) => (
                        <span key={index} className="tag expertise-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Menampilkan TUK */}
                {selectedImage.tuk && selectedImage.tuk.length > 0 && (
                  <div className="facility-section">
                    <div className="section-title">
                      <Award size={18} />
                      <span>TUK</span>
                    </div>
                    <div className="tag-container">
                      {selectedImage.tuk.map((item, index) => (
                        <span key={index} className="tag tuk-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FacilitiesSection;