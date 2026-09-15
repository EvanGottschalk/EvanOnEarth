import React from 'react'

// import Tools from '../../components/tools/Tools'
import BannerTools from '../../components/banner_tools/Banner_Tools'
import BannerImageGenerator from '../../components/banner_imageGenerator/Banner_ImageGenerator'
import BannerTextGenerator from '../../components/banner_textGenerator/Banner_TextGenerator'


import './tools.css'

const Tools = () => {
  return (
    <div className='tools'>
      <BannerTools />
      <BannerImageGenerator />
      <BannerTextGenerator />
    </div>
  )
}

export default Tools
