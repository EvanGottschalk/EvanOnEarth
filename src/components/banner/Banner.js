//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";

/*
import gray_blank_banner_segment_1 from '../../image/banner-segments/gray-blank-segment-1.png'
import gray_blank_banner_segment_2 from '../../image/banner-segments/gray-blank-segment-2.png'
import gray_blank_banner_segment_3 from '../../image/banner-segments/gray-blank-segment-3.png'
import gray_blank_banner_segment_4 from '../../image/banner-segments/gray-blank-segment-4.png'
import gray_blank_banner_segment_5 from '../../image/banner-segments/gray-blank-segment-5.png'
import gray_blank_banner_segment_6 from '../../image/banner-segments/gray-blank-segment-6.png'
import gray_blank_banner_segment_7 from '../../image/banner-segments/gray-blank-segment-7.png'
import gray_blank_banner_segment_8 from '../../image/banner-segments/gray-blank-segment-8.png'
import gray_blank_banner_segment_9 from '../../image/banner-segments/gray-blank-segment-9.png'
import gray_blank_banner_segment_10 from '../../image/banner-segments/gray-blank-segment-10.png'
import gray_blank_banner_segment_11 from '../../image/banner-segments/gray-blank-segment-11.png'
import gray_blank_banner_segment_12 from '../../image/banner-segments/gray-blank-segment-12.png'
*/

import gray_banner_segment_1 from '../../image/banner-segments/gray-button-segment-1.png'
import gray_banner_segment_2 from '../../image/banner-segments/gray-button-segment-2.png'
import gray_banner_segment_3 from '../../image/banner-segments/gray-button-segment-3.png'
import gray_banner_segment_4 from '../../image/banner-segments/gray-button-segment-4.png'
import gray_banner_segment_5 from '../../image/banner-segments/gray-button-segment-5.png'
import gray_banner_segment_6 from '../../image/banner-segments/gray-button-segment-6.png'
import gray_banner_segment_7 from '../../image/banner-segments/gray-button-segment-7.png'
import gray_banner_segment_8 from '../../image/banner-segments/gray-button-segment-8.png'
import gray_banner_segment_9 from '../../image/banner-segments/gray-button-segment-9.png'
import gray_banner_segment_10 from '../../image/banner-segments/gray-button-segment-10.png'
import gray_banner_segment_11 from '../../image/banner-segments/gray-button-segment-11.png'
import gray_banner_segment_12 from '../../image/banner-segments/gray-button-segment-12.png'

import banner_segment_1 from '../../image/banner-segments/button-segment-1.png'
import banner_segment_2 from '../../image/banner-segments/button-segment-2.png'
import banner_segment_3 from '../../image/banner-segments/button-segment-3.png'
import banner_segment_4 from '../../image/banner-segments/button-segment-4.png'
import banner_segment_5 from '../../image/banner-segments/button-segment-5.png'
import banner_segment_6 from '../../image/banner-segments/button-segment-6.png'
import banner_segment_7 from '../../image/banner-segments/button-segment-7.png'
import banner_segment_8 from '../../image/banner-segments/button-segment-8.png'
import banner_segment_9 from '../../image/banner-segments/button-segment-9.png'
import banner_segment_10 from '../../image/banner-segments/button-segment-10.png'
import banner_segment_11 from '../../image/banner-segments/button-segment-11.png'
import banner_segment_12 from '../../image/banner-segments/button-segment-12.png'

import blank_banner_segment_1 from '../../image/banner-segments/blank-segment-1.png'
import blank_banner_segment_2 from '../../image/banner-segments/blank-segment-2.png'
import blank_banner_segment_3 from '../../image/banner-segments/blank-segment-3.png'
import blank_banner_segment_4 from '../../image/banner-segments/blank-segment-4.png'
import blank_banner_segment_5 from '../../image/banner-segments/blank-segment-5.png'
import blank_banner_segment_6 from '../../image/banner-segments/blank-segment-6.png'
import blank_banner_segment_7 from '../../image/banner-segments/blank-segment-7.png'
import blank_banner_segment_8 from '../../image/banner-segments/blank-segment-8.png'
import blank_banner_segment_9 from '../../image/banner-segments/blank-segment-9.png'
import blank_banner_segment_10 from '../../image/banner-segments/blank-segment-10.png'
import blank_banner_segment_11 from '../../image/banner-segments/blank-segment-11.png'
import blank_banner_segment_12 from '../../image/banner-segments/blank-segment-12.png'

