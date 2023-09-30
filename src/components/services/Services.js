import React from 'react'

import services_image from '../../image/services-image.png'



import './services.css'

const Services = () => {
  return (
    <div className='services'>
      <div className='servicesLeftContainer'>
        <div className='servicesRightTop'>
          <div className='servicesImageContainer'>
            <img src={services_image} alt='' className='servicesImage' />
          </div>
        </div>
      </div>
      <div className='servicesRightContainer'>
        <div className='servicesTextContainer'>
          <div className='servicesText' style={{
            textDecoration: 'underline',
            fontSize: '35px'}}>The Bull Market is Coming.</div>
          <div className='servicesText' style={{
            textDecoration: 'none',
            fontSize: '25px'}}>Can you afford to wait?</div>
          <br></br>
          <a href={window.location['origin'] + '/consultation'} className='servicesText servicesLink' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#2200ff'  }}>Book a Consultation Now -></a>
          <br></br>
        </div>
      </div>
    </div>
  )
}

export default Services
