//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";

import './gameselect.css'

import learntap_preview from '../../image/learntap-preview.png'
import LMNTL_preview from '../../image/lmntl-preview.png'
import writers_block_preview from '../../image/writers-block-preview.png'

let game_dict = {'1': {'active': true,
                       'button1': 'game1button1',
                       'button2': 'game1button2'},
                 '2': {'active': false,
                       'button1': 'game2button1',
                       'button2': 'game2button2'},
                 '3': {'active': false,
                       'button1': 'game3button1',
                       'button2': 'game3button2'}};


const GameSelect = () => {

  useEffect(() => {
    Aos.init();
  }, []);

  // On Load
  document.addEventListener('DOMContentLoaded', function() {
    onLoad();
  });

function onLoad() {
  if (!game_dict['1']['active']) {
    document.getElementById(game_dict['1']['button1']).style.backgroundColor = '#7d7d7d';
    document.getElementById(game_dict['1']['button2']).style.backgroundColor = '#7d7d7d';
  };
  if (!game_dict['2']['active']) {
    document.getElementById(game_dict['2']['button1']).style.backgroundColor = '#7d7d7d';
    document.getElementById(game_dict['2']['button2']).style.backgroundColor = '#7d7d7d';
  };
  if (!game_dict['3']['active']) {
    document.getElementById(game_dict['3']['button1']).style.backgroundColor = '#7d7d7d';
    document.getElementById(game_dict['3']['button2']).style.backgroundColor = '#7d7d7d';
  };
}
  

  //--------------------------------------------------------------------------------------------------
//# Functions

function mouseover(event) {
  let element_ID = event.target.id
  let element = document.getElementById(element_ID);
  console.log(element_ID[4]);
  if (element_ID && game_dict[element_ID[4]]['active']) {
    element.style.backgroundColor = '#cd57ff';
  }
}

function mouseleave(event) {
  let element_ID = event.target.id;
  let element = document.getElementById(element_ID);
  if (element_ID && game_dict[element_ID[4]]['active']) {
    element.style.backgroundColor = '#00f780';
  }
}

function buttonClick(event) {
  let button_ID = event.target.id;
  if (button_ID === 'game1button1') {
    window.location.href = window.location['origin'] + '/games/learntap/play';
  } else if (button_ID === 'game1button2') {
    window.location.href = window.location['origin'] + '/games/learntap';
  };
};

  return (
    <div className='gameselect'>
      <div className='gameSelectContainer' id='gameSelectContainer1'>
        <div data-aos="flip-right" data-aos-delay="250" data-aos-duration="3000" className='gameSelectTitle'>LearnTap</div>
        <img data-aos="flip-down" data-aos-delay="300" data-aos-duration="1500" src={learntap_preview} id='gameSelectImage1' className='gameSelectImage'/>
        <div data-aos="flip-right" data-aos-delay="400" data-aos-duration="1500" id='game1button1' className='gameSelectTextContainer' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={buttonClick}>
          <a className='gameSelectText'>Play Now</a>
        </div>
        <div data-aos="flip-right" data-aos-delay="500" data-aos-duration="1500" id='game1button2' className='gameSelectTextContainer' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={buttonClick}>
          <a className='gameSelectText'>What is LearnTap?</a>
        </div>
      </div>
      <div className='gameSelectContainer' id='gameSelectContainer2'>
        <div data-aos="flip-right" data-aos-delay="550" data-aos-duration="3000" className='gameSelectTitle'>Guardians of the LMNTs</div>
        <img data-aos="flip-down" data-aos-delay="600" data-aos-duration="1500" src={LMNTL_preview} id='gameSelectImage2' className='gameSelectImage'/>
        <div data-aos="flip-right" data-aos-delay="700" data-aos-duration="1500" id='game2button1' className='gameSelectTextContainer' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={buttonClick}>
          <a className='gameSelectText'>Play Now</a>
        </div>
        <div data-aos="flip-right" data-aos-delay="800" data-aos-duration="1500" id='game2button2' className='gameSelectTextContainer' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={buttonClick}>
          <a className='gameSelectText'>Meet the Guardians</a>
        </div>
        <div data-aos="flip-right" data-aos-delay="900" data-aos-duration="1500" className='gameSelectDisclaimerTextContainer'>
          <a className='gameSelectDisclaimerText'>- Coming Soon -</a>
        </div>
      </div>
      <div className='gameSelectContainer' id='gameSelectContainer3'>
        <div data-aos="flip-right" data-aos-delay="950" data-aos-duration="3000" className='gameSelectTitle'>Writers Block</div>
        <img data-aos="flip-down" data-aos-delay="1000" data-aos-duration="1500" src={writers_block_preview} id='gameSelectImage3' className='gameSelectImage'/>
        <div data-aos="flip-right" data-aos-delay="1100" data-aos-duration="1500" id='game3button1' className='gameSelectTextContainer' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={buttonClick}>
          <a className='gameSelectText'>Play Now</a>
        </div>
        <div data-aos="flip-right" data-aos-delay="1200" data-aos-duration="1500" id='game3button2' className='gameSelectTextContainer' onMouseOver={mouseover} onMouseLeave={mouseleave} onClick={buttonClick}>
          <a className='gameSelectText'>How to Play</a>
        </div>
        <div data-aos="flip-right" data-aos-delay="1250" data-aos-duration="1500" className='gameSelectDisclaimerTextContainer'>
          <a className='gameSelectDisclaimerText'>- Coming Soon -</a>
        </div>
      </div>
    </div>
  )
}

export default GameSelect