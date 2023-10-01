import React, { useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";

import home_banner from '../../image/banner-home.png'

import './banner.css'

const Banner = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className='bannerContainer'>
      <div className='banner'>
        <img data-aos="fade-left" src={home_banner} alt='' className='banner' />
      </div>
    </div>
  )
}

export default Banner