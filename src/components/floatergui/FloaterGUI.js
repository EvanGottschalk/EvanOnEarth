//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import connectWallet from '../../scripts/SmartContractOperator';
import {mintNFT, getMetadataURL} from '../../scripts/SmartContractOperator';

import fireLMNTL from '../../image/LMNTLfire1.png'
import waterLMNTL from '../../image/LMNTLwater1.png'
import earthLMNTL from '../../image/LMNTLearth1.png'
import airLMNTL from '../../image/LMNTLair1.png'
import mintButtonBottomImage from '../../image/button_4x1.png'


//import reset_icon from '../../image/reset-arrow.jpg'

import scene_image_0 from '../../image/demo1/0.png'
import scene_image_1 from '../../image/demo1/1.png'
import scene_image_2 from '../../image/demo1/2.png'
import scene_image_3 from '../../image/demo1/3.png'
import scene_image_4 from '../../image/demo1/4.png'
import scene_image_5 from '../../image/demo1/5.png'
import scene_image_6 from '../../image/demo1/6.png'
import scene_image_7 from '../../image/demo1/7.png'
import scene_image_8 from '../../image/demo1/8.png'
import scene_image_9_fire from '../../image/demo1/9_fire.png'
import scene_image_9_water from '../../image/demo1/9_water.png'
import scene_image_9_air from '../../image/demo1/9_air.png'
import scene_image_9_earth from '../../image/demo1/9_earth.png'

import './floatergui.css'
import { messagePrefix } from '@ethersproject/hash';








//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;

const scene_dict = {0: scene_image_0,
                    1: scene_image_1,
                    2: scene_image_2,
                    3: scene_image_3,
                    4: scene_image_4,
                    5: scene_image_5,
                    6: scene_image_6,
                    7: scene_image_7,
                    8: scene_image_8,
                    9: {'Fire': scene_image_9_fire,
                        'Water': scene_image_9_water,
                        'Air': scene_image_9_air,
                        'Earth': scene_image_9_earth}}

var current_scene = 0;
var scene_image = scene_dict[current_scene];

//NFZ Variables

var element_selected = false;
const elements_dict = {'Fire': 0,
                       'Water': 1,
                       'Air': 2,
                       'Earth': 3};

//Network and IPFS Variables

const network_IPFS_dict = {'mainnet': 'Pinata',
                           'goerli': 'Pinata',
                           'hyperspace': 'Filecoin'};

const IPFS_prefixes = {
  Pinata: 'https://gateway.pinata.cloud/ipfs/',
  Infura: '',
  Filecoin: 'https://ipfs.io/ipfs/'
}

const folder_URIs = {
  Filecoin: '',
  Pinata: 'QmPF4nrDbTnGk2UWduZDw2FCHZcF6HJicYDdsDAkEqJgH7'};


const image_URIs = {
  Filecoin: {'Fire': {1:'bafybeid2oy2tbsig674eh7n4kp4gqribvpr6ajodxokfhyzftl3il7troy/LMNTLfire1.png', 
                      2:'bafybeiaejbgk6zlz43r4fgubbxv5m3nveb23wt2mtywwqhaoj627vpf7xi/LMNTLfire2.png'},
              'Water': {1:'bafybeihrxhmnywfxxv6jfe2adfbe22m4r56dfkpgksdn2fdbkdardxcjhu/LMNTLwater1.png',
                        2:'bafybeidmkzry7ycmrii5iaibbycocptpbm5x6xo7m5y3yvln3qzdw53xwi/LMNTLwater2.png'},
              'Air':{1:'bafybeifxei46fbqxdcriqls6bb4bkvehqhs7ibbsx62mena3fisf73tk3a/LMNTLair1.png',
                      2:'bafybeihp5xj3ynypjsl2si2ve47bs4uydm6tvyxvljnbllyrobxom67hxa/LMNTLair2.png'},
              'Earth': {1:'bafybeibh7cukho5d2i7gjtuophcw455wnzk5rvy5cp7dwva74izhwst46a/LMNTLearth1.png',
                        2:'bafybeicnog62bhxyinwq6f43pkalkr26ahcj3fjpl3nizg5deaaz7cruxm/LMNTLearth2.png'}},
  Pinata: {'Fire': {1:'/LMNTLfire1.png', 
                    2:'/LMNTLfire2.png'},
            'Water': {1:'/LMNTLwater1.png',
                      2:'/LMNTLwater2.png'},
            'Air':{1:'/LMNTLair1.png',
                    2:'/LMNTLair2.png'},
            'Earth': {1:'/LMNTLearth1.png',
                      2:'/LMNTLearth2.png'}}};


//Floater Variables

const floater_URI = 'https://nftstorage.link/ipfs/bafybeias2tpqin5nx2esgv5gzlct4hfil5zeqsen4fmw34mh6x2m7t4jam/NewFloater54.swf';














//AppStart
const FloaterGUI = () => {

const [user_minted_NFT, toggleMinted] = useState(0);


let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);









//--------------------------------------------------------------------------------------------------
//# Functions

