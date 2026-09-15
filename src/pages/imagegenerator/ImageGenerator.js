import React from 'react'
import ImageGeneratorGUI from '../../components/imageGeneratorGUI/ImageGeneratorGUI'
import BannerImageGenerator from '../../components/banner_imageGenerator/Banner_ImageGenerator'

import './imagegenerator.css'

const ImageGenerator = () => {
  return (
    <div className='imagegenerator'>
      <BannerImageGenerator />
      <ImageGeneratorGUI />
    </div>
  )
}

export default ImageGenerator
