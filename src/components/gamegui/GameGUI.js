//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';
import {connectWallet, runContractFunction, getJSONfromIPFS, setUserTokenID, setUserMetadata, setUserAvatarURI} from '../../scripts/SmartContractOperator';

import cursor_image_Next from '../../image/cursors/cursor-next.png'
import cursor_image_Medium from '../../image/cursors/cursor-medium.png'
import cursor_image_Large from '../../image/cursors/cursor-large.png'

import player_interface_1 from '../../image/player_interfaces/ipad-banner-1.png'
import player_interface_2 from '../../image/player_interfaces/ipad-banner-2.png'
import player_interface_3 from '../../image/player_interfaces/ipad-banner-3.png'
import player_interface_next from '../../image/player_interfaces/ipad-banner-next.png'


import EXP_plus_5 from '../../image/animations/exp/EXP_plus_5.gif'
import EXP_plus_10 from '../../image/animations/exp/EXP_plus_10.gif'

import TAP_plus_3 from '../../image/animations/TAP_plus_3.gif'

import './gamegui.css'








//--------------------------------------------------------------------------------------------------
//# Variables

const game_page_URL = window.location['origin'] + '/game';
const blockchain_page_URL = window.location['origin'] + '/blockchain';
const story_page_URL = window.location['origin'] + '/story';

const connect_on_load = false;


let scene_dict = {};

const EXP_animation_dict = {5: EXP_plus_5,
                            10: EXP_plus_10};

const TAP_animation_dict = {3: TAP_plus_3};

var player_interface_image = player_interface_next;

var current_scene = 0;
var background_image;
var button_cursor_1 = cursor_image_Next;
var button_cursor_2 = cursor_image_Next;
var button_cursor_3 = cursor_image_Next;
var button_cursor_4 = cursor_image_Next;
var button_cursor_5 = cursor_image_Next;


var mobile_device = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile_device = true;
};

var vertical_display = false;
if (window.screen.width < window.screen.height) {
  console.log("Vertical screen detected");
  vertical_display = true;
  console.log("window.screen.width: ", window.screen.width);
  console.log("window.screen.height: ", window.screen.height);
};

var rotate_game = false;


//AppStart
const GameGUI = () => {


let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);



onLoad();


//--------------------------------------------------------------------------------------------------
//# Functions

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function pause(time) {
  const seconds = time/1000;
  console.log('PAUSE Start: ' + seconds.toString() + ' seconds');
  return new Promise(resolve => setTimeout(resolve, time));
};

async function onLoad() {
  scene_dict = await runContractFunction('Signatures', 'getTask', [2000, 'World: LearnTap, Game: Explore the Mint']);
  if (mobile_device || vertical_display) {
    //rotate_game = true;
    document.getElementById('playerGameInterfaceImage').style.opacity = '1';
    document.getElementById('playerGameInterfaceContainer').style.top = '100%';
  }
}



async function handleSceneClick(event) {
  //await changeScene();
  console.log('Scene Background Clicked!');
}

async function handleButtonClick(event) {
  const button_ID = event.target.id.split('gameSceneCursorImage')[1];
  console.log('Button ID:', button_ID);
  await changeScene();
  if (button_ID === '4') {
    await changeScene();
  }
};

