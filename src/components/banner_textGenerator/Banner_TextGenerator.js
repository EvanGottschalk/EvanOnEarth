//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './banner_textgenerator.css';









//--------------------------------------------------------------------------------------------------
//# Variables

const delay_gap = 300;
// let mobile = window.innerWidth <= 600;

const protocol = window.location.protocol; // Example: https:
const hostname = window.location.hostname; // Example: google.com
const port = window.location.port; // Example: :3000
let root_URL = protocol + '//' + hostname;
if (port) {
  root_URL += ':' + port;
};
const page_pathname = window.location.href.split(root_URL)[1];
console.log('page_pathname', page_pathname);
const URL_conditions = {'/': {'subtitle': 'Write the perfect copy with customizable lengths',
                              'title_URL': root_URL + page_pathname + '/textgenerator',
                              'padding': "0% 0% 0% 0%",
                              'target': '_self',
                              'rel': ''},
                        '/tools': {'subtitle': 'Write the perfect copy with customizable lengths',
                                   'title_URL': root_URL + page_pathname + '/textgenerator',
                                   'padding': "0% 0% 0% 0%",
                                   'target': '_self',
                                   'rel': ''},
                        '/tools/textgenerator': {'subtitle': 'Write the perfect copy with customizable lengths',
                                                  'title_URL': 'https://twitter.com/EvanOnEarth_eth',
                                                  'padding': "0% 0% 0% 0%",
                                                  'target': '_blank',
                                                  'rel': 'noreferrer'}};

//AppStart
const Banner_TextTenerator = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const totalImages = 106; // Update this to the number of images you have










//--------------------------------------------------------------------------------------------------
//# Functions

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Generate a random number between 1 and the total number of images
    const randomNumber = Math.floor(Math.random() * totalImages) + 1;

    // Dynamically import the image based on the random number
    import(`../../image/banners/textgenerator/${randomNumber}.png`)
      .then((image) => setBannerImage(image.default))
      .catch((err) => console.error("Error loading banner image:", err));
  }, []);

  function mouseover(event) {
    const element_ID = event.target.id;
    const title_container = document.getElementById("banner_textGeneratorTitleContainer");
    if (element_ID === "banner_textGeneratorImage") {
      title_container.style.opacity = '0';
      updateBannerTitle('default');
    } else if (element_ID === "banner_textGeneratorTitleContainer") {
      title_container.style.opacity = '1';
      updateBannerTitle('inverted');
    };
  };
  
  function mouseleave(event) {
    const element_ID = event.target.id;
    if (element_ID === "banner_textGeneratorImage") {
      document.getElementById("banner_textGeneratorTitleContainer").style.opacity = '1';
    } else if (element_ID === "banner_textGeneratorImageTitleContainer") {
      document.getElementById("banner_textGeneratorTitleContainer").style.opacity = '1';
      updateBannerTitle('default');
    };
  };

  function handleClick(event) {
    console.log(document.getElementById("banner_textGeneratorTitleContainer").style.opacity);
    if (document.getElementById("banner_textGeneratorTitleContainer").style.opacity < 1) {
      document.getElementById("banner_textGeneratorTitleContainer").style.opacity = 1;
    } else {
      document.getElementById("banner_textGeneratorTitleContainer").style.opacity = 0;
    };
  };

  async function updateBannerTitle(state) {
    const title_container = document.getElementById("banner_textGeneratorTitleContainer");
    if (state === 'default') {
      title_container.style.borderColor = '#ffffff';
      title_container.style.backgroundColor = '#000000';
      title_container.style.borderWidth = '3px';
      document.getElementById('textGeneratorSubtitle').style.color = '#848484';
      document.getElementById('textGeneratorTitle').style.color = '#ffffff';
    } else if (state === 'inverted') {
      title_container.style.borderColor = '#000000';
      title_container.style.backgroundColor = '#ffffff';
      title_container.style.borderWidth = '4px';
      document.getElementById('textGeneratorSubtitle').style.color = '#9925ff';
      document.getElementById('textGeneratorTitle').style.color = '#000000';
    };
  };

  if (!bannerImage) return null; // Return null until the image is loaded




//--------------------------------------------------------------------------------------------------
//# HTML
  return (
    <div className='banner_textGeneratorContainer'>
      <div className='banner_textgenerator'>
        <a className='banner_textGeneratorTitleContainer' data-aos="fade-in" data-aos-delay={delay_gap * 1} id='banner_textGeneratorTitleContainer' alt='@EvanOnEarth_`eth' href={URL_conditions[page_pathname]['title_URL']} rel={URL_conditions[page_pathname]['rel']} target={URL_conditions[page_pathname]['target']} onMouseOver={mouseover} onMouseLeave={mouseleave}>
          <span className='banner_textGeneratorTitle' id="textGeneratorTitle" data-aos-delay={2 * delay_gap} data-aos="zoom-in">AI Text Generator</span>
          <span className='banner_textGeneratorSubTitle' id="textGeneratorSubtitle" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">{URL_conditions[page_pathname]['subtitle']}</span>
        </a>
        <img data-aos="zoom-out" src={bannerImage} alt='AI Text Generator' id='banner_textGeneratorImage' className='banner_textgenerator' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={handleClick}/>
      </div>
    </div>
  );
};

export default Banner_TextTenerator;