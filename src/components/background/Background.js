//--------------------------------------------------------------------------------------------------
//# Imports

import React, {useEffect} from 'react'
// import throttle from 'lodash/throttle';
// import debounce from 'lodash/debounce';

// import background_1920px from '../../image/backgrounds/background_1920px_WEBP.webp'
// import background_1400px from '../../image/backgrounds/background_1400px_WEBP.webp'
// import background_1080px from '../../image/backgrounds/background_1080px_WEBP.webp'
// import background_640px from '../../image/backgrounds/background_640px_WEBP.webp'

import './background.css'









//--------------------------------------------------------------------------------------------------
//# Variables

// let background_image = background_640px;

//AppStart
const Background = () => {









//--------------------------------------------------------------------------------------------------
//# Functions

  // useEffect(() => {
  //   const background_image_element = document.getElementById('backgroundImage');
  //   const screen_width = window.screen.width;
  //   // console.log("window.screen.width: ", window.screen.width);
  //   // console.log("window.screen.height: ", window.screen.height);
  //   // console.log("window.innerWidth: ", window.innerWidth);
  //   // console.log("window.innerHeight: ", window.innerHeight);
  //   // console.log("document.documentElement.clientWidth: ", document.documentElement.clientWidth);
  //   if (screen_width > 1400) {
  //     background_image = background_1920px;
  //   } else if (screen_width > 1080) {
  //     background_image = background_1400px;
  //   } else if (screen_width > 640) {
  //     background_image = background_1080px;
  //   } else {
  //     background_image = background_640px;
  //     console.log('small screen');
  //   }
  //   const img = new Image();
  //   img.src = background_image;
  //   img.onload = () => {
  //     // background_image_element.style.transition = "background 0.5s ease-in-out";
  //     // body.style.backgroundImage = `url('../../image/backgrounds/${imageToLoad}')`;
  //     background_image_element.src = background_image;
  //   };
  //   // background1 = `../../image/backgrounds/${imageToLoad}`;
  //   // console.log(background1);
  //   // document.getElementById('backgroundImage').src = `url(${background1})`;
  // }, []);


  // // lodash parallax effect
  // const handleScroll = throttle(() => {
  //   const scrollPosition = window.scrollY;
  //   const parallax = document.querySelector('.background');
    
  //   if (parallax) {
  //       parallax.style.transform = `translateY(${scrollPosition * 0.52}px)`;
  //   }
  // }, 1); // Approximately 60 FPS
  // window.addEventListener('scroll', handleScroll);







//--------------------------------------------------------------------------------------------------
//# HTML

  return (
    <div className='background'>
      {/* <img src={background_image} alt='' className='backgroundImage' id='backgroundImage' /> */}
    </div>
  )
}

export default Background