async function changeScene(new_scene_number = false) {
  console.log('Scene # Input:', new_scene_number);
  if (!new_scene_number && new_scene_number !== 0) {
    new_scene_number = current_scene += 1;
  };
  
  
  current_scene = new_scene_number;
  console.log('Scene Changed to:', current_scene);
  

  background_image = scene_dict['scenes'][current_scene.toString()]['background'];
  console.log('Background:', background_image);

  const button_1 = document.getElementById('gameSceneCursorImage1');
  const button_2 = document.getElementById('gameSceneCursorImage2');
  const button_3 = document.getElementById('gameSceneCursorImage3');
  const button_4 = document.getElementById('gameSceneCursorImage4');
  const button_5 = document.getElementById('gameSceneCursorImage5');
  
  // Button 1
  if (scene_dict['scenes'][current_scene.toString()]['button_1'] === 'next') {
    button_cursor_1 = cursor_image_Next;
  } else if (scene_dict['scenes'][current_scene.toString()]['button_1'] === 'large' || scene_dict['scenes'][current_scene.toString()]['button_1'] === 'grey') {
    button_cursor_1 = cursor_image_Large;
  } else {
    button_cursor_1 = '';
  };
  if (button_1) {
    if (scene_dict['scenes'][current_scene.toString()]['button_1'] === 'grey') {
      button_1.style.filter = 'brightness(35%)';
    } else {
      button_1.style.filter = 'brightness(100%)';
    }
  }


  // Button 2
  if (scene_dict['scenes'][current_scene.toString()]['button_2'] === 'large'|| scene_dict['scenes'][current_scene.toString()]['button_2'] === 'grey') {
    button_cursor_2 = cursor_image_Large;
    if (scene_dict['scenes'][current_scene.toString()]['button_2'] === 'grey') {
      button_2.style.filter = 'brightness(35%)';
    } else {
      button_2.style.filter = 'brightness(100%)';
    };
  } else {
    button_cursor_2 = '';
  };
  

  // Button 3
  if (scene_dict['scenes'][current_scene.toString()]['button_3'] === 'large') {
    button_cursor_3 = cursor_image_Large;
  } else {
    button_cursor_3 = '';
  }


  // Wallet Button
  if (scene_dict['scenes'][current_scene.toString()]['wallet_button'] === 'next') {
    button_cursor_4 = cursor_image_Next;
  } else if (scene_dict['scenes'][current_scene.toString()]['wallet_button'] === 'large') {
    button_cursor_4 = cursor_image_Large;
  } else {
    button_cursor_4 = '';
  };


  // Claim Button
  if (scene_dict['scenes'][current_scene.toString()]['claim_button'] === 'next') {
    button_cursor_5 = cursor_image_Next;
  } else if (scene_dict['scenes'][current_scene.toString()]['claim_button'] === 'medium') {
    button_cursor_5 = cursor_image_Medium;
  } else if (scene_dict['scenes'][current_scene.toString()]['claim_button'] === 'large') {
    button_cursor_5 = cursor_image_Large;
  } else {
    button_cursor_5 = '';
  };


  // EXP
  var EXP_gain = 0;
  if (scene_dict['scenes'][current_scene.toString()]['exp']) {
    EXP_gain = scene_dict['scenes'][current_scene.toString()]['exp'];
  };

  // TAP
  var TAP_gain = 0;
  if (scene_dict['scenes'][current_scene.toString()]['tap']) {
    TAP_gain = scene_dict['scenes'][current_scene.toString()]['tap'];
  };
  

  if (new_scene_number >= 0) {
    document.getElementById('backgroundImage').src = background_image;
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
    button_4.style.opacity = '0';
    button_5.style.opacity = '0';
    button_1.src = button_cursor_1;
    button_2.src = button_cursor_2;
    button_3.src = button_cursor_3;
    button_4.src = button_cursor_4;
    button_5.src = button_cursor_5;
    if (EXP_gain) {
      gainEXP(EXP_gain);
      await pause(2000);
    };
    if (TAP_gain) {
      gainTAP(TAP_gain);
      await pause(2000);
    };
  };

  // Save to local storage for pre-account
  sessionStorage.setItem(current_scene.toString(), 'EXP: ' + EXP_gain.toString() + ', TAP: ' + TAP_gain.toString());


};


async function gainEXP(EXP_gain) {
  if (EXP_gain > 0) {
    document.getElementById('expAnimation').src = EXP_animation_dict[EXP_gain];
    await pause(5000);
    document.getElementById('expAnimation').src = '';
  };
};

