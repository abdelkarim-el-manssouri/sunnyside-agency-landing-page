import { useState } from "react";
import Container from "../components/Container";
import { menuLinks } from "../data/data";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <HeroSection />
      <MainSection />
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
                onClick={() => setOpen(false)}
                key="bgMenu"
                variants={bgMenuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 bg-gradient-to-b from-black/80 via-neutral-white to-primary-yellow/80"
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
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
                        className="my-4 py-2 last-of-type:bg-primary-yellow last-of-type:px-16 last-of-type:py-7 last-of-type:rounded-full last-of-type:font-Fraunces"
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

const MainSection = () => {
  return (
    <>
      <Container>
        <main>
          <div className="grid [grid-template-areas:'egg''transform''cup''stand'] sm:[grid-template-areas:'transform_egg''cup_stand'] text-center sm:text-start auto-cols-fr auto-rows-fr">
            <div className="[grid-area:egg] bg-[url('/images/mobile/image-transform.jpg')] sm:bg-[url('/images/desktop/image-transform.jpg')] bg-cover bg-no-repeat bg-center" />
            <div className="[grid-area:transform] grid place-content-center max-w-full py-40 sm:py-60">
              <div className="mx-auto">
                <h2 className="text-mainSectionTiltles w-[15ch] font-fw-bold leading-[1.2]">
                  Transform your brand
                </h2>
                <p className="text-mainSectionContent my-10 w-[45ch] text-neutral-dark-grayish-blue">
                  We are a full-service creative agency specializing in helping
                  brands grow fast. Engage your clients through compelling
                  visuals that do most of the marketing for you.
                </p>
                <button className="uppercase font-fw-semi-bold text-mainSectionButton relative before:absolute before:-left-[5%] before:bottom-1 before:w-[110%] before:h-2.5 before:bg-primary-yellow/50 before:rounded-full before:-z-10 hover:before:bg-primary-yellow before:transition before:ease-in">
                  Learn more
                </button>
              </div>
            </div>
            <div className="[grid-area:cup] bg-[url('/images/mobile/image-stand-out.jpg')] sm:bg-[url('/images/desktop/image-stand-out.jpg')] bg-cover bg-no-repeat bg-center" />
            <div className="[grid-area:stand] grid place-content-center max-w-full">
              <div className="mx-auto">
                <h2 className="text-mainSectionTiltles w-[15ch] font-fw-bold leading-[1.2]">
                  Stand out to the right audience
                </h2>
                <p className="text-mainSectionContent my-10 w-[45ch] text-neutral-dark-grayish-blue">
                  Using a collaborative formula of designers, researchers,
                  photographers, videographers, and copywriters, we’ll build and
                  extend your brand in digital places.
                </p>
                <button className="uppercase font-fw-semi-bold text-mainSectionButton relative before:absolute before:-left-[5%] before:bottom-1 before:w-[110%] before:h-2.5 before:bg-primary-red/50 before:rounded-full before:-z-10 hover:before:bg-primary-red before:transition before:ease-in">
                  Learn more
                </button>
              </div>
            </div>
          </div>
          <div className="grid [grid-template-areas:'cherry''orange'] sm:[grid-template-areas:'cherry_orange'] auto-cols-fr auto-rows-fr">
            <div className="[grid-area:cherry] grid grid-rows-[1fr_auto] min-h-[48rem] h-[55rem] bg-[url('/images/mobile/image-graphic-design.jpg')] sm:bg-[url('/images/desktop/image-graphic-design.jpg')] bg-cover bg-no-repeat">
              <div />
              <div className="text-center min-h-40 px-10 sm:px-48 text-primary-dark-desaturated-cyan">
                <h3 className="text-mainSectionImagesTitle font-fw-bold capitalize mb-8">
                  Graphic design
                </h3>
                <p className="mb-16 sm:mb-28 text-mainSectionImagesDesc text-pretty">
                  Great design makes you memorable. We deliver artwork that
                  underscores your brand message and captures potential clients’
                  attention.
                </p>
              </div>
            </div>
            <div className="[grid-area:orange] grid grid-rows-[1fr_auto] min-h-[48rem] bg-[url('/images/mobile/image-photography.jpg')] sm:bg-[url('/images/desktop/image-photography.jpg')] bg-cover bg-no-repeat">
              <div />
              <div className="text-center  min-h-40 px-10 sm:px-48 text-primary-dark-blue">
                <h3 className="text-mainSectionImagesTitle font-fw-bold capitalize mb-8">
                  Photography
                </h3>
                <p className="mb-16 sm:mb-28 text-mainSectionImagesDesc text-pretty">
                  Increase your credibility by getting the most stunning,
                  high-quality photos that improve your business image.
                </p>
              </div>
            </div>
          </div>
        </main>
      </Container>
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
