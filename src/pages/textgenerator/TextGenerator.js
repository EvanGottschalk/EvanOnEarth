import React from 'react'
import TextGeneratorGUI from '../../components/textGeneratorGUI/TextGeneratorGUI'
import Banner_TextGenerator from '../../components/banner_textGenerator/Banner_TextGenerator'

import './textgenerator.css'

const TextGenerator = () => {
  return (
    <div className='textgenerator'>
      <Banner_TextGenerator />
      <TextGeneratorGUI />
    </div>
  )
}

export default TextGenerator
