//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useContext } from 'react';
import SmartContractContext from '../../scripts/SmartContractContext';
import Aos from "aos";
import "aos/dist/aos.css";

//import walletButton from '../../image/button_4x1.png'
//import connectWallet from '../../scripts/SmartContractOperator';

import logo from '../../image/logo.png'

import twitter_icon_black from '../../image/icons/twitter_black.png'
import twitter_icon_white from '../../image/icons/twitter_white.png'
import linkedin_icon from '../../image/icons/linkedin.png'
import instagram_icon from '../../image/icons/instagram.png'

import './navbar.css'











//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;

var mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile = true;
};

var tools_page
if (window.location.href.includes("tools")) {
  tools_page = true;
} else {
  tools_page = false;
};



//AppStart
const Navbar = () => {

let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);

useEffect(() => {
  Aos.init({ duration: 2000 });
}, []);







//--------------------------------------------------------------------------------------------------
//# Functions

function mouseover(event) {
  let element = document.getElementById(event.target.id);
  console.log('mouseover');
  element.style.transform = 'scale(1.20)';
}

function mouseleave(event) {
  let element = document.getElementById(event.target.id);
  element.style.transform = 'scale(1.0)';
}




//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='navbar' style={tools_page ? {backgroundColor: "#000000"} : {backgroundColor: "#ffffff"}}>
    {/* <div className='navbarMobile'>
      <div className='navbarCenterIcon'>
        <div className='navbarMobileTopRight '>MobileLeftTitle</div>
      </div>
    </div>
    <div className='navbarMobileButton'>
      <MobileMenu className={Mobile ? 'Mobile' : 'Mobile'} onClick={HandleMobileMenu} />
      <div className={Mobile ? 'navbarMobileContainerActive' : 'navbarMobileContainer'}>
        <div className={Mobile ? 'navbarMenu active' : 'navbarMenu'}>
          <div className='navbarMenuContainer'>
            <div className='navbarMobileTop'>
              <div className='navbarMobileTopRight menuOpen'>MobileMenuText</div>
              <div className='navbarMobileTopLeft'>
                <Close className='CloseIcon' onClick={HandleMobileMenu} />
              </div>
            </div>
            <div className='navbarMobileMain'>
              <div className='navbarCenterLink opacity7'>MobileMenuMiddleText</div>
              <div className='navbarCenterLink navbarRightButton'>MobileMenuButton</div>
            </div>
          </div>
        </div>
      </div>
    </div>*/}
    <div className='navbarContainer'>
      <div className='navbarLeft'>
        <div id="navbarLogo" className='navbarLogo'>
          <a href={window.location['origin']}>
            <img data-aos="fade-down-right" className="navbarLogoImage" id="navbarLogoImage" src={logo} alt='Home' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          </a>
        </div>
      </div>
        <div className='navbarCenter'>
          {mobile ? (
            <div/>
          ) : (
            <a className='navbarCenterButtonContainer' data-aos="fade-down-right" href={window.location['origin'] + '/tools/imagegenerator'} id="navbarCenterButton2" onMouseOver={mouseover} onMouseLeave={mouseleave}>
              <span className='navbarCenterButton' data-aos="fade-down" style={tools_page ? {color: "#ffffff"} : {color: "#000000"}} id="navbarCenterButton2" onMouseOver={mouseover} onMouseLeave={mouseleave} >AI Image Generator</span>
            </a>
          )}
          {mobile ? (
            // 1 Mobile Button
            <a className='navbarCenterButtonContainer' data-aos="fade-down" href={window.location['origin'] + '/tools'} id="navbarCenterButtonMobile" onMouseOver={mouseover} onMouseLeave={mouseleave}>
              <span className='navbarCenterButton' data-aos="fade-down" style={tools_page ? {color: "#ffffff"} : {color: "#000000"}} id="navbarCenterButtonMobile" onMouseOver={mouseover} onMouseLeave={mouseleave} >AI Tools</span>
            </a>
          ) : (
            <a className='navbarCenterButtonContainer' data-aos="fade-down" href={window.location['origin'] + '/tools/textgenerator'} id="navbarCenterButton3" onMouseOver={mouseover} onMouseLeave={mouseleave}>
              <span className='navbarCenterButton' data-aos="fade-down" style={tools_page ? {color: "#ffffff"} : {color: "#000000"}} id="navbarCenterButton3" onMouseOver={mouseover} onMouseLeave={mouseleave} >AI Text Generator</span>
            </a>
          )}
          {mobile ? (
            <div/>
          ) : (
            <a className='navbarCenterButtonContainer' data-aos="fade-down-left" href={window.location['origin'] + "/consultation"} id="navbarCenterButton1" onMouseOver={mouseover} onMouseLeave={mouseleave}>
              <span className='navbarCenterButton' data-aos="fade-down" style={tools_page ? {color: "#ffffff"} : {color: "#000000"}} id="navbarCenterButton1" onMouseOver={mouseover} onMouseLeave={mouseleave} >Consultation</span>
            </a>
          )}
        </div>
      <div className='navbarRight'>
        <div className='navbarSocialsContainer'>
          <div className='navbarIconContainer'>
            <a href='https://www.instagram.com/evanonearth_eth/' target="_blank" rel="noreferrer">
              <img data-aos="fade-down-left" src={instagram_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='instagramIcon' className='navbarIcon instagramIcon' alt="Instagram"/>
            </a>
            <a href='https://www.linkedin.com/in/evan-gottschalk/' target="_blank" rel="noreferrer">
              <img data-aos="fade-down" src={linkedin_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='linkedinIcon' className='navbarIcon linkedinIcon' alt="LinkedIn"/>
            </a>
            <a href='https://twitter.com/EvanOnEarth_eth' target="_blank" rel="noreferrer">
              <img data-aos="fade-down-right" src={tools_page ? twitter_icon_white : twitter_icon_black} onMouseOver={mouseover} onMouseLeave={mouseleave} id='twitterIcon' className='navbarIcon twitterIcon' alt="Twitter"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
//AppEnd

export default Navbar