import enter_meliora_button from '../../image/button-enter-meliora.png'

import './banner.css'

const banner_segment_dict = {'bannerSegment1': banner_segment_1,
                             'bannerSegment2': banner_segment_2,
                             'bannerSegment3': banner_segment_3,
                             'bannerSegment4': banner_segment_4,
                             'bannerSegment5': banner_segment_5,
                             'bannerSegment6': banner_segment_6,
                             'bannerSegment7': banner_segment_7,
                             'bannerSegment8': banner_segment_8,
                             'bannerSegment9': banner_segment_9,
                             'bannerSegment10': banner_segment_10,
                             'bannerSegment11': banner_segment_11,
                             'bannerSegment12': banner_segment_12};

let progress_dict = {'bannerSegment1': false,
                      'bannerSegment2': false,
                      'bannerSegment3': false,
                      'bannerSegment4': false,
                      'bannerSegment5': false,
                      'bannerSegment6': false,
                      'bannerSegment7': false,
                      'bannerSegment8': false,
                      'bannerSegment9': false,
                      'bannerSegment10': false,
                      'bannerSegment11': false,
                      'bannerSegment12': false};

const Banner = () => {

  useEffect(() => {
    Aos.init();
  }, []);
  

  //--------------------------------------------------------------------------------------------------
//# Functions

function mouseover(event) {
  let element_ID = event.target.id
  let element = document.getElementById(element_ID);
  element.style.transform = 'scale(1.2)';

  if (element_ID !== 'enterMelioraButton') {
    progress_dict[element_ID] = true;
    element.src = banner_segment_dict[element_ID];
    

    // Check for completion
    if (progress_dict['bannerSegment1'] && progress_dict['bannerSegment2'] && progress_dict['bannerSegment3'] && progress_dict['bannerSegment4'] && progress_dict['bannerSegment5'] && progress_dict['bannerSegment6'] && progress_dict['bannerSegment7'] && progress_dict['bannerSegment8'] && progress_dict['bannerSegment9'] && progress_dict['bannerSegment10'] && progress_dict['bannerSegment11'] && progress_dict['bannerSegment12']) {
      document.getElementById('bannerSegment1').src = blank_banner_segment_1;
      document.getElementById('bannerSegment2').src = blank_banner_segment_2;
      document.getElementById('bannerSegment3').src = blank_banner_segment_3;
      document.getElementById('bannerSegment4').src = blank_banner_segment_4;
      document.getElementById('bannerSegment5').src = blank_banner_segment_5;
      document.getElementById('bannerSegment6').src = blank_banner_segment_6;
      document.getElementById('bannerSegment7').src = blank_banner_segment_7;
      document.getElementById('bannerSegment8').src = blank_banner_segment_8;
      document.getElementById('bannerSegment9').src = blank_banner_segment_9;
      document.getElementById('bannerSegment10').src = blank_banner_segment_10;
      document.getElementById('bannerSegment11').src = blank_banner_segment_11;
      document.getElementById('bannerSegment12').src = blank_banner_segment_12;

      document.getElementById('enterMelioraButton').style.display = 'block';
      document.getElementById('enterMelioraButton').href = window.location['pathname'] + '/games';
    }
  }
}

function mouseleave(event) {
  let element_ID = event.target.id
  let element = document.getElementById(element_ID);
  element.style.transform = 'scale(1.0)';
}

function buttonClick(event) {
  window.location.href = window.location['origin'] + '/games';
}

  return (
    <div className='banner'>
      <div className='bannerContainer'>
        <div className='bannerButtonContainer'>
          <img data-aos="fade-left" data-aos-duration="500" src={enter_meliora_button} id='enterMelioraButton' className='bannerButton' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={buttonClick}/>
        </div>
        <div className='bannerSegmentContainer'>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_1} id='bannerSegment1' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_2} id='bannerSegment2' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_3} id='bannerSegment3' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_4} id='bannerSegment4' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_5} id='bannerSegment5' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_6} id='bannerSegment6' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_7} id='bannerSegment7' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_8} id='bannerSegment8' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_9} id='bannerSegment9' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_10} id='bannerSegment10' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_11} id='bannerSegment11' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          <img data-aos="fade-left" data-aos-duration="500" src={gray_banner_segment_12} id='bannerSegment12' className='bannerSegmentImage' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
        </div>
      </div>
    </div>
  )
}

export default Banner