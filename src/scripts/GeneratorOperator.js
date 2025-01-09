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
  
  console.log('generateImage() -> REQUEST SENT to', API_URL + API_endpoints['text_to_image']);
  try {
    const response = await fetch(API_URL + API_endpoints['text_to_image'], {
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


export async function generateText(prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, stop, user, model, provider) {
  console.log('\nimage_generator.js >>> RUNNING generateText()');

  console.log('prompt:', prompt);
  console.log('temperature:', temperature);
  console.log('max_tokens:', max_tokens);
  console.log('top_p:', top_p);
  console.log('frequency_penalty:', frequency_penalty);
  console.log('presence_penalty:', presence_penalty);
  console.log('stop:', stop);
  console.log('user:', user);
  console.log('model:', model);
  console.log('provider:', provider);
  
  console.log('generateText() -> REQUEST SENT to', API_URL + API_endpoints['text_to_text']);
  try {
    const response = await fetch(API_URL + API_endpoints['text_to_text'], {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({ prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, stop, user, model, provider })
    })
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    };
    const data = await response.json()

    console.log('generateText() -> RESPONSE RECEIVED from', API_URL + API_endpoints['text_to_text']);
    console.log('data', data);

    return(data.generated_text);

  } catch (error) {
    console.error('Error generating text:', error)
  } finally {
    console.log("Done generating text!")
  };
};



// async function generateText_OpenAI(prompt, model="gpt-3.5-turbo") {
//   try {
//     const response = await fetch('https://alchm-backend.onrender.com/generate-text', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//         },
//       body: JSON.stringify({ prompt })
//     })

//     if (!response.ok) {
//       throw new Error(`Server error: ${response.status}`);
//     }

//     const data = await response.json()




//     console.log("DALL-E Response `data`", data);
//     console.log("DALL-E Response `data.generated_text`", data.generated_text);
//     console.log("DALL-E Response `data.generatedText`", data.generatedText);
//     // console.log("DALL-E Response `data.data.imageUrl`", data.data.imageUrl);
//     // console.log("DALL-E Response `data.data[0].imageUrl`", data.data[0].imageUrl);
//     return(data.generated_text);
//   } catch (error) {
//       console.error('Error generating image:', error)
//   } finally {
//       console.log("Done generating image!")
//   }

// }


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