if (connect_on_load && !user_address) {
  handleMintClick();
}


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function pause(time) {
  const seconds = time/1000;
  console.log('PAUSE Start: ' + seconds.toString() + ' seconds');
  return new Promise(resolve => setTimeout(resolve, time));
};


function handleLMNTLClick(event) {
  document.getElementById('Fire').style.border = 'none';
  document.getElementById('Water').style.border = 'none';
  document.getElementById('Earth').style.border = 'none';
  document.getElementById('Air').style.border = 'none';
  element_selected = event.target['alt'];
  var clickedButton = document.getElementById(element_selected);
  clickedButton.style.border = 'solid';
  clickedButton.style.color = 'var(--color-nfzorange)';
  clickedButton.style.borderWidth = '18px';
  document.getElementById('mintButtonBottomText').textContent = 'Mint ' + element_selected;
}


async function handleMintClick(event) {
  if (!user_minted_NFT) {
    if (!user_address) {
      const user_wallet_info = await connectWallet('goerli');
      user_address = user_wallet_info['address'];
      await setAddress_Context(user_address);
      user_token_ID = user_wallet_info['token_ID'];
      await setTokenID_Context(user_token_ID);
      user_balance = user_wallet_info['balance'];
      await setBalance_Context(user_balance);
      user_metadata = user_wallet_info['metadata'];
      await setMetadata_Context(user_metadata);
      user_avatar_URI = user_wallet_info['avatar_URI'];
      await setAvatarURI_Context(user_avatar_URI);
    } else if (element_selected) {
      const mint_params = await generateMintParams(element_selected);
      const mint_button_text = document.getElementById("mintButtonBottomText");
      user_token_ID = await mintNFT(mint_button_text, mint_params);
      await setTokenID_Context(user_token_ID);
      toggleMinted( !user_minted_NFT );
      mint_button_text.textContent = "View LMNTL";
      //mint_button.href = window.location['origin'] + '/avatar';
      document.getElementById('floaterGUIBox').style.display = "none";
      current_scene += 1;
      console.log(current_scene);
      scene_image = scene_dict[current_scene][element_selected];
      document.getElementById('sceneImage').src = scene_image;
    }
  } else {
    window.location.href = window.location['origin'] + '/avatar';
  }
}


async function generateMintParams(element_selected) {
  var mint_params = [];

  const element_ID = elements_dict[element_selected];
  mint_params.push(element_ID);

  const mint_image_URL = await getMetadataURL(element_ID);
  mint_params.push(mint_image_URL);

  console.log('Mint Params: ', mint_params);
  return mint_params;
}


function handleSceneClick(event) {
  if (current_scene < 8) {
    current_scene += 1;
    console.log(current_scene);
    scene_image = scene_dict[current_scene];
    event.target.src = scene_image;
    if (current_scene === 8) {
      document.getElementById('floaterGUIBox').style.display = "";
      document.getElementById('mintButtonBottom').style.display = "";
    }
  }
}





//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='floaterGUI'>
    <div className='floaterGUIBoxTitle'>
      <span className='floaterGUIBoxTitle'></span>
    </div>
    <object width="600" height="400">
      <param name="movie" value={floater_URI}/>
      <embed src={floater_URI} width="600" height="400">
      </embed>
    </object>
    <div className='floaterGUIBoxSubTitle'></div>
    <div className='floaterGUIContainer SlideRightAnimation'>
      <div className='floaterGUICenter' id='floaterGUICenter'>
        <div className='floaterGUIBox' id='floaterGUIBox' style={(current_scene === 8) ? {display: ""} : {display: "none"}}>
          <div className='LMNTLButton' onClick={handleLMNTLClick}>
            <img src={fireLMNTL} alt='Fire' id='Fire' className='mintButtonImage' />
          </div>
          <div className='LMNTLButton' onClick={handleLMNTLClick}>
            <img src={waterLMNTL} alt='Water' id='Water' className='mintButtonImage' />
          </div>
          <div className='LMNTLButton' onClick={handleLMNTLClick}>
            <img src={earthLMNTL} alt='Earth' id='Earth' className='mintButtonImage' />
          </div>
          <div className='LMNTLButton' onClick={handleLMNTLClick}>
            <img src={airLMNTL} alt='Air' id='Air' className='mintButtonImage' />
          </div>
        </div>
        <div className='mintButtonBottom' id='mintButtonBottom' onClick={handleMintClick}  style={(current_scene === 8 || current_scene === 9) ? {display: ""} : {display: "none"}}>
          <img className='mintButtonBottomImage' id='mintButtonBottomImage' src={mintButtonBottomImage} alt='Mint LMNTL' />
          <div id="mintButtonBottomText" className='mintButtonBottomText'>{(user_address) ? 'Select LMNTL' : 'Connect Wallet'}</div>
        </div>
      </div>
      <div className='sceneContainer'>
        <div className='sceneFrame' onClick={handleSceneClick}>
          <img src={scene_image} alt='' id='sceneImage' className='sceneImage' />
        </div>
      </div>
    </div>
  </div>
)
}
//AppEnd

export default FloaterGUI