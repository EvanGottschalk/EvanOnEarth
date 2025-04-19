//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useRef } from 'react'; 

import './floatergui.css'









//--------------------------------------------------------------------------------------------------
//# Variables

const mobile = window.innerWidth <= 600;









//--------------------------------------------------------------------------------------------------
//# Functions

//AppStart
const FloaterGUI = () => {
  // const [floaterGUIImage, setFloaterGUIImage] = useState(null);

  // useEffect(() => {
  //   if (mobile) {
  //     import(`../../image/floaterGUI-home-mobile.webp`)
  //       .then((image) => setFloaterGUIImage(image.default))
  //       .catch((err) => console.error("Error loading floaterGUI image:", err));
  //   } else {
  //     import(`../../image/floaterGUI-home.webp`)
  //       .then((image) => setFloaterGUIImage(image.default))
  //       .catch((err) => console.error("Error loading floaterGUI image:", err));
  //   };    
  // }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    const ruffle = window.RufflePlayer?.newest() || window.RufflePlayer?.createPlayer();
    if (ruffle && containerRef.current) {
      const player = ruffle.createPlayer();
      player.style.width = '100%';
      player.style.height = '100%';
      player.load('/floater.swf'); 
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(player);
    }
  }, []);


  

  return (
    <div className='floatergui'>
      <div className='floaterGUIContainer' ref={containerRef}>
        {/* GAME GOES HERE */}
      </div>
    </div>
  )
}

export default FloaterGUI