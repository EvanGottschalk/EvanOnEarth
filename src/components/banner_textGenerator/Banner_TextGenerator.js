//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './banner_textgenerator.css';









//--------------------------------------------------------------------------------------------------
//# Variables

const delay_gap = 300;
const mobile = window.innerWidth <= 600;

const page_origin = window.location.origin; // Example: https://evanonearth.xyz
const page_pathname = window.location.pathname; // Example: /tools
const URL_conditions = {'/': {'subtitle': 'Quickly generate the perfect copy',
                              'title_URL': page_origin + '/tools/textgenerator',
                              'padding': "0% 0% 20% 0%",
                              'target': '_self',
                              'rel': ''},
                        '/tools': {'subtitle': 'Quickly generate the perfect copy',
                                   'title_URL': page_origin + '/tools/textgenerator',
                                   'padding': "0% 0% 0% 0%",
                                   'target': '_self',
                                   'rel': ''},
                        '/tools/textgenerator': {'subtitle': 'Quickly generate the perfect copy',
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
    AOS.init({ duration: 2000 });

    // Generate a random number between 1 and the total number of images
    const random_number = Math.floor(Math.random() * totalImages) + 1;
    
    // Dynamically import the image based on the random number
    if (mobile) {
      import(`../../image/banners/textgenerator/1280x160/${random_number}.png`)
        .then((image) => setBannerImage(image.default))
        .catch((err) => console.error("Error loading banner image:", err));
    } else {
      import(`../../image/banners/textgenerator/3072x384/${random_number}.png`)
        .then((image) => setBannerImage(image.default))
        .catch((err) => console.error("Error loading banner image:", err));
    };    
  }, []);

  function mouseover(event) {
    const element_ID = event.target.id;
    const title_container = document.getElementById("textGeneratorTitleContainer");
    if (element_ID === "banner_textGeneratorImage") {
      title_container.style.opacity = '0';
      updateBannerTitle('default');
    } else if (element_ID === "textGeneratorTitleContainer" || element_ID === "textGeneratorTitle") {
      title_container.style.opacity = '1';
      updateBannerTitle('inverted');
    };
  };
  
  function mouseleave(event) {
    const element_ID = event.target.id;
    if (element_ID === "banner_textGeneratorImage") {
      document.getElementById("textGeneratorTitleContainer").style.opacity = '1';
    } else if (element_ID === "banner_textGeneratorImageTitleContainer" || element_ID === "textGeneratorTitle") {
      document.getElementById("textGeneratorTitleContainer").style.opacity = '1';
      updateBannerTitle('default');
    };
  };

  function handleClick(event) {
    console.log(document.getElementById("textGeneratorTitleContainer").style.opacity);
    if (document.getElementById("textGeneratorTitleContainer").style.opacity < 1) {
      document.getElementById("textGeneratorTitleContainer").style.opacity = 1;
    } else {
      document.getElementById("textGeneratorTitleContainer").style.opacity = 0;
    };
  };

  async function updateBannerTitle(state) {
    const title_container = document.getElementById("textGeneratorTitleContainer");
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
    <div className='banner_textGeneratorContainer' style={{padding: URL_conditions[page_pathname]['padding']}}>
      <div className='banner_textgenerator'>
        <a className='banner_textGeneratorTitleContainer' id='textGeneratorTitleContainer' data-aos="fade-in" data-aos-delay={delay_gap * 1} alt='@EvanOnEarth_`eth' href={URL_conditions[page_pathname]['title_URL']} rel={URL_conditions[page_pathname]['rel']} target={URL_conditions[page_pathname]['target']} onMouseOver={mouseover} onMouseLeave={mouseleave}>
          <span className='banner_textGeneratorTitle' id="textGeneratorTitle" data-aos-delay={2 * delay_gap} data-aos="zoom-in">AI Text Generator</span>
          <span className='banner_textGeneratorSubTitle' id="textGeneratorSubtitle" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">{URL_conditions[page_pathname]['subtitle']}</span>
        </a>
        <img data-aos="zoom-out" src={bannerImage} alt='AI Text Generator' id='banner_textGeneratorImage' className='banner_textGeneratorImage' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={handleClick}/>
      </div>
    </div>
  );
};

export default Banner_TextTenerator;