import React from 'react'

import Banner from '../../components/banner/Banner'
import About from '../../components/about/About'
import Services from '../../components/services/Services'
import AlchmOverview from '../../components/alchmoverview/AlchmOverview'
//import FAQ from '../../components/faq/FAQ'


import './main.css'


const Main = () => {
  return (
    <div className='main'>
      <Banner />
      <About />
      <AlchmOverview />
      <Services />
    </div>
  )
}

export default Main
