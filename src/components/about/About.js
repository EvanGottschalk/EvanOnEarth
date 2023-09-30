import React from 'react'

import about_image from '../../image/about-image.png'



import './about.css'

const About = () => {
  return (
    <div className='about'>
      <div className='aboutLeftContainer'>
        <div className='aboutTextContainer'>
          <div className='aboutText' style={{
            textDecoration: 'underline',
            fontSize: '22px'}}>Co-founder at NoFun Labs LLC</div>
          <div className='aboutText' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#bbbbbb'}}>- Premier Blockchain Onboarding Solutions -</div>
          <div className='aboutText' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#bbbbbb'}}>Start onboarding your next 1,000,000 users now:</div>
          <a href='https://evanon.earth/nofunlabs' target="_blank" className='aboutText aboutLink'  style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#7CE2F9'}}>evanon.earth/nofunlabs -></a>
          <br></br>
          <div className='aboutText' style={{
            textDecoration: 'underline',
            fontSize: '22px'}}>Advisor at BrightID</div>
          <div className='aboutText' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#bbbbbb'}}>- Decentralized Identity Protocol -</div>
          <div className='aboutText' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#bbbbbb'}}>Your identity, your privacy, all in your custody. No "orb" required:</div>
          <a href='https://evanon.earth/brightid' target="_blank" className='aboutText aboutLink'  style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#7CE2F9'}}>evanon.earth/brightid -></a>
          <br></br>
          <div className='aboutText'  style={{
            textDecoration: 'underline',
            fontSize: '22px'}}>Advisor at Unitap</div>
          <div className='aboutText' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#bbbbbb'}}>- Universal Token Distribution Platform -</div>
          <div className='aboutText' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#bbbbbb'}}>Grow your dapp's userbase with free gas and token raffles:</div>
          <a href='https://evanon.earth/unitap' target="_blank" className='aboutText aboutLink'  style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#7CE2F9'}}>evanon.earth/unitap -></a>
        </div>
      </div>
      <div className='aboutRightContainer'>
        <div className='aboutRightTop'>
          <div className='aboutImageContainer'>
            <img src={about_image} alt='' className='aboutImage' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
