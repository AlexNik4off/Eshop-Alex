import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  //   console.log(slideLength);

  // эти константы лучше большими буквам писать и вынести их из компонента, они не меняются
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  // я бы назвал эти функции более говоряще - goToNextSlide и goToPrevSlide - чтобы было понятно, что это действие
  const nextSlide = () => {
    // лучше текущий слайд брать из параметра коллбека, который ты можешь передать в setState
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  // зачем этот эффект? при маунте компонента у тебя и так будет 0
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  //   const auto = () => {
  //     slideInterval = setInterval(nextSlide, intervalTime);
  //   };

  useEffect(() => {
    // slideInterval можно определить прямо тут, кроме этой функции, он больше нигде не нужен
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            {/* в таких случаях обычно заводят класс active и добавляют его при совпадении индексов */}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
