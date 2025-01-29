//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react'; 

import './banner.css'









//--------------------------------------------------------------------------------------------------
//# Variables

const mobile = window.innerWidth <= 600;









//--------------------------------------------------------------------------------------------------
//# Functions

//AppStart
const Banner = () => {
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    if (mobile) {
      import(`../../image/banner-home-mobile.webp`)
        .then((image) => setBannerImage(image.default))
        .catch((err) => console.error("Error loading banner image:", err));
    } else {
      import(`../../image/banner-home.webp`)
        .then((image) => setBannerImage(image.default))
        .catch((err) => console.error("Error loading banner image:", err));
    };    
  }, []);


  

  return (
    <div className='banner'>
      <div className='bannerContainer'>
        <img data-aos="fade-left" src={bannerImage} alt='' className='bannerImage' />
      </div>
    </div>
  )
}

export default Banner