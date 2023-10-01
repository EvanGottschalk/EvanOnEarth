import React from 'react'

import services_image from '../../image/services-image.png'



import './services.css'

const Services = () => {
  return (
    <div className='services'>
      <div className='servicesLeftContainer'>
        <div className='servicesRightTop'>
          <div className='servicesImageContainer'>
            <img data-aos="fade-right" src={services_image} alt='' className='servicesImage' />
          </div>
        </div>
      </div>
      <div className='servicesRightContainer'>
        <div className='servicesTextContainer'>
          <div data-aos="fade-left" data-aos-delay="200" className='servicesText' style={{
            textDecoration: 'underline',
            fontSize: '35px'}}>The Bull Market is Coming.</div>
          <div data-aos="fade-left" data-aos-delay="400" className='servicesText' style={{
            textDecoration: 'none',
            fontSize: '25px'}}>Can you afford to wait?</div>
          <br></br>
          <div data-aos="fade-left" data-aos-delay="600" className='consultationText' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#444444'}}>Book a 30-minute consultation for $99:</div>
          <br></br>
          <div data-aos="fade-left" data-aos-delay="800" className='paypalContainer'>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="YCXANRFU4RWSW" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
