import React from 'react'; 


import './footer.css'

const Footer = () => {
  
  console.log('FOOTER WARNING: Set to display: none in Footer.js')

  return (
    <div className='footer'>
      <div className='footerContainer'>
        <div style={{display: 'none'}} className='footerTextContainer'>
          <marquee>Solve the puzzle to enter Meliora . . . . . . . . . . . . . . . . . . . . The LMNTL Guardians need your help . . . . . . . . . . . . . . . . . . . . Still puzzled? Keep mousing around! . . . . . . . . . . . . . . . . . . . . The call of adventure draws heroes into Meliora  . . . . . . . . . . . . . . . . . . . . Solve the puzzle to enter Meliora . . . . . . . . . . . . . . . . . . . . The LMNTL Guardians need your help . . . . . . . . . . . . . . . . . . . . Still puzzled? Keep mousing around! . . . . . . . . . . . . . . . . . . . . The call of adventure draws heroes into Meliora  . . . . . . . . . . . . . . . . . . . . </marquee>
        </div>
      </div>
      <div className='creatorAttributionContainer'>
        <div className='creatorAttributionText'>Site created by </div><a className='creatorAttributionLink' href="https://twitter.com/EvanOnEarth_eth">@EvanOnEarth_eth</a>
      </div>
    </div>
  )
}

export default Footer