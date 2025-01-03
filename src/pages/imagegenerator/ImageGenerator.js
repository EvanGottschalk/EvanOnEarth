import React from 'react'
import ImageGeneratorGUI from '../../components/imageGeneratorGUI/ImageGeneratorGUI'
import Banner_ImageGenerator from '../../components/banner_imageGenerator/Banner_ImageGenerator'

import './imagegenerator.css'

const ImageGenerator = () => {
  return (
    <div className='imagegenerator'>
      <Banner_ImageGenerator />
      <ImageGeneratorGUI />
    </div>
  )
}

export default ImageGenerator
