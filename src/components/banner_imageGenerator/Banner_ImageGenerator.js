//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './banner_imagegenerator.css';









//--------------------------------------------------------------------------------------------------
//# Variables

const delay_gap = 300;
// let mobile = window.innerWidth <= 600;

//AppStart
const Banner_ImageGenerator = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const totalImages = 112; // Update this to the number of images you have










//--------------------------------------------------------------------------------------------------
//# Functions

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Generate a random number between 1 and the total number of images
    const randomNumber = Math.floor(Math.random() * totalImages) + 1;

    // Dynamically import the image based on the random number
    import(`../../image/banners/${randomNumber}.png`)
      .then((image) => setBannerImage(image.default))
      .catch((err) => console.error("Error loading banner image:", err));
  }, []);

  function mouseover(event) {
    const element_ID = event.target.id;
    if (element_ID === "banner_imageGeneratorImage") {
      document.getElementById("banner_imageGeneratorTitleContainer").style.opacity = '0';
    } else if (element_ID === "banner_imageGeneratorImageTitleContainer") {
      document.getElementById("banner_imageGeneratorTitleContainer").style.opacity = '1'; 
    };
  };
  
  function mouseleave(event) {
    const element_ID = event.target.id;
    if (element_ID === "banner_imageGeneratorImage") {
      document.getElementById("banner_imageGeneratorTitleContainer").style.opacity = '1';
    } else if (element_ID === "banner_imageGeneratorImageTitleContainer") {
      document.getElementById("banner_imageGeneratorTitleContainer").style.opacity = '1'; 
    };
  };

  function handleClick(event) {
    console.log(document.getElementById("banner_imageGeneratorTitleContainer").style.opacity);
    if (document.getElementById("banner_imageGeneratorTitleContainer").style.opacity < 1) {
      document.getElementById("banner_imageGeneratorTitleContainer").style.opacity = 1;
    } else {
      document.getElementById("banner_imageGeneratorTitleContainer").style.opacity = 0;
    };
  };

  if (!bannerImage) return null; // Return null until the image is loaded




//--------------------------------------------------------------------------------------------------
//# HTML
  return (
    <div className='banner_imageGeneratorContainer'>
      <div className='banner_imagegenerator'>
        <a className='banner_imageGeneratorTitleContainer' data-aos="fade-in" data-aos-delay={delay_gap * 1} id='banner_imageGeneratorTitleContainer' alt='@EvanOnEarth_`eth' href='https://twitter.com/EvanOnEarth_eth' onMouseOver={mouseover} onMouseLeave={mouseleave}>
          <span className='banner_imageGeneratorTitle' id="banner_imageGeneratorTitleContainer" data-aos-delay={2 * delay_gap} data-aos="zoom-in">AI Image Generator</span>
          <span className='banner_imageGeneratorSubTitle' id="banner_imageGeneratorTitleContainer" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">@EvanOnEarth_eth</span>
        </a>
        <img data-aos="zoom-out" src={bannerImage} alt='Image Generator' id='banner_imageGeneratorImage' className='banner_imagegenerator' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={handleClick}/>
      </div>
    </div>
  );
};

export default Banner_ImageGenerator;