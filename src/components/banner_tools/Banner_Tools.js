//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './banner_tools.css';









//--------------------------------------------------------------------------------------------------
//# Variables

const delay_gap = 300;
let mobile = window.innerWidth <= 600;

const page_origin = window.location.origin; // Example: https://evanonearth.xyz
const page_pathname = window.location.pathname; // Example: /tools
let URL_conditions = {'/': {'subtitle': 'Write the perfect copy with customizable lengths',
                              'title_URL': page_origin + '/tools',
                              'padding': "4% 0% 0% 0%",
                              'target': '_self',
                              'rel': ''},
                        '/tools': {'subtitle': 'Write the perfect copy with customizable lengths',
                                   'title_URL': 'https://twitter.com/EvanOnEarth_eth',
                                   'padding': "0% 0% 0% 0%",
                                   'target': '_self',
                                   'rel': ''},
                        // '/tools/tools': {'subtitle': 'Write the perfect copy with customizable lengths',
                        //                           'title_URL': 'https://twitter.com/EvanOnEarth_eth',
                        //                           'padding': "0% 0% 0% 0%",
                        //                           'target': '_blank',
                        //                           'rel': 'noreferrer'}
                                                };

// Mobile-specific CSS
if (mobile) {
  URL_conditions['/']['padding'] = "15% 0% 0% 0%";
};

//AppStart
const Banner_Tools = () => {
  // const [bannerImage, setBannerImage] = useState(null);
  // const totalImages = 106; // Update this to the number of images you have










//--------------------------------------------------------------------------------------------------
//# Functions

  useEffect(() => {
    AOS.init({ duration: 2000 });

  //   // Generate a random number between 1 and the total number of images
  //   const randomNumber = Math.floor(Math.random() * totalImages) + 1;

  //   // Dynamically import the image based on the random number
  //   import(`../../image/banners/tools/${randomNumber}.png`)
  //     .then((image) => setBannerImage(image.default))
  //     .catch((err) => console.error("Error loading banner image:", err));
  }, []);

  function mouseover(event) {
    const element_ID = event.target.id;
    if (element_ID === "toolsTitle") {
      event.target.style.transform = 'scale(1.15)';
    };
  };
  
  function mouseleave(event) {
    const element_ID = event.target.id;
    if (element_ID === "toolsTitle") {
      event.target.style.transform = 'scale(1.0)';
    };
  };

  function handleClick(event) {
    console.log('\nBanner_Tools >>> RUNNING handleClick()');
    // event.target.style.transform = 'scale(1.25)';
  };

  async function updateBannerTitle(state) {
    const title_container = document.getElementById("banner_toolsTitleContainer");
    if (state === 'default') {
      title_container.style.borderColor = '#ffffff';
      title_container.style.backgroundColor = '#000000';
      title_container.style.borderWidth = '3px';
      document.getElementById('toolsSubtitle').style.color = '#848484';
      document.getElementById('toolsTitle').style.color = '#ffffff';
    } else if (state === 'inverted') {
      title_container.style.borderColor = '#000000';
      title_container.style.backgroundColor = '#ffffff';
      title_container.style.borderWidth = '4px';
      document.getElementById('toolsSubtitle').style.color = '#9925ff';
      document.getElementById('toolsTitle').style.color = '#000000';
    };
  };

  // if (!bannerImage) return null; // Return null until the image is loaded





  


//--------------------------------------------------------------------------------------------------
//# HTML
  return (
    <div className='banner_toolsContainer' style={{padding: URL_conditions[page_pathname]['padding']}}>
      <div className='banner_tools'>
        <a className='banner_toolsTitleContainer' data-aos="fade-in" data-aos-delay={delay_gap * 0} id='banner_toolsTitleContainer' alt='@EvanOnEarth_`eth' href={URL_conditions[page_pathname]['title_URL']} rel={URL_conditions[page_pathname]['rel']} target={URL_conditions[page_pathname]['target']}>
          <span className='banner_toolsTitle' id="toolsTitle" data-aos-delay={0 * delay_gap} data-aos="zoom-in" onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={handleClick}>
            AI Tools
          </span>
          {/* <span className='banner_toolsSubTitle' id="toolsSubtitle" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">{URL_conditions[page_pathname]['subtitle']}</span> */}
        </a>
        {/* <img data-aos="zoom-out" src={bannerImage} alt='AI Text Generator' id='banner_toolsImage' className='banner_tools' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={handleClick}/> */}
      </div>
    </div>
  );
};

export default Banner_Tools;