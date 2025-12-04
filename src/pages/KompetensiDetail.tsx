import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Award,
  BookOpen,
  Target,
  Code,
  Calculator,
  Users,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import { programs, kompetensiData } from "../data/KompetensiData";
import type { IconMap } from "../types";
import "./KompetensiDetail.scss";

// Map icon strings to actual Lucide components
const iconMap: IconMap = {
  Code,
  Calculator,
  Users,
  ShoppingBag,
  Award,
  BookOpen,
  Target,
};

// Variants for page animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const categoryVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

const KompetensiDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const program = programs.find((p) => p.id === parseInt(id || "0"));
  const kompetensi = kompetensiData[id || ""];

  // State for accordion
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  if (!program || !kompetensi) {
    return (
      <motion.div
        className="error-container"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
        <h2>Program tidak ditemukan</h2>
        <Link to="/program" className="back-link">
          <ArrowLeft size={16} />
          Kembali ke Program
        </Link>
      </motion.div>
    );
  }

  const ProgramIcon = iconMap[program.icon];

  return (
    <motion.div
      className="kompetensi-detail-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Hero Header Section */}
      <motion.section
        className="hero-header"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="hero-background">
          <img src={program.image} alt={program.title} />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <Link to="/program" className="back-button">
            <ArrowLeft size={20} />
            Kembali
          </Link>
          <motion.div
            className="program-info-hero"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="program-icon-hero"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {ProgramIcon && <ProgramIcon size={48} />}
            </motion.div>
            <h1>{program.title}</h1>
            <p>{program.description}</p>
          </motion.div>
        </div>
      </motion.section>

      <div className="container content-body">
        {/* Kompetensi Section with Accordion */}
        <motion.section
          className="kompetensi-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2>Unit Kompetensi Sesuai SKKNI</h2>
          <div className="accordion">
            {kompetensi.kategori.map((kategori, index) => {
              const CategoryIcon = iconMap[kategori.icon];
              const isActive = activeCategory === index;

              return (
                <motion.div
                  key={index}
                  className="accordion-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <motion.button
                    className="accordion-header"
                    onClick={() => toggleCategory(index)}
                    whileHover={{ backgroundColor: "rgba(78, 115, 223, 0.05)" }}
                  >
                    <div className="header-content">
                      {CategoryIcon && <CategoryIcon size={24} />}
                      <h3>{kategori.nama}</h3>
                    </div>
                    <motion.div
                      className="chevron-icon"
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="accordion-body"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={categoryVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="kompetensi-list">
                          {kategori.items.map((item, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              className="kompetensi-item"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * itemIndex }}
                              whileHover={{ x: 10, backgroundColor: "#f8f9fa" }}
                            >
                              <div className="kompetensi-id">{item.id}</div>
                              <div className="kompetensi-nama">{item.nama}</div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="skills-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2>Skills yang Terkait</h2>
          <div className="skills-list">
            {program.skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.05 * index + 0.8,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(78, 115, 223, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle size={16} />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default KompetensiDetail;