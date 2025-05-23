import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Background from './components/background/Background';
import Main from './pages/main/Main';
import Footer from './components/footer/Footer';
import Consultation from './pages/consultation/Consultation'
import ImageGenerator from './pages/imagegenerator/ImageGenerator'
import TextGenerator from './pages/textgenerator/TextGenerator'
import Tools from './pages/tools/Tools'
import Floater from './pages/floater/Floater'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import FloaterPage from './pages/floater/FloaterPage';

import SmartContractContext from './scripts/SmartContractContext';


const App = () => {
     let [user_address, setAddress_Context] = useState(null);
     let [user_token_ID, setTokenID_Context] = useState(null);
     let [user_balance, setBalance_Context] = useState(null);
     let [user_metadata, setMetadata_Context] = useState(null);
     let [user_avatar_URI, setAvatarURI_Context] = useState(null);
     return (
          <SmartContractContext.Provider value={{ user_address, setAddress_Context,
                                                  user_balance, setBalance_Context,
                                                  user_token_ID, setTokenID_Context,
                                                  user_metadata, setMetadata_Context,
                                                  user_avatar_URI, setAvatarURI_Context }}>
               <BrowserRouter>
                    <Navbar />
                    {/* <Background /> */}
                    <Routes>
                         <Route exact path="/" element={<Main />} />
                         <Route exact path="/consultation" element={<Consultation />} />
                         <Route exact path="/tools" element={<Tools />} />
                         <Route exact path="/tools/imagegenerator" element={<ImageGenerator />} />
                         <Route exact path="/tools/textgenerator" element={<TextGenerator />} />
                         <Route exact path="/tools/floater" element={<Floater />} />
                         <Route exact path="/games/floater" element={<Floater />} />
                    </Routes>
                    <Footer />
               </BrowserRouter>
          </SmartContractContext.Provider>
     )
}

export default App
