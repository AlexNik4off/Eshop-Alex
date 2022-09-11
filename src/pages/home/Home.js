import React, { useEffect } from "react";
import Product from "../../components/product/Product";
import Slider from "../../components/slider/Slider";

const Home = () => {
  // а почему здесь url получаешь не из роутера?
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        // лишнее
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
