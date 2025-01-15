//--------------------------------------------------------------------------------------------------
//# Imports

// import { Livepeer } from "@livepeer/ai";

export default { generateImage, generateText };








//--------------------------------------------------------------------------------------------------
//# Variables

const API_URL = 'https://alchm-backend.onrender.com';
const API_endpoints = {'text_to_image': '/generate-image',
                       'text_to_text': '/generate-text'};

// const livepeerAI = new Livepeer({
//   httpBearer: "",
// });









//--------------------------------------------------------------------------------------------------
//# Functions

export async function generateImage(parameter_dict) {
  console.log('\nGeneratorOperator.js >>> RUNNING generateImage()');

  console.log('parameter_dict:', parameter_dict);
  
  console.log('generateImage() -> REQUEST SENT to', API_URL + API_endpoints['text_to_image']);
  try {
    const response = await fetch(API_URL + API_endpoints['text_to_image'], {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(parameter_dict)
    })
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    };
    const data = await response.json()

    console.log('generateImage() -> RESPONSE RECEIVED from', API_URL + API_endpoints['text_to_image']);
    console.log('data', data);

    return(data.image_URL);

  } catch (error) {
    console.error('Error generating image:', error);
    return('error');
  } finally {
    console.log("Done generating image!");
  };
};


export async function generateText(parameter_dict) {
  console.log('\nGeneratorOperator.js >>> RUNNING generateText()');

  console.log('parameter_dict:', parameter_dict);
  
  console.log('generateText() -> REQUEST SENT to', API_URL + API_endpoints['text_to_text']);
  try {
    const response = await fetch(API_URL + API_endpoints['text_to_text'], {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(parameter_dict)
    })
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    };
    const data = await response.json()

    console.log('generateText() -> RESPONSE RECEIVED from', API_URL + API_endpoints['text_to_text']);
    console.log('data', data);

    return(data.generated_text);

  } catch (error) {
    console.error('Error generating text:', error);
    return('error');
  } finally {
    console.log("Done generating text!");
  };
};