//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect } from 'react'
import Aos from "aos";

import services_image_full from '../../image/services-image.webp'
import services_image_mobile from '../../image/services-image-mobile.webp'
import twitter_icon from '../../image/icons/twitter.png'
import linkedin_icon from '../../image/icons/linkedin.png'
import instagram_icon from '../../image/icons/instagram.png'

import './services.css'










//--------------------------------------------------------------------------------------------------
//# Variables

const delay_gap = 200;
const mobile = window.innerWidth <= 600;

let services_image = services_image_mobile;











//--------------------------------------------------------------------------------------------------
//# Functions

//AppStart
const Services = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });

    const services_image_element = document.getElementById('servicesImage');
    const screen_width = window.screen.width;
    // console.log("window.screen.width: ", window.screen.width);
    // console.log("window.screen.height: ", window.screen.height);
    // console.log("window.innerWidth: ", window.innerWidth);
    // console.log("window.innerHeight: ", window.innerHeight);
    // console.log("document.documentElement.clientWidth: ", document.documentElement.clientWidth);
    if (mobile) {
      services_image = services_image_mobile;
    } else if (screen_width > 1080) {
      services_image = services_image_full;
    }
    const img = new Image();
    img.src = services_image;
    img.onload = () => {
      services_image_element.src = services_image;
    };
  }, []);


  function mouseover(event) {
    console.log(event.target.id);
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.40)';
  }
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }








//--------------------------------------------------------------------------------------------------
//# HTML

  return (
    <div className='services' id="anchorElement_Services">
      <div className='servicesLeftContainer'>
        <div className='servicesRightTop'>
          <div className='servicesImageContainer'>
            <img data-aos="fade-right" data-aos-delay={mobile ? (0) : (delay_gap * 14)} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" src={services_image} alt='' className='servicesImage' id='servicesImage' />
          </div>
        </div>
      </div>
      <div className='servicesRightContainer'>
        <div className='servicesTextContainer'>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 1} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='servicesText' style={{
            textDecoration: 'underline',
            fontSize: '35px'}}>The Bull Market is Coming.</div>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 2} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='servicesText' style={{
            textDecoration: 'none',
            fontSize: '25px'}}>Can you afford to wait?</div>
          <br></br>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 3} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='servicesText servicesDescription' style={{
            textDecoration: 'none',
            fontSize: '18px'}}>Book a consultation for yourself or your team:</div>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 4} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='servicesText servicesDescription' style={{
            textDecoration: 'none',
            fontSize: '14.5px'}}>• Master bitcoin and cryptocurrency asset management</div>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 5} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='servicesText servicesDescription' style={{
            textDecoration: 'none',
            fontSize: '14.5px'}}>• Learn the answers to all your blockchain & AI questions</div>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 6} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='servicesText servicesDescription' style={{
            textDecoration: 'none',
            fontSize: '14.5px'}}>• Get help with your cryptocurrency, NFT and AI project(s)</div>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 7} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='servicesText servicesDescription' style={{
            textDecoration: 'none',
            fontSize: '14.5px'}}>• Fall in love with my flowing locks</div>
          <br></br>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 8} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='servicesText servicesBookNowText' style={{
            textDecoration: 'none',
            fontSize: '18px', fontWeight: '30px'}}>- Book now for $99 -</div>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 9} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" className='paypalContainer'>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="ALDLNQ6GM5HWY" />
              <table>
                <tr>
                  <td>
                    <input type="hidden" name="on0" value="Please enter your email:"/>
                    Please enter your email:
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="os0" maxLength="200" />
                  </td>
                </tr>
              </table>
              <input type="hidden" name="currency_code" value="USD" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
            </form>
          </div>
        </div>
        <div className='tokenMetricsCTA'>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 10} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services">Pro tip!</div>
          <div data-aos="fade-left" data-aos-delay={delay_gap * 11} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services">
            <span>You can easily </span>
            <a href='https://tokenmetrics.sjv.io/g1LqQr' className='linkToTokenMetrics' target="_blank" rel="noreferrer">reduce risk in your crypto portfolio with AI -></a>
          </div>
        </div>
        <div className='servicesFooter'>
          <div className='servicesFooterIconContainer'>
            <div className='servicesFooterSocialsContainer'>
              <a href='https://twitter.com/EvanOnEarth_eth' target="_blank"  rel="noreferrer">
                <img data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" src={twitter_icon} id='servicesTwitterIcon' onMouseOver={mouseover} onMouseLeave={mouseleave} className='servicesFooterIcon twitterServicesFooterIcon' alt="Evan on X"/>
              </a>
              <a href='https://www.linkedin.com/in/evan-gottschalk/' target="_blank"  rel="noreferrer">
                <img data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" src={linkedin_icon} id='servicesLinkedinIcon' onMouseOver={mouseover} onMouseLeave={mouseleave} className='servicesFooterIcon linkedinServicesFooterIcon' alt="Evan on LinkedIn"/>
              </a>
              <a href='https://www.instagram.com/evanonearth_eth/' target="_blank"  rel="noreferrer">
                <img data-aos="fade-left" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_Services" src={instagram_icon} id='servicesInstagramIcon' onMouseOver={mouseover} onMouseLeave={mouseleave} className='servicesFooterIcon instagramServicesFooterIcon' alt="Evan On Instagram"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
