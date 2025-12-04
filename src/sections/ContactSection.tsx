import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import "./ContactSection.scss";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const validationSchema = yup.object({
    name: yup.string().required("Nama harus diisi"),
    email: yup
      .string()
      .email("Email tidak valid")
      .required("Email harus diisi"),
    phone: yup.string().required("Nomor telepon harus diisi"),
    message: yup.string().required("Pesan harus diisi"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      alert("Pesan Anda telah terkirim!");
      resetForm();
    },
  });

  // Variabel animasi untuk container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variabel animasi untuk item
  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  // Variabel animasi untuk floating balls
  const floatingBallVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingBallVariants2: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <section id="kontak" className="contact" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2>Hubungi Kami</h2>
          <p>Informasi lebih lanjut atau pendaftaran siswa baru</p>
        </motion.div>

        <motion.div
          className="contact__content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="contact__form"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            {/* Floating Balls untuk Form Card */}
            <motion.div
              className="floating-ball floating-ball-1"
              variants={floatingBallVariants}
              animate="animate"
            />
            <motion.div
              className="floating-ball floating-ball-2"
              variants={floatingBallVariants2}
              animate="animate"
            />

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.name && formik.errors.name ? "error" : ""
                  }
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error-message">{formik.errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error-message">{formik.errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Nomor Telepon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.phone && formik.errors.phone ? "error" : ""
                  }
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="error-message">{formik.errors.phone}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.message && formik.errors.message
                      ? "error"
                      : ""
                  }
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <div className="error-message">{formik.errors.message}</div>
                )}
              </div>

              <button type="submit" className="btn-submit">
                <FaPaperPlane /> <span>Kirim Pesan</span>
              </button>
            </form>
          </motion.div>

          <motion.div
            className="contact__info"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            {/* Floating Balls untuk Info Card */}
            <motion.div
              className="floating-ball floating-ball-3"
              variants={floatingBallVariants}
              animate="animate"
              style={{ animationDelay: '1s' }}
            />
            <motion.div
              className="floating-ball floating-ball-4"
              variants={floatingBallVariants2}
              animate="animate"
              style={{ animationDelay: '0.5s' }}
            />

            <h3>Informasi Kontak</h3>
            <p>
              Hubungi kami untuk informasi lebih lanjut tentang pendaftaran dan
              program pendidikan.
            </p>

            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-text">
                <h4>Alamat</h4>
                <p>
                  Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-text">
                <h4>Telepon</h4>
                <p>(021) 1234-5678</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>info@smkcool.sch.id</p>
              </div>
            </div>

            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5212609228336!2d106.81656231476838!3d-6.194741495515438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1627999999999!5m2!1sen!2sid"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;