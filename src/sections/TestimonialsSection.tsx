import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./TestimonialsSection.scss";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
}

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    // Title animation
    gsap.from(title, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      role: "Alumni TKJ 2020",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      content:
        "SMK Cool memberikan saya bekal pengetahuan dan keterampilan yang sangat berguna di dunia kerja. Saya langsung diterima di perusahaan ternama setelah lulus.",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      role: "Orang Tua Siswa",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      content:
        "Saya sangat puas dengan pendidikan yang diberikan SMK Cool kepada anak saya. Guru-gurunya sangat profesional dan fasilitasnya memadai.",
    },
    {
      id: 3,
      name: "Budi Santoso",
      role: "Alumni Multimedia 2019",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      content:
        "Program magang di SMK Cool sangat membantu saya mendapatkan pengalaman kerja langsung. Sekarang saya bekerja sebagai desainer grafis di agency terkenal.",
    },
  ];

  return (
    <section id="testimoni" className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-header" ref={titleRef}>
          <h2>Testimoni</h2>
          <p>Apa kata mereka tentang SMK Cool</p>
        </div>

        <div className="testimonials__slider">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".testimonials__pagination",
            }}
            navigation={{
              nextEl: ".testimonials__next",
              prevEl: ".testimonials__prev",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1,
              },
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  className="testimonial-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="testimonial-card__quote">
                    <FaQuoteLeft />
                  </div>
                  <p className="testimonial-card__content">
                    {testimonial.content}
                  </p>
                  <div className="testimonial-card__author">
                    <div className="author-image">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonials__controls">
            <button className="control-btn testimonials__prev">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="testimonials__pagination"></div>
            <button className="control-btn testimonials__next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;