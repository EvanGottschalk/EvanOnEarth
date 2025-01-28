//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect } from 'react'; 

import home_banner_full from '../../image/banner-home.webp'
import home_banner_mobile from '../../image/banner-home-mobile.webp'

import './banner.css'









//--------------------------------------------------------------------------------------------------
//# Variables

const mobile = window.innerWidth <= 600;
let home_banner_image = home_banner_mobile;









//--------------------------------------------------------------------------------------------------
//# Functions

//AppStart
const Banner = () => {

  useEffect(() => {
    const banner_image_element = document.getElementById('bannerImage');
    const screen_width = window.screen.width;
    // console.log("window.screen.width: ", window.screen.width);
    // console.log("window.screen.height: ", window.screen.height);
    // console.log("window.innerWidth: ", window.innerWidth);
    // console.log("window.innerHeight: ", window.innerHeight);
    // console.log("document.documentElement.clientWidth: ", document.documentElement.clientWidth);
    if (mobile) {
      home_banner_image = home_banner_mobile;
    } else if (screen_width > 1080) {
      home_banner_image = home_banner_full;
    }
    const img = new Image();
    img.src = home_banner_image;
    img.onload = () => {
      banner_image_element.src = home_banner_image;
    };
  }, []);
  

  return (
    <div className='banner'>
      <div className='bannerContainer'>
        <img data-aos="fade-left" src={home_banner_image} alt='' className='bannerImage' />
      </div>
    </div>
  )
}

export default Banner