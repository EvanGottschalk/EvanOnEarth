//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect } from 'react'
import Aos from "aos";
import "aos/dist/aos.css";

import './about.css'

import about_image from '../../image/about-image.png'









//--------------------------------------------------------------------------------------------------
//# Variables

const delay_gap = 100;
const mobile = window.innerWidth <= 600;

let element_color_dict = {};









//AppStart
const About = () => {

//--------------------------------------------------------------------------------------------------
//# Functions

  useEffect(() => {
    Aos.init({ duration: 2000 });
    setTimeout(() => {
      const link_elements = document.querySelectorAll('.aboutLinkContainer');
      link_elements.forEach((link_element) => {
        link_element.addEventListener('mouseenter', () => {
          link_element.style.transform = 'scale(1.1)';
          link_element.style.transition = 'transform 1.3s ease-in-out';
        });
        link_element.addEventListener('mousedown', () => {
          link_element.style.transform = 'scale(1.2)';
          link_element.style.transition = 'transform 0.05s ease-in-out';
        });
        link_element.addEventListener('mouseleave', () => {
          link_element.style.transform = 'scale(1.0)';
          link_element.style.transition = 'transform 1.3s ease-in-out';
        });
      });
    }, 2000);  // Match to AOS duration
  }, []);


  async function pause(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  async function mouseOver(event) {
    let element = document.getElementById(event.target.id);
    if (element.id === 'aboutImage' || element.id.includes('Link')) {
      element.style.transform = 'scale(1.10)';
    };
    if (element.id !== 'aboutImage' && !mobile) {
      const random_color = getRandomColor();
      element.style.backgroundColor = random_color;
      element.style.boxShadow = `0 0 6px 6px ${random_color}`;
      element_color_dict[element.id] = random_color;
    };
  };
  
  async function mouseLeave(event) {
    let element = document.getElementById(event.target.id);
    if (element.id === 'aboutImage' || element.id.includes('Link')) {
      element.style.transform = 'scale(1.0)';
    };
    if (element.id !== 'aboutImage' && !mobile) {
      const latest_color = element_color_dict[element.id];
      await pause(750);
      if (element_color_dict[element.id] === latest_color) {
        element.style.backgroundColor = `rgba(0, 0, 0, 0.0)`;
        element.style.boxShadow = `0 0 0px 0px rgba(0, 0, 0, 0.0)`;
        delete element_color_dict[element.id];
      };
    };
  };

  function getRandomColor() {
    // let random_color = Math.floor(Math.random() * 16777215).toString(16);
    // random_color = '#' + random_color.padStart(6, "0");

    const red = Math.floor(Math.random() * 256); 
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const random_color = `rgba(${red}, ${green}, ${blue}, 0.5)`

    console.log('About.js >>> RAN getRandomColor() -> ', random_color);
    return(random_color);
  };







//--------------------------------------------------------------------------------------------------
//# HTML

  return (
    <div className='about' id="anchorElement_About">
      <div className='aboutLeftContainer'>
        <div className='aboutTextContainer'>
          <div className='aboutText aboutTitle' id='title_NoFunLabs' onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={1 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Co-founder at NoFun Labs
          </div>
          <div className='aboutText aboutTagline' id="subtitle_NoFunLabs" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={2 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About"
            style={{color: '#00ef63'}}>
            - Blockchain Onboarding & Education -
          </div>
          <div className='aboutText aboutSubtitle' id="description_NoFunLabs" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={3 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Gamify your platform with engaging characters & puzzles:
          </div>
          <div data-aos="flip-down" data-aos-delay={4 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About" className='aboutLinkContainer'>
            <a href='https://evanon.earth/nofunlabs' target="_blank" rel="noreferrer" className='aboutText aboutLink' id='nofunlabsLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' id="title_Aphid" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={5 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Web3 Engineer at Aphid AI
          </div>
          <div className='aboutText aboutTagline' id="subtitle_Aphid" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={6 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About"
            style={{color: '#00dccd'}}>
            - Decentralized Bot Marketplace -
          </div>
          <div className='aboutText aboutSubtitle' id="description_Aphid" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={7 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Get back your free time with bots that work for you:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={8 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            <a className='aboutText aboutLink' id='aphidLink' href='https://evanon.earth/aphid' target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' id="title_EcoVerse" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={9 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Blockchain Architect at EcoVerse
          </div>
          <div className='aboutText aboutTagline' id="subtitle_EcoVerse" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={10 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About"
            style={{color: '#ea49ff'}}>
            - NFT Event & Rewards Platform -
          </div>
          <div className='aboutText aboutSubtitle' id="description_EcoVerse" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={11 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Engage attendees with Minted Moments, raffles & competitions:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            <a className='aboutText aboutLink' id='ecoverseLink' href='https://evanon.earth/ecoverse' target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' id="title_Ammalgam" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Content Creator at Ammalgam
          </div>
          <div className='aboutText aboutTagline' id="subtitle_Ammalgam" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={14 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About"
            style={{color: '#00ffb3'}}>
            - Ultimate Defi Suite -
          </div>
          <div className='aboutText aboutSubtitle' id="description_Ammalgam" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={15 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Maximize your capital efficiency with DeFi automations:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={16 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            <a className='aboutText aboutLink' id='ammalgamLink' href='https://evanon.earth/ammalgam' target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' id="title_BrightID" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={17 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Advisor at BrightID
          </div>
          <div className='aboutText aboutTagline' id="subtitle_BrightID" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={18 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About"
            style={{color: '#ff9500'}}>
            - Decentralized Identity Protocol -
          </div>
          <div className='aboutText aboutSubtitle' id="description_BrightID" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Verify identity without KYC using anonymous social graphs:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            <a className='aboutText aboutLink' id='brightidLink' href='https://evanon.earth/brightid' target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' id="title_Unitap" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={21 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Advisor at Unitap
          </div>
          <div className='aboutText aboutTagline' id="subtitle_Unitap" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About"
            style={{color: '#31a3ff'}}>
            - Universal Token Distribution Platform -
          </div>
          <div className='aboutText aboutSubtitle' id="description_Unitap" onMouseOver={mouseOver} onMouseLeave={mouseLeave} data-aos="fade-right" data-aos-delay={23 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            Grow your dapp's userbase with free gas & token raffles:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={24 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_About">
            <a className='aboutText aboutLink' id='unitapLink' data-aos="flip-down" href='https://evanon.earth/unitap' target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
        </div>
      </div>
      <div className='aboutRightContainer'>
        <div className='aboutRightTop'>
          <div className='aboutImageContainer'>
            <img className='aboutImage' id='aboutImage' data-aos="flip-right" src={about_image} alt=''  onMouseOver={mouseOver} onMouseLeave={mouseLeave} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
