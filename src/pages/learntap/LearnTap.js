import React from 'react'
//import About from '../../components/about/About'
import Animation from '../../components/animation/Animation'
//import Roadmap from '../../components/roadmap/Roadmap'
//import Team from '../../components/team/Team'
//import FAQ from '../../components/faq/FAQ'


import Banner from '../../components/banner/Banner'
import About from '../../components/about/About'
import AndreaIntro from '../../components/andreaintro/AndreaIntro'

import './learntap.css'

const LearnTap = () => {
  return (
    <div className='learntap'>
      <Banner />
      <About />
      <AndreaIntro />
      <Animation />
    </div>
  )
}

export default LearnTap