async function gainTAP(TAP_gain) {
  if (TAP_gain > 0) {
    document.getElementById('expAnimation').src = TAP_animation_dict[TAP_gain];
    await pause(5000);
    document.getElementById('expAnimation').src = '';
  };
};

async function saveProgress(event) {
  console.log(current_scene);
  if (current_scene === 0) {
    document.getElementById('saveButton').textContent = 'Save';
    scene_dict = await getJSONfromIPFS(scene_dict[0]);
    console.log('Scene:', scene_dict);
    changeScene(0);
  } else {
    let i = 0;
    let new_progress_array = {};
    while (i < current_scene) {
      new_progress_array[i] = sessionStorage.getItem(i.toString());
    };
  };
};


function handleMouseOver(event) {
  const button_1 = document.getElementById('gameSceneCursorImage1');
  const button_2 = document.getElementById('gameSceneCursorImage2');
  const button_3 = document.getElementById('gameSceneCursorImage3');
  const button_4 = document.getElementById('gameSceneCursorImage4');
  const button_5 = document.getElementById('gameSceneCursorImage5');
  const button_moused_ID = event.target.id.split('gameSceneCursorImage')[1];
  console.log(button_moused_ID);
  if (button_moused_ID === '1') {
    button_1.style.opacity = '1';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
    button_4.style.opacity = '0';
    button_5.style.opacity = '0';
  } else if (button_moused_ID === '2') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '1';
    button_3.style.opacity = '0';
    button_4.style.opacity = '0';
    button_5.style.opacity = '0';
  } else if (button_moused_ID === '3') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '1';
    button_4.style.opacity = '0';
    button_5.style.opacity = '0';
  } else if (button_moused_ID === '4') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
    button_4.style.opacity = '1';
    button_5.style.opacity = '0';
  } else if (button_moused_ID === '5') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
    button_4.style.opacity = '0';
    button_5.style.opacity = '1';
  };
};




//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='gameGUI'>
    <div className='gameGUIContainer'
    style={(rotate_game) ? {
      transform: "rotate(90deg)",
      transformOrigin: "left right"} :
      {}}>
      <div className='gameSceneContainer' 
      style={(vertical_display) ? {
        width: "100vw",
        margin: "0% 0% 0% 0%"} :
        {}}>
        <img src={background_image} alt='' id='backgroundImage' className='backgroundImage'/>
        <img src='' alt='' id='expAnimation' className='expAnimation'
          style={{opacity:'1'}}/>
        <div className='gameSceneGUIContainer'>
          <div id='playerGameInterfaceContainer' className='playerGameInterfaceContainer'>
            <img src={player_interface_image} alt='' id='playerGameInterfaceImage' className='playerGameInterfaceImage'
            style={{opacity:'0'}}/>
            <div className='playerGameInterfaceCursorsContainer' id='playerGameInterfaceCursorsContainer'>
              <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_3} alt='' id='gameSceneCursorImage3' className='playerGameInterfaceCursorImage'
              style={{opacity:'0'}}/>
              <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_2} alt='' id='gameSceneCursorImage2' className='playerGameInterfaceCursorImage' 
              style={{opacity:'0'}}/>
              <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_1} alt='' id='gameSceneCursorImage1' className='playerGameInterfaceCursorImage'
              style={{opacity:'1'}}/>
            </div>
          </div>
          <div className='walletCursorContainer' id='gameSceneCursorContainer4'>
            <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_4} alt='' id='gameSceneCursorImage4' className='playerGameInterfaceCursorImage'
            style={{opacity:'0'}}/>
          </div>
          <div className='claimCursorContainer' id='gameSceneCursorContainer5'>
            <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_5} alt='' id='gameSceneCursorImage5' className='playerGameInterfaceCursorImage'
            style={{opacity:'0'}}/>
          </div>
        </div>  
      </div>
      
    </div>
    <div className='saveButtonContainer' onClick={saveProgress}>
      <a id='saveButton' className='saveButton'>Load</a>
    </div>
  </div>
  
)
}
//AppEnd

export default GameGUI