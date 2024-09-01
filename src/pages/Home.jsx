import { useState } from "react";
import Container from "../components/Container";
import { menuLinks } from "../data/data";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <HeroSection />
    </>
  );
};

export default Home;

const HeroSection = () => {
  const moveDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="h-dvh text-neutral-white [background-image:url('/images/mobile/image-header.jpg')] sm:bg-[url('/images/desktop/image-header.jpg')] bg-cover bg-no-repeat bg-center">
        <Container>
          <div className="flex justify-between items-center px-8 pt-10">
            <img src="/images/logo.svg" alt="sunnysied logo" />
            <button
              onClick={() => setOpen((pv) => !pv)}
              className="sm:hidden z-10"
            >
              <span className="sr-only">menu</span>
              <img src="/images/icon-hamburger.svg" alt="menu" />
            </button>
            <nav className="hidden sm:block">
              <ul className="flex items-center gap-x-10">
                {menuLinks.map((el) => {
                  return (
                    <li
                      key={el.id}
                      className="capitalize last:bg-neutral-white last:text-black last:font-Fraunces last:px-6 last:py-3 last:rounded-3xl last:hover:text-neutral-white last:hover:bg-opacity-40 transition ease-in"
                    >
                      <a href={el.link} className="text-xl">
                        {el.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                key="bgMenu"
                variants={bgMenuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 bg-gradient-to-b from-black/80 via-neutral-white to-primary-yellow/80"
              >
                <motion.div
                  key="bgMenuLinks"
                  variants={bgMenuLinksVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="bg-neutral-white w-[90%] mx-auto mt-40 z-10 relative after:absolute after:-top-10 after:right-0 after:border-[3rem] after:border-r-neutral-white after:border-l-transparent after:border-y-transparent"
                >
                  <ul className="flex flex-col justify-center items-center gap-y-4 py-10">
                    {menuLinks.map((el) => (
                      <li
                        key={el.id}
                        className="my-4 py-2  last-of-type:bg-primary-yellow last-of-type:px-16 last-of-type:py-7 last-of-type:rounded-full"
                      >
                        <a
                          className="text-neutral-dark-grayish-blue text-3xl"
                          href={el.link}
                        >
                          {el.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <h1 className="uppercase text-center font-fw-bold text-headerTitle1 sm:text-headerTitle2 tracking-widest mt-40">
            We are creatives
          </h1>
          <button
            onClick={moveDown}
            className="scrollDown | group relative mx-auto mt-56 block"
          >
            <div className="opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 absolute -top-14 left-1/2 -translate-x-1/2 translate-y-[30%] scale-[0.5] transition-[transform,opacity] w-40 bg-neutral-very-dark-grayish-blue font-fw-semi-bold py-2 rounded-3xl capitalize">
              tap to see more
            </div>
            <img src="/images/icon-arrow-down.svg" alt="" />
          </button>
        </Container>
      </div>
    </>
  );
};

const bgMenuVariants = {
  initial: {
    opacity: 0,
    filter: "blur(20px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(20px)",
    transition: {
      delay: 0.2,
      ease: "easeIn",
    },
  },
};
const bgMenuLinksVariants = {
  initial: {
    opacity: 0,
    translateY: "-200%",
  },
  animate: {
    opacity: 1,
    translateY: 0,
    transition: {
      delay: 0.4,
    },
  },
  exit: {
    opacity: 0,
    translateY: "-200%",
  },
};
