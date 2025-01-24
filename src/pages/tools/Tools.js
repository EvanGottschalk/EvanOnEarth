import React from 'react'

// import Tools from '../../components/tools/Tools'
import Banner_Tools from '../../components/banner_tools/Banner_Tools'
import Banner_ImageGenerator from '../../components/banner_imageGenerator/Banner_ImageGenerator'
import Banner_TextGenerator from '../../components/banner_textGenerator/Banner_TextGenerator'


import './tools.css'

const Tools = () => {
  return (
    <div className='tools'>
      <Banner_Tools />
      <Banner_ImageGenerator />
      <Banner_TextGenerator />
    </div>
  )
}

export default Tools
