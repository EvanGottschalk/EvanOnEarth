import React from 'react'; 


import './footer.css'

let screen_filled = false;

const Footer = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("footer"); // Select the footer element
    if (footer && !screen_filled) {
      const footerBottomY = document.documentElement.scrollHeight / 3;  // Get the bottom position
      console.log("Footer bottom y-coordinate:", footerBottomY);
      footer.style.paddingTop = footerBottomY.toString() + 'px';
      screen_filled = true;
    } else {
      console.error("Footer element not found!");
    }
  });

  function mouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.color = '#ea49ff';
  }
  
  function mouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.color = '#929292';
  }
  

  return (
    <div className='footer' id='footer'>
      <div className='creatorAttributionContainer'>
        <div className='creatorAttributionTextContainer footerTextContainer'>
          <div className='creatorAttributionText'>Site created by </div><a id='creatorAttributionLink' className='creatorAttributionLink' href="https://twitter.com/EvanOnEarth_eth" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>@EvanOnEarth_eth</a>
        </div>
      </div>
      <div className='footerContainer'>
        <div className='footerTextContainer'>
          <marquee>Pop quiz, hot shot! What's the first blockchain ever created? (hint: it's not bitcoin) . . . . . . . . . . . . . . . . . . . . Did you know? Over 99% of NFT data is not stored on a blockchain! . . . . . . . . . . . . . . . . . . . .  Pop quiz, hot shot! What's the first country to recognize $BTC as legal tender? (hint: it's not El Salvador) . . . . . . . . . . . . . . . . . . . . Did you know? Ordinals allow for the Bitcoin blockchain to run ANY code, including AI models like ChatGPT, OS's like Windows 11, iOS, PS5 and beyond . . . . . . . . . . . . . . . . . . . . Pop quiz, hot shot! What's the first blockchain ever created? (hint: it's not bitcoin) . . . . . . . . . . . . . . . . . . . . Did you know? Over 99% of NFT data is not stored on a blockchain! . . . . . . . . . . . . . . . . . . . .  Pop quiz, hot shot! What's the first country to recognize $BTC as a national currency? (hint: it's not El Salvador) . . . . . . . . . . . . . . . . . . . . Did you know? Ordinals allow for the Bitcoin blockchain to run ANY code, including AI models like ChatGPT, OS's like Windows 11, iOS, PS5 and beyond . . . . . . . . . . . . . . . . . . . .</marquee>
        </div>
      </div>
      
    </div>
  )
}

export default Footer