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
    import(`../../image/banners/imagegenerator/${randomNumber}.png`)
      .then((image) => setBannerImage(image.default))
      .catch((err) => console.error("Error loading banner image:", err));
  }, []);

  function mouseover(event) {
    const element_ID = event.target.id;
    const title_container = document.getElementById("banner_imageGeneratorTitleContainer");
    if (element_ID === "banner_imageGeneratorImage") {
      title_container.style.opacity = '0';
      updateBannerTitle('default');
    } else if (element_ID === "banner_imageGeneratorTitleContainer") {
      title_container.style.opacity = '1';
      updateBannerTitle('inverted');
    };
  };

  function mouseleave(event) {
    const element_ID = event.target.id;
    if (element_ID === "banner_imageGeneratorImage") {
      document.getElementById("banner_imageGeneratorTitleContainer").style.opacity = '1';
    } else if (element_ID === "banner_imageGeneratorImageTitleContainer") {
      document.getElementById("banner_imageGeneratorTitleContainer").style.opacity = '1';
      updateBannerTitle('default');
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

  async function updateBannerTitle(state) {
    const title_container = document.getElementById("banner_imageGeneratorTitleContainer");
    if (state === 'default') {
      title_container.style.borderColor = '#ffffff';
      title_container.style.backgroundColor = '#000000';
      title_container.style.borderWidth = '3px';
      document.getElementById('imageGeneratorSubtitle').style.color = '#848484';
      document.getElementById('imageGeneratorTitle').style.color = '#ffffff';
    } else if (state === 'inverted') {
      title_container.style.borderColor = '#000000';
      title_container.style.backgroundColor = '#ffffff';
      title_container.style.borderWidth = '4px';
      document.getElementById('imageGeneratorSubtitle').style.color = '#9925ff';
      document.getElementById('imageGeneratorTitle').style.color = '#000000';
    };
  };

  if (!bannerImage) return null; // Return null until the image is loaded




//--------------------------------------------------------------------------------------------------
//# HTML
  return (
    <div className='banner_imageGeneratorContainer'>
      <div className='banner_imagegenerator'>
      <a className='banner_imageGeneratorTitleContainer' data-aos="fade-in" data-aos-delay={delay_gap * 1} id='banner_imageGeneratorTitleContainer' alt='@EvanOnEarth_`eth' href='https://twitter.com/EvanOnEarth_eth' onMouseOver={mouseover} onMouseLeave={mouseleave}>
          <span className='banner_imageGeneratorTitle' id="imageGeneratorTitle" data-aos-delay={2 * delay_gap} data-aos="zoom-in">AI Image Generator</span>
          <span className='banner_imageGeneratorSubTitle' id="imageGeneratorSubtitle" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">@EvanOnEarth_eth</span>
        </a>
        <img data-aos="zoom-out" src={bannerImage} alt='AI Image Generator' id='banner_imageGeneratorImage' className='banner_imagegenerator' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={handleClick}/>
      </div>
    </div>
  );
};

export default Banner_ImageGenerator;