//--------------------------------------------------------------------------------------------------
//# Imports

import React from 'react'; 

import './footer.css'







//--------------------------------------------------------------------------------------------------
//# Variables

let screen_filled = false;

const page_origin = window.location.origin; // Example: https://evanonearth.xyz
const page_pathname = window.location.pathname; // Example: /tools
const URL_conditions = {'/tools': {'padding': "0% 0% 0% 0%"}};









//--------------------------------------------------------------------------------------------------
//# Functions

//AppStart
const Footer = () => {
  document.addEventListener("DOMContentLoaded", () => {
    if (URL_conditions[page_pathname]) {
      const footer = document.getElementById("footer");
      if (footer && !screen_filled) {
        const screen_height = document.documentElement.scrollHeight;
        console.log("screen_height", screen_height);
        footer.style.paddingTop = (screen_height - 420).toString() + 'px';
        screen_filled = true;
      };
    };
  });

  function mouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.color = '#ea49ff';
  }
  
  function mouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.color = '#929292';
  }








//--------------------------------------------------------------------------------------------------
//# HTML

  console.log("window.location", window.location);
  return (
    <div className='footer' id='footer'>
      <div className='creatorAttributionContainer'>
        <div className='creatorAttributionTextContainer footerTextContainer'>
          <div className='creatorAttributionText'>Site created by </div><a id='creatorAttributionLink' className='creatorAttributionLink' href="https://twitter.com/EvanOnEarth_eth" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>@EvanOnEarth_eth</a>
        </div>
      </div>
      <div className='footerContainer'>
        <div className='footerTextContainer'>
          <marquee>Pop quiz, hot shot! What's the first blockchain ever created? (hint: it's not Bitcoin) . . . . . . . . . . . . . . . . . . . . Did you know? Most NFT data is not stored on blockchain! . . . . . . . . . . . . . . . . . . . . Get airdrops, whitelist and early access to my next web3 project: <a style={{color: "var(--color-main)"}} href="https://evanon.earth/alchmsignup" target="_blank" rel="noreferrer">Alchm Whitelist Signup</a> . . . . . . . . . . . . . . . . . . . .  Did you know? Using Ordinals, operating systems like Windows and iOS can run on Bitcoin . . . . . . . . . . . . . . . . . . . . </marquee>
        </div>
      </div>
      
    </div>
  )
}

export default Footer