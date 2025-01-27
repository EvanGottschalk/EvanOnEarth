import React from 'react'; 

import home_banner from '../../image/banner-home.png'

import './banner.css'

const Banner = () => {
  

  return (
    <div className='banner'>
      <div className='bannerContainer'>
        <img data-aos="fade-left" src={home_banner} alt='' className='bannerImage' />
      </div>
    </div>
  )
}

export default Banner