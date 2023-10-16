//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useContext } from 'react';
import SmartContractContext from '../../scripts/SmartContractContext';
import Aos from "aos";
import "aos/dist/aos.css";

//import walletButton from '../../image/button_4x1.png'
//import connectWallet from '../../scripts/SmartContractOperator';

import logo from '../../image/logo.png'

import twitter_icon from '../../image/icons/twitter.png'
import linkedin_icon from '../../image/icons/linkedin.png'
import instagram_icon from '../../image/icons/instagram.png'

import learn_icon from '../../image/icons/learn.png'
import earn_icon from '../../image/icons/earn.png'
import feed_icon from '../../image/icons/feed.png'
import market_icon from '../../image/icons/market.png'
import vote_icon from '../../image/icons/vote.png'
import learn_selected_icon from '../../image/icons/learn-selected.png'
import earn_selected_icon from '../../image/icons/earn-selected.png'
import feed_selected_icon from '../../image/icons/feed-selected.png'
import market_selected_icon from '../../image/icons/market-selected.png'
import vote_selected_icon from '../../image/icons/vote-selected.png'

import './navbar.css'


const cursor_dict = {'learn': {'selected': learn_selected_icon,
                              'unselected': learn_icon},
                     'earn': {'selected': earn_selected_icon,
                              'unselected': earn_icon},
                     'feed': {'selected': feed_selected_icon,
                              'unselected': feed_icon},
                     'market': {'selected': market_selected_icon,
                              'unselected': market_icon},
                     'vote': {'selected': vote_selected_icon,
                              'unselected': vote_icon}};










//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;

var mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile = true;
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


// On Load
document.addEventListener('DOMContentLoaded', function() {
  onLoad();
});



//--------------------------------------------------------------------------------------------------
//# Functions

function mouseover(event) {
  let element = document.getElementById(event.target.id);
  console.log(event.target.id);
  if (event.target.id === 'navbarLogoImage') {
    element.style.transform = 'scale(1.2)';
  } else {
    element.src = cursor_dict[event.target.id]['selected'];
  };
};

function mouseleave(event) {
  let element = document.getElementById(event.target.id);
  if (event.target.id === 'navbarLogoImage') {
    element.style.transform = 'scale(1.0)';
  } else {
    element.src = cursor_dict[event.target.id]['unselected'];
  };
};

function onLoad() {
  if (window.location['pathname'].includes('/games')) {
    var thing = 0;
  } else {
    document.getElementById('navbarSocialsContainer').style.display = 'none';
  };
};





//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='navbar'>
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
    <div className='navbarContainer SlideRightAnimation'>
      <div className='navbarLeft'>
        <div id="navbarLogo" className='navbarLogo'>
          <a href={window.location['origin']}>
            <img data-aos="fade-down-right" className="navbarLogoImage" id="navbarLogoImage" src={logo} alt='Home' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          </a>
        </div>
      </div>
      <div className='navbarRight'>
        <div className='navbarSocialsContainer' id='navbarSocialsContainer'>
          <div className='navbarIconContainer' id='navbarIconContainer'>
            <a href='https://twitter.com/EvanOnEarth_eth'>
              <img data-aos="flip-down" data-aos-delay="1000" src={vote_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='vote' className='navbarIcon appIcon'/>
            </a>
            <a href='https://twitter.com/EvanOnEarth_eth'>
              <img data-aos="flip-down" data-aos-delay="750" src={market_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='market' className='navbarIcon appIcon'/>
            </a>
            <a href='https://twitter.com/EvanOnEarth_eth'>
              <img data-aos="flip-down" data-aos-delay="500" src={feed_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='feed' className='navbarIcon appIcon'/>
            </a>
            <a href='https://www.linkedin.com/in/evan-gottschalk/'>
              <img data-aos="flip-down" data-aos-delay="250" src={earn_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='earn' className='navbarIcon appIcon'/>
            </a>
            <a href='https://www.instagram.com/evanonearth_eth/'>
              <img data-aos="flip-down" data-aos-delay="0" src={learn_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='learn' className='navbarIcon appIcon'/>
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