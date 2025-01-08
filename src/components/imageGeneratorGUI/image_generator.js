//--------------------------------------------------------------------------------------------------
//# Imports

// import { Livepeer } from "@livepeer/ai";

export default { generateImage }








//--------------------------------------------------------------------------------------------------
//# Variables

const API_URL = 'https://alchm-backend.onrender.com/generate-image';

// const livepeerAI = new Livepeer({
//   httpBearer: "",
// });









//--------------------------------------------------------------------------------------------------
//# Functions

export async function generateImage(prompt, negative_prompt, width, height, guidance_scale, num_inference_steps, model, provider) {
  console.log('\nimage_generator.js >>> RUNNING generateImage()');

  console.log('prompt:', prompt);
  console.log('negative_prompt:', negative_prompt);
  console.log('width:', width);
  console.log('height:', height);
  console.log('guidance_scale:', guidance_scale);
  console.log('num_inference_steps:', num_inference_steps);
  console.log('model:', model);
  console.log('provider:', provider);
  
  console.log('generateImage() -> REQUEST SENT to', API_URL);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({ prompt, negative_prompt, width, height, guidance_scale, num_inference_steps, model, provider })
    })
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    };
    const data = await response.json()

    console.log('generateImage() -> RESPONSE RECEIVED from', API_URL);
    console.log('data', data);

    return(data.image_URL);

  } catch (error) {
    console.error('Error generating image:', error)
  } finally {
    console.log("Done generating image!")
  };
};


// async function generateImage_Livepeer(prompt, negative_prompt="", width=1024, height=1024, guidance_scale, num_inference_steps,
//   model="black-forest-labs/FLUX.1-dev") {
//   console.log('\nimage_generator.js >>> RUNNING generateImage_Livepeer()');
//   console.log('prompt:', prompt);
//   console.log('negative_prompt:', negative_prompt);
//   console.log('width:', width);
//   console.log('height:', height);
//   console.log('guidance_scale:', guidance_scale);
//   console.log('num_inference_steps:', num_inference_steps);
//   console.log('model:', model);
//   const result = await livepeerAI.generate.textToImage({
//     prompt: prompt,
//     negative_prompt: negative_prompt,
//     modelId: model,
//     width: width,
//     height: height,
//     guidance_scale: guidance_scale,
//     num_inference_steps: num_inference_steps
//   });
  
//   console.log("Livepeer result.imageResponse.images", result.imageResponse.images);
//   console.log("Livepeer Image URL:", result.imageResponse.images[0]['url']);

//   return(result.imageResponse.images[0]['url']);
// }

// async function generateImage_DALLE(prompt, width=1024, height=1024, model="DALL-E 3") {
//   console.log('\nimage_generator.js >>> RUNNING generateImage_DALLE()');
//   try {
//     const response = await fetch('https://alchm-backend.onrender.com/generate-image', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//         },
//       body: JSON.stringify({ prompt, model })
//     })

//     if (!response.ok) {
//       throw new Error(`Server error: ${response.status}`);
//     }

//     const data = await response.json()
//     // console.log("DALL-E Response `data`", data);
//     // // console.log("DALL-E Response `data.imageUrl`", data.imageUrl);
//     // console.log("DALL-E Response `data.imageURL`", data.image_URL);
//     // // console.log("DALL-E Response `data.data.imageUrl`", data.data.imageUrl);
//     // // console.log("DALL-E Response `data.data[0].imageUrl`", data.data[0].imageUrl);
//     return(data.image_URL);

//   } catch (error) {
//       console.error('Error generating image:', error)
//   } finally {
//       console.log("Done generating image!")
//   }

// }
