// ✅ PERBAIKAN: Pisahkan import nilai dan import tipe
import { motion, useInView, AnimatePresence } from "framer-motion"; // Import untuk NILAI (fungsi)
import type { Variants } from "framer-motion"; // Import untuk TIPE
import { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import "./FacilitiesSection.scss";

interface Facility {
  id: number;
  name: string;
  image: string;
}

const FacilitiesSection = () => {
  const [selectedImage, setSelectedImage] = useState<Facility | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const facilities: Facility[] = [
    {
      id: 1,
      name: "Laboratorium Komputer",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      name: "Perpustakaan Modern",
      image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 3,
      name: "Bengkel Teknik",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 4,
      name: "Lapangan Olahraga",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 5,
      name: "Studio Multimedia",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 6,
      name: "Ruang Serbaguna",
      image:
        "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
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
            Fasilitas <span className="highlight"> Sekolah </span>
          </h2>
          <p>Dukungan infrastruktur modern untuk pembelajaran yang optimal</p>
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

              <div className="image-info">
                <h3>{selectedImage.name}</h3>
                <div className="image-counter">
                  {imageIndex + 1} / {facilities.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FacilitiesSection;
