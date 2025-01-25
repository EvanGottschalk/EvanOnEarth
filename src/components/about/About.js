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


  function mouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.10)';
  }
  
  function mouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }









//--------------------------------------------------------------------------------------------------
//# HTML

  return (
    <div className='about' id="anchorElement">
      <div className='aboutLeftContainer'>
        <div className='aboutTextContainer'>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay={1 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Co-founder at NoFun Labs
          </div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay={2 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            style={{color: '#00ef63'}}>
            - Blockchain Onboarding Solutions -
          </div>
          <div className='aboutText aboutSubtitle' data-aos="fade-right" data-aos-delay={3 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Start onboarding your next 1,000,000 users now:
          </div>
          <div data-aos="flip-down" data-aos-delay={4 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" className='aboutLinkContainer'>
            <a href='https://evanon.earth/nofunlabs' target="_blank" rel="noreferrer" className='aboutText aboutLink' id='nofunlabsLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay={5 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Web3 Engineer at Aphid AI
          </div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay={6 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            style={{color: '#00F8BE'}}>
            - Decentralized Bot Marketplace -
          </div>
          <div className='aboutText aboutSubtitle' data-aos="fade-right" data-aos-delay={7 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Exponentiate your efficiency with bots that work for you:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={8 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            <a className='aboutText aboutLink' id='aphidLink' href='https://evanon.earth/aphid' target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay={9 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Blockchain Architect at EcoVerse
          </div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay={10 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            style={{color: '#ea49ff'}}>
            - NFT Ticketing & Events Platform -
          </div>
          <div className='aboutText aboutSubtitle' data-aos="fade-right" data-aos-delay={11 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Engage attendees with free event photos, minted as NFTs:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            <a className='aboutText aboutLink' id='ecoverseLink' href='https://evanon.earth/ecoverse' target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Advisor at BrightID
          </div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay={14 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            style={{color: '#ff9500'}}>
            - Decentralized Identity Protocol -
          </div>
          <div className='aboutText aboutSubtitle' data-aos="fade-right" data-aos-delay={15 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Verify your identity without sharing personal information:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={16 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            <a className='aboutText aboutLink' id='brightidLink' href='https://evanon.earth/brightid' target="_blank" rel="noreferrer" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
              Learn More ->
            </a>
          </div>
          <br></br>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay={17 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Advisor at Unitap
          </div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay={18 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            style={{color: '#31a3ff'}}>
            - Universal Token Distribution Platform -
          </div>
          <div className='aboutText aboutSubtitle' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Grow your dapp's userbase with free gas and token raffles:
          </div>
          <div className='aboutLinkContainer' data-aos="flip-down" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
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
