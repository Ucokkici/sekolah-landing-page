import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Network } from "lucide-react";
import {
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Award,
  BookOpen,
} from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 4;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      image: fatahilahImg,
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
      image: rahmaniImg,
      address: "Jl. Tamansari VIII No.83A, Maphar, Tamansari, Jakarta Barat",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 4,
      name: "SMK Santo Leo",
      image: santoLeoImg,
      address:
        "Jl. Raya Mangga Besar No.43, RT.1/RW.3, Mangga Besar, Jakarta Barat",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 5,
      name: "SMK Strada II",
      image: stradaIIImg,
      address: "Jalan Mangga Besar IX No. 2D, Tangki, Tamansari, Jakarta Barat",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 6,
      name: "SMK Tri Ratna",
      image: triRatnaImg,
      address: "Jl. Taib Raya No.35, RT.9/RW.7, Krukur, Jakarta Barat",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 7,
      name: "SMK Tomang Raya",
      image: tomangRayaImg,
      address: "Jl. Kemuning No.14A, RT.5/RW.1, Jaitpulo, Jakarta Barat",
      expertise: ["Otomatisasi dan Tata Kelola Perkantoran"],
      tuk: ["TUK OTKP"],
    },
    {
      id: 8,
      name: "SMK Tanjung",
      image: tanjungImg,
      address:
        "JL. DR. NURDIN 4 NO 1, Grogol, Kec. Grogol Petamburan, Kota Jakarta Barat Prov. D.K.I. Jakarta",
      expertise: ["Rekayasa Perangkat Lunak"],
      tuk: ["TUK RPL"],
    },
    {
      id: 9,
      name: "SMK Putra Mandiri",
      image: putraMandiriImg,
      address:
        "Jl. Asia Baru Kepa Duri No 60 RT 08/04, Duri Kepa, Kec. Kebon Jeruk, Kota Jakarta Barat, D.K.I. Jakarta",
      expertise: ["Akuntansi dan Keuangan Lembaga"],
      tuk: ["TUK AKL"],
    },
    {
      id: 10,
      name: "SMK Yadika 2",
      image: yadika2Img,
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
      image: tomangRayaImg,
      address:
        "Rawa Kepa XIII No. 1, Tomang, Kec. Grogol Petamburan, Kota Jakarta Barat, D.K.I. Jakarta",
      expertise: ["Bisnis Daring dan Pemasaran"],
      tuk: ["TUK BDP"],
    },
    {
      id: 12,
      name: "SKBN 05",
      image: tomangRayaImg,
      address:
        "Jl. Latumenten I RT.04/05 No.76, Jelambar, Kec. Grogol Petamburan, Kota Jakarta Barat, D.K.I. Jakarta",
      expertise: ["Bisnis Daring dan Pemasaran"],
      tuk: ["TUK BDP"],
    },
    {
      id: 13,
      name: "SMKN 17 Jakarta",
      image: smkn17Img,
      address: "Jl. G. Süpi Palmerah, Jakarta Barat",
      expertise: [
        "Akuntansi dan Keuangan Lembaga",
        "Otomatisasi dan Tata Kelola Perkantoran",
        "Rekayasa Perangkat Lunak",
        "Bisnis Daring dan Pemasaran",
      ],
      tuk: ["TUK BDP", "TUK OTKP", "TUK RPL", "TUK AKL"],
    },
  ];

  const totalPages = Math.ceil(facilities.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFacilities = facilities.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const openImage = (facility: Facility, index: number) => {
    const originalIndex = indexOfFirstItem + index;
    setSelectedImage(facility);
    setImageIndex(originalIndex);
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

    const newPage = Math.floor(newIndex / itemsPerPage) + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

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
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 60, opacity: 0, scale: 0.85, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  return (
    <section id="fasilitas" className="facilities" ref={ref}>
      <div className="facilities__bg-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="facilities__container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="facilities__header"
        >
          {/* TAMBAHKAN IKON DI SINI */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="facilities__hero-icon"
          >
            <div className="icon-container">
              <Network />
            </div>
          </motion.div>

          <motion.h2
            className="facilities__title"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-black">Sekolah</span>{" "}
            <span className="facilities__title-highlight text-blue-dark">
              Jejaring
            </span>
          </motion.h2>

          <motion.p
            className="facilities__description"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Dukungan infrastruktur modern untuk pembelajaran yang optimal
            diwujudkan melalui 13 sekolah jejaring yang dilengkapi dengan
            fasilitas lengkap dan Tempat Uji Kompetensi (TUK) untuk keahlian
            AKL, OTKP, RPL, dan BDP, memastikan siswa siap menghadapi dunia
            kerja.
          </motion.p>
        </motion.div>

        <motion.div
          className="facilities__gallery"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {currentFacilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openImage(facility, index)}
              className="polaroid-card"
            >
              <div className="polaroid-card__frame">
                <div className="polaroid-card__pin"></div>

                <div className="polaroid-card__photo">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="polaroid-card__image"
                  />
                  <div className="polaroid-card__overlay">
                    <ZoomIn className="polaroid-card__zoom-icon" />
                  </div>
                </div>

                <div className="polaroid-card__caption">
                  <h3 className="polaroid-card__title">{facility.name}</h3>
                  <div className="polaroid-card__tags">
                    {facility.tuk.slice(0, 2).map((tuk, i) => (
                      <span key={i} className="tag tag--primary">
                        {tuk}
                      </span>
                    ))}
                    {facility.tuk.length > 2 && (
                      <span className="tag tag--secondary">
                        +{facility.tuk.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="polaroid-card__tape"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="facilities__pagination"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pagination__button pagination__button--prev"
          >
            <ChevronLeft size={20} />
            <span className="pagination__button-text">Sebelumnya</span>
          </motion.button>

          <div className="pagination__numbers">
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => paginate(index + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`pagination__number ${
                  currentPage === index + 1 ? "pagination__number--active" : ""
                }`}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pagination__button pagination__button--next"
          >
            <span className="pagination__button-text">Selanjutnya</span>
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
            className="modal"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="modal__content"
            >
              <motion.button
                onClick={closeImage}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="modal__close"
              >
                <X size={24} />
              </motion.button>

              <motion.button
                onClick={() => navigateImage("prev")}
                className="modal__nav modal__nav--prev"
              >
                <ChevronLeft size={28} />
              </motion.button>

              <motion.button
                onClick={() => navigateImage("next")}
                className="modal__nav modal__nav--next"
              >
                <ChevronRight size={28} />
              </motion.button>

              <div className="modal__polaroid">
                <div className="modal__frame">
                  <div className="modal__tape modal__tape--left"></div>
                  <div className="modal__tape modal__tape--right"></div>

                  <div className="modal__photo">
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.name}
                      className="modal__image"
                    />
                  </div>

                  <div className="modal__caption">
                    <div className="modal__header">
                      <h3 className="modal__title">{selectedImage.name}</h3>
                      <span className="modal__counter">
                        {imageIndex + 1} / {facilities.length}
                      </span>
                    </div>

                    <div className="modal__address">
                      <MapPin size={20} className="modal__icon" />
                      <span>{selectedImage.address}</span>
                    </div>

                    {selectedImage.expertise.length > 0 && (
                      <div className="modal__section">
                        <div className="modal__section-title">
                          <BookOpen size={20} />
                          <span>Keahlian</span>
                        </div>
                        <div className="modal__tags">
                          {selectedImage.expertise.map((item, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="modal__tag modal__tag--expertise"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedImage.tuk.length > 0 && (
                      <div className="modal__section">
                        <div className="modal__section-title">
                          <Award size={20} />
                          <span>TUK</span>
                        </div>
                        <div className="modal__tags">
                          {selectedImage.tuk.map((item, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="modal__tag modal__tag--tuk"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
