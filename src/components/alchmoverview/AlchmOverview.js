//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";

import alchmoverview_image from '../../image/avataroverview-image.PNG'
import alchmoverview_video from '../../image/avataroverview-video.mp4'
import alchm_logo_image from '../../image/alchm-logo.png'

import './alchmoverview.css'











//--------------------------------------------------------------------------------------------------
//# Variables

const delay_gap = 300;
let reverse_interval;
let mobile = window.innerWidth <= 600;
let contentLoaded = true;
let playing_forward = false;

//AppStart
const AlchmOverview = () => {











//--------------------------------------------------------------------------------------------------
//# Functions

  // Reset AOS timings after animation finishes so that mouseover animations are responsive
  useEffect(() => {
    Aos.init({ duration: 2000 });
    setTimeout(() => {
      const video_element = document.getElementById("alchmOverviewVideo");
      // video_element.style.transform = 'scale(1.0)';
      const helper_text = document.getElementById('alchmOverviewHelperText');
      video_element.addEventListener('mouseenter', () => {
        helper_text.style.transition = 'opacity 1.5s ease-in-out';
        helper_text.style.opacity = "0";
        // helper_text.style.transform = 'scale(1.0)';
      });
      video_element.addEventListener('mouseleave', () => {
        helper_text.style.transition = 'opacity 1.5s ease-in-out';  
        helper_text.style.opacity = "1";
        // helper_text.style.transform = 'scale(1.0)';
      });
      
      const site_link_element = document.getElementById('alchmSiteLink');
      const signup_link_element = document.getElementById('alchmSignupLink');
      const logo_element = document.getElementById('alchmLogoImage');
      const link_elements = [site_link_element, signup_link_element, logo_element];
      for (let index in link_elements) {
        // console.log('link_element', link_element);
        link_elements[index].addEventListener('mouseenter', () => {
          link_elements[index].style.transform = 'scale(1.15)';
          link_elements[index].style.transition = 'transform 1.3s ease-in-out';
        });
        link_elements[index].addEventListener('mousedown', () => {
          link_elements[index].style.transform = 'scale(1.25)';
          link_elements[index].style.transition = 'transform 0.05s ease-in-out';
        });
        link_elements[index].addEventListener('mouseleave', () => {
          link_elements[index].style.transform = 'scale(1.0)';
          link_elements[index].style.transition = 'transform 1.3s ease-in-out';
        });
      };
    }, 1000);  // Match to AOS duration
  }, []);
  
  
  function mouseOver(event) {
    const element_ID = event.target.id;
    if (element_ID === 'alchmOverviewVideo') {
      if (!mobile) {
        playForward();
      };
    } else if (element_ID === 'alchmLogoImage') {
      event.target.style.transform = 'scale(1.15)';
    };
  };
  
  function mouseLeave(event) {
    const element_ID = event.target.id;
    if (element_ID === 'alchmOverviewVideo') {
      playReverse();
    } else if (element_ID === 'alchmLogoImage') {
      event.target.style.transform = 'scale(1.0)';
    };
  };

  function handleClick(event) {
    console.log('onClick:', document.getElementById(event.target.id));
    const element_ID = event.target.id;
    if (element_ID === 'alchmOverviewVideo') {
      if (mobile) {
        if (!playing_forward) {
          playForward();
        } else {
          playReverse();
        };
      };
    } else if (element_ID === 'alchmLogoImage') {
      window.location.href = 'https://evanon.earth/alchm';
    };
  };


  function playForward () {
    const video_element = document.getElementById("alchmOverviewVideo");
    clearInterval(reverse_interval);
    video_element.play()
      .catch(error => {
        if (error.name === "NotAllowedError") {
          video_element.controls = true;
        }
      }
    );
    
    video_element.controls = false;
    playing_forward = true;

    // Hide helper text during playback
    document.getElementById('alchmOverviewHelperText').style.opacity = "0%";
  }
    

  function playReverse() {
    const video_element = document.getElementById("alchmOverviewVideo");
    video_element.pause();
    clearInterval(reverse_interval);  // Prevent multiple intervals

    reverse_interval = setInterval(() => {
      if (video_element.currentTime <= 0) {
        clearInterval(reverse_interval); // Stop when video reaches the beginning
      } else {
        video_element.currentTime -= 0.025;  // Reverse playback
      };
    }, 25);

    video_element.controls = false;
    playing_forward = false;

    // Reveal helper text after playback
    document.getElementById('alchmOverviewHelperText').style.opacity = "100%";
  };





//--------------------------------------------------------------------------------------------------
//# HTML

  return (
    <div className='alchmoverview'>
      {!contentLoaded ? (
        <p>Loading...</p>
      ) : (
      <div className="alchmoverview">
      <div className='alchmOverviewLeftContainer'>
        <div className='alchmOverviewImageContainer' id='alchmOverviewImageContainer'>
          {/* <img data-aos="flip-left" src={alchmoverview_image} alt='' className='alchmOverviewImage' id='alchmOverviewImage' onMouseOver={mouseOver} onMouseLeave={mouseLeave}/> */}
          <video data-aos="flip-left" src={alchmoverview_video} alt='' className='alchmOverviewVideo' id='alchmOverviewVideo' onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={handleClick}
          muted playsInline poster={alchmoverview_image} preload="metadata"/>
        </div>
        <div className='alchmOverviewHelperTextContainer'> 
          {mobile ? (
            <div className='alchmOverviewHelperText' id='alchmOverviewHelperText' data-aos="fade-left" data-aos-delay={6 * delay_gap}>↑ Tap to Discover</div>
          ) : (
            <div className='alchmOverviewHelperText' id='alchmOverviewHelperText' data-aos="fade-right" data-aos-delay={6 * delay_gap}>↑ Mouse over to Discover</div>
          )}
        </div>
      </div>
      <div className='alchmOverviewRightContainer'>
        <div className='alchmOverviewTextContainer'>
          <div className="alchmOverviewTitleContainer rowContainer">
            <div className='alchmOverviewTitle columnContainer' data-aos="fade-down" data-aos-delay={1 * delay_gap}>
              <div>Upcoming Project:</div>
              <div><u>Alchm</u></div>
            </div>
            <img className='alchmOverviewLogoImage' id='alchmLogoImage' src={alchm_logo_image} data-aos="fade-down-left" data-aos-delay={2 * delay_gap} onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={handleClick} alt="Alchm"/>
          </div>
          <div  className='alchmOverviewText' data-aos="fade-down" data-aos-delay={3 * delay_gap}>
            • Get insights on your goals, your diet, your relationships, and more using AI.
          </div>
          <div  className='alchmOverviewText' data-aos="fade-down-left" data-aos-delay={4 * delay_gap}>
            • Forge your unique Alchm Avatar.
          </div>
          <div  className='alchmOverviewText' data-aos="fade-left" data-aos-delay={5 * delay_gap}>
            • Explore the stars and earn rewards.
          </div>
          <div  className='alchmOverviewText' data-aos="fade-up-left" data-aos-delay={5 * delay_gap}>
            • Own your data. Own your identity.
          </div>
          <div  className='alchmOverviewText' data-aos="fade-up" data-aos-delay={5 * delay_gap}>
            • Discover your Alchemy.
          </div>
          <a className='alchmOverviewLink' id='alchmSiteLink' data-aos="fade-left" data-aos-delay={6 * delay_gap} href="https://evanon.earth/alchm" target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
            Explore Alchm ->
          </a>
          <a className='alchmOverviewLink' id='alchmSignupLink' data-aos="fade-left" data-aos-delay={7 * delay_gap} href="https://evanon.earth/alchmsignup" target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
            Get Early Access ->
          </a>
        </div>
      </div>
      </div>
    )}
    </div>
  )
}

export default AlchmOverview
