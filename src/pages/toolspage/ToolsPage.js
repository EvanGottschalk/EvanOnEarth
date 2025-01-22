import React from 'react'

// import Tools from '../../components/tools/Tools'
import Banner_ImageGenerator from '../../components/banner_imageGenerator/Banner_ImageGenerator'
import Banner_TextGenerator from '../../components/banner_textGenerator/Banner_TextGenerator'


import './toolspage.css'

const ToolsPage = () => {
  return (
    <div className='toolspage'>
      <Banner_ImageGenerator />
      <Banner_TextGenerator />
    </div>
  )
}

export default ToolsPage
