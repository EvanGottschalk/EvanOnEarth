import React from 'react'
import TextGeneratorGUI from '../../components/textGeneratorGUI/TextGeneratorGUI'
import BannerTextGenerator from '../../components/banner_textGenerator/Banner_TextGenerator'

import './textgenerator.css'

const TextGenerator = () => {
  return (
    <div className='textgenerator'>
      <BannerTextGenerator />
      <TextGeneratorGUI />
    </div>
  )
}

export default TextGenerator
