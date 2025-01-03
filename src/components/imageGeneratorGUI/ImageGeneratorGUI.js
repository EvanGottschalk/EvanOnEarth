//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import image_generator from "./image_generator";
import text_generator from "./text_generator";

import './imageGeneratorGUI.css'

import default_image from '../../image/image_preview.webp';
import generating_placeholder_0 from '../../image/generating/generating_0.webp';
import generating_placeholder_1 from '../../image/generating/generating_1.webp';
import generating_placeholder_2 from '../../image/generating/generating_2.webp';
import generating_placeholder_3 from '../../image/generating/generating_3.webp';
import { all } from 'redux-saga/effects';












//--------------------------------------------------------------------------------------------------
//# Variables

const generating_placeholder_list = [
  generating_placeholder_0,
  generating_placeholder_1,
  generating_placeholder_2,
  generating_placeholder_3
];

const delay_gap = 100;
const default_negative_prompt = "out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature"

let prompt = "";
let negative_prompt = "";
let quantity = 1;
let guidance_scale = 0;
let num_inference_steps = 0;
let model = "black-forest-labs/FLUX.1-dev";
let provider = "Livepeer";

let image_URL = default_image;
let generated_text = '...';


let mobile = window.innerWidth <= 600;
// let mobile = false;
// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || ) ) {
//   console.log("Mobile device detected");
//   mobile = true;
// };

const model_dict = {"black-forest-labs/FLUX.1-dev": {"description": "FLUX.1 defines the new state-of-the-art in image synthesis. Our models set new standards in their respective model class. FLUX.1 [pro] and [dev] surpass popular  models like Midjourney v6.0, DALL·E 3 (HD) and SD3-Ultra in each of the following aspects: Visual Quality, Prompt Following, Size/Aspect Variability, Typography and Output Diversity. FLUX.1 [schnell] is the most advanced few-step model to date, outperforming not even its in-class competitors but also strong non-distilled models like Midjourney v6.0 and DALL·E 3 (HD) .  Our models are specifically finetuned to preserve the entire output diversity from pretraining.",
                                                     "link": "https://blackforestlabs.ai/announcing-black-forest-labs/"},
                    "SG161222/Realistic_Vision_V6.0_B1_noVAE": {"description":  "Latest (experimental) release of the Realistic Vision model specialized in creating photorealistic portraits.",
                                                     "link": "https://huggingface.co/SG161222/Realistic_Vision_V6.0_B1_noVAE"},
                    "stabilityai/stable-diffusion-xl-base-1.0": {"description": "A base model for stable diffusion by Stability AI.",
                                                     "link": "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0"},
                    "runwayml/stable-diffusion-v1-5": {"description": "A stable diffusion model by Runway ML.",
                                                     "link": "https://huggingface.co/runwayml/stable-diffusion-v1-5"},
                    "prompthero/openjourney-v4": {"description": "A model by Prompthero for open-ended journey generation.",
                                                     "link": "https://huggingface.co/prompthero/openjourney-v4"},
                    "ByteDance/SDXL-Lightning": {"description": "A lightning-fast diffusion model by ByteDance.",
                                                     "link": "https://huggingface.co/ByteDance/SDXL-Lightning"},
                    "SG161222/RealVisXL_V4.0": {"description": "A diffusion model that excels in generating high-quality, photorealistic images.",
                                                     "link": "https://huggingface.co/SG161222/RealVisXL_V4.0"},
                    "SG161222/RealVisXL_V4.0_Lightning": {"description": "A streamlined version of RealVisXL_V4.0, designed for faster inference while still aiming for photorealism.",
                                                     "link": "https://huggingface.co/SG161222/RealVisXL_V4.0_Lightning"},
                    "DALL-E": {"description": "[COMING SOON] Text-to-image generation powered by OpenAI and ChatGPT.",
                                                     "link": "https://openai.com/index/dall-e-3/"}}

//AppStart                                                     
const ImageGeneratorGUI = () => {









//--------------------------------------------------------------------------------------------------
//# Functions

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.querySelector('input[value="black-forest-labs/FLUX.1-dev"]');
    checkbox.checked = true; 
  });

  function pause(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function mouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  function handlePromptChange(event) {
    prompt = event.target.value;
    console.log("prompt", prompt);
  }

  function handleNegativePromptChange(event) {
    negative_prompt = event.target.value;
    console.log("negative_prompt", negative_prompt);
  }

  function handleModelChange(event) {
    model = event.target.value;

    if (model === "DALL-E") {
      provider = "OpenAI";
    } else {
      provider = "Livepeer";
    };
    console.log("Selected Model:", model);
    console.log("document.getElementById('modelDescription').innerHTML", document.getElementById('modelDescription').innerHTML);
    console.log("document.getElementById(event.target.alt)", document.getElementById(event.target.alt));
    
    const title_element = document.getElementById('modelDescriptionTitle');
    const description_element = document.getElementById('modelDescription');
    const link_element = document.getElementById('modelLink');
    const model_output_container = document.getElementById('modelOutputContainer_' + model);
    // const checkbox_element = document.getElementById(event.target.id);
    if (event.target.checked) {
      model_output_container.style.display = 'block';
      title_element.innerHTML = `<u><b>` + model + `</b></u>`;
      description_element.innerHTML = model_dict[model]['description'];
      link_element.innerHTML = "Learn More ->";
      link_element.href = model_dict[model]['link'];
    } else {
      model_output_container.style.display = 'none';
      title_element.innerHTML = "";
      description_element.innerHTML = "..."
      link_element.innerHTML = "";
      link_element.href = "";
    };    
  };

  async function handleDropdownChange(event) {
    console.log('\nImageGeneratorGUI >>> RUNNING handleDropdownChange()');
    const element_ID = event.target.id;
    const new_value = event.target.value;
    if (element_ID === "dropdownQuantity") {
      const all_models = await getAllModels();
      const all_outputs_container = document.getElementById('imageGeneratorGUI_allOutputContainer');
      // On desktop, stretches image output view beyond limits of UI while maintaining image size
      if (!mobile) {
        if (new_value > 3) {
          all_outputs_container.style.width = (50 + (new_value - 3) * (50 / 3)).toString() + '%';
          all_outputs_container.style.marginLeft = (-2 * (new_value - 3)).toString() + '%';
        } else {
          all_outputs_container.style.width = "50.5%";
          all_outputs_container.style.marginLeft = "0%";
        };
      };
      let image_container;
      for (let i = 0; i < all_models.length; i++) {
        model = all_models[i];
        image_container = document.getElementById('imageOutputContainer_' + model);
        // Adds new img elements if the quantity was increased
        if (new_value > quantity) {
          for (let j = quantity; j < new_value; j++) {
            const new_image_element = document.createElement('img');
            new_image_element.src = default_image;
            new_image_element.alt = "Click to Copy URL";
            new_image_element.id = 'generatedImage_' + model + '_' + j.toString();
            new_image_element.className = 'imageGeneratorGUI_generatedImage';
            new_image_element.onclick = copyImageURL;

            image_container.appendChild(new_image_element);
          }
        // Removes extra img elements if the quantity is reduced
        } else if (new_value < quantity) {
          for (let j = quantity - (quantity - new_value); j < quantity; j++) {
            const image_element = document.getElementById('generatedImage_' + model + '_' + j.toString());
            image_element.remove();
          };
        };
        // Sets the sizes of the sizes of the img elements to match the quantity
        for (let i = 0; i < new_value; i++) {
          let new_width = "100%";
          if (!mobile) {
            new_width = (100 / new_value).toString() + "%";
          };
          
          // const new_width = (100 / new_value).toString() + "%";
          let image_element;
          if (i === 0) {
            image_element = document.getElementById('generatedImage_' + model);
          } else {
            image_element = document.getElementById('generatedImage_' + model + '_' + i.toString());
          };
          image_element.style.width = new_width;
        };
      };

      quantity = new_value;
    // } else if (element_ID === 'guidanceScaleEntry') {
    //   guidance_scale = new_value;
    //   console.log('guidance_scale', guidance_scale);
    // } else if (element_ID === 'inferenceStepsEntry') {
    //   num_inference_steps = new_value;
    //   console.log('num_inference_steps', num_inference_steps);
    };
  };

  async function handleSubmitClick(event) {
    console.log('\nImageGeneratorGUI >>> RUNNING handleSubmitClick()');

    const element_ID = event.target.id;

    if (element_ID === 'copyNegativePromptButton') {
      navigator.clipboard.writeText(default_negative_prompt)
    } else {
      const checked_models = await getCheckedModels();
      quantity = document.getElementById("dropdownQuantity").value;
      console.log('quantity', quantity);
      prompt = document.getElementById("promptEntry").value;
      negative_prompt = document.getElementById("negativePromptEntry").value;
      guidance_scale = document.getElementById("guidanceScaleEntry").value;
      num_inference_steps = document.getElementById("inferenceStepsEntry").value;

      for (let i = 0; i < checked_models.length; i++) {
        let model_currently_generating = checked_models[i];
        console.log('model_currently_generating', model_currently_generating);
        for (let output_ID = 0; output_ID < quantity; output_ID++) {
          if (event.target.id === 'generateImageButton') {
            console.log('output_ID', output_ID);
            image_URL = await handleImageGeneration(prompt, negative_prompt, guidance_scale, num_inference_steps, model_currently_generating, output_ID);
            console.log("image_URL:", image_URL);
          } else if (event.target.id === 'generateTextButton') {
            // let image_generator_response, image_generator_promise, image_generator_result, x;
            generated_text = await handleTextGeneration(prompt, checked_models[i]);
            console.log("generated_text", generated_text);
          };
        };
      };
    };
  };

  
  // async function handleTextGeneration(prompt, model) {
  //   console.log('\nImageGeneratorGUI >>> RUNNING handleTextGeneration()');
  //   let text_output_element = document.getElementById('textOutput');
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
  //     // console.log("DALL-E Response `data.imageUrl`", data.imageUrl);
  //     // console.log("DALL-E Response `data.data.imageUrl`", data.data.imageUrl);
  //     // console.log("DALL-E Response `data.data[0].imageUrl`", data.data[0].imageUrl);
  //     generated_text = data;

  //     console.log('generated_text', generated_text);
  //     console.log('generated_text[generated_text]', generated_text['generated_text']);

  //     text_output_element.innerHTML = generated_text['generated_text'];

  //     return(generated_text['generated_text']);
      
  //   } catch (error) {
  //       console.error('Error generating text:', error)
  //   } finally {
  //       console.log("Done generating text!")
  //   }

    
  // };

  async function handleTextGeneration(prompt, model) {
    console.log('\nImageGeneratorGUI >>> RUNNING handleTextGeneration()');
    
    let text_output_element = document.getElementById('textOutput');
    // let text_title_element = document.getElementById('textTitle');
  
    text_output_element.innerHTML = "Generating";
    // text_title_element.innerHTML = "Generated Text: Generating";
  
    let text_generator_response, text_generator_promise, text_generator_result;
    text_generator_response = text_generator.generateText(prompt, "gpt-3.5-turbo", "OpenAI");
    
  
    var loop_count = 1;
    var loop = true;
    console.log('len', text_generator_response.length);
    console.log(text_generator_response);
    while ( loop ) {
      await pause(500);
      if (loop_count > 3) {
        text_output_element.innerHTML = "Generating";
        loop_count = 0;
      } else {
        text_output_element.insertAdjacentText('beforeEnd', '.');
      }
      loop_count+=1;
      console.log("Loop Count: ", loop_count);
      console.log('len', text_generator_response.length);
      console.log(text_generator_response);
      text_generator_promise = text_generator_response.then((result) => {
        console.log(result);
        // if (Array.isArray(result)) {
        //   loop = false;
        //   text_generator_result = result;
        // };
        if (typeof result === 'string') {
          loop = false;
          text_generator_result = result;
        };
      });
      console.log('promise', text_generator_promise);
    };

    console.log('text_generator_response', text_generator_response);
    console.log('text_generator_response[generated_text]', text_generator_response['generated_text']);
    // const text_URL = text_generator_result[0]['url'];

    if (model === 'DALL-E') {
      text_generator_result = text_generator_result['generated_text']
    };


    generated_text = text_generator_result;
    text_output_element.innerHTML = generated_text;
    // text_title_element.innerHTML = "text: ";
  
    return(generated_text);

  };



  // async function generateImage_DALLE(prompt, width=1024, height=1024, model="black-forest-labs/FLUX.1-dev") {
  //   try {
  //     const response = await fetch('https://alchm-backend.onrender.com/generate-image', {
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
  //     console.log("DALL-E Response `data.imageUrl`", data.imageUrl);
  //     // console.log("DALL-E Response `data.data.imageUrl`", data.data.imageUrl);
  //     // console.log("DALL-E Response `data.data[0].imageUrl`", data.data[0].imageUrl);
  //     return(data.imageUrl);
  //   } catch (error) {
  //       console.error('Error generating image:', error)
  //   } finally {
  //       console.log("Done generating image!")
  //   }
  
  // }



  async function handleImageGeneration(prompt, negative_prompt, guidance_scale, num_inference_steps, model_currently_generating, output_ID) {
    var image_title_element = document.getElementById('imageTitle_' + model_currently_generating);
    var image_short_name = image_title_element.innerHTML;
    var image_element;
    if (output_ID === 0) {
      image_element = document.getElementById('generatedImage_' + model_currently_generating);
    } else {
      image_element = document.getElementById('generatedImage_' + model_currently_generating + '_' + output_ID.toString());
    }
  
    // image_URL_element.innerHTML = "Image URL: Generating";
    image_title_element.innerHTML = image_short_name + " Generating";
    image_element.src = generating_placeholder_0;
  
    let image_generator_response, image_generator_promise, image_generator_result, x;
    image_generator_response = image_generator.generateImage(prompt, negative_prompt, 512, 512, guidance_scale, num_inference_steps, model_currently_generating, provider);
    
  
    var loop_count = 1;
    var loop = true;
    console.log('len', image_generator_response.length);
    console.log(image_generator_response);
    while ( loop ) {
      await pause(500);
      if (loop_count > 3) {
        image_title_element.innerHTML = image_short_name + " Generating";
        image_element.src = generating_placeholder_0;
        loop_count = 0;
      } else {
        image_title_element.insertAdjacentText('beforeEnd', '.');
        image_element.src = generating_placeholder_list[loop_count];
      }
      loop_count+=1;
      console.log("loop_count", loop_count);
      console.log('image_generator_response.len', image_generator_response.length);
      console.log('image_generator_response', image_generator_response);
      image_generator_promise = image_generator_response.then((result) => {
        console.log(result);
        // if (Array.isArray(result)) {
        //   loop = false;
        //   image_generator_result = result;
        // };
        if (typeof result === 'string') {
          loop = false;
          image_generator_result = result;
        };
      });
      console.log('promise', image_generator_promise);
    };
  
    console.log('image_generator_response', image_generator_response);
    console.log('image_generator_response[image_URL]', image_generator_response['image_URL']);
    // const image_URL = image_generator_result[0]['url'];

    if (model_currently_generating === 'DALL-E') {
      image_generator_result = image_generator_result['image_URL']
    };


    image_URL = image_generator_result;
    image_title_element.innerHTML = image_short_name;
    image_element.src = image_URL;
  
    return(image_URL);
  }

  async function getAllModels() {
    console.log('\nImageGeneratorGUI >>> RUNNING getAllModels()');
    const checklist_element = document.getElementById("checklistModels"); 
    const checklist_models = checklist_element.querySelectorAll("input[type='checkbox']"); 
    const all_models = []; 
  
    checklist_models.forEach((checkbox) => {
      all_models.push(checkbox.value); 
    });

    console.log("all_models", all_models);
    return all_models;
  }


  async function getCheckedModels() {
    console.log('\nImageGeneratorGUI >>> RUNNING getCheckedModels()');
    const checklist_element = document.getElementById("checklistModels"); 
    const checklist_models = checklist_element.querySelectorAll("input[type='checkbox']"); 
    const checked_models = []; 
  
    checklist_models.forEach((checkbox) => {
      if (checkbox.checked) {
        checked_models.push(checkbox.value); 
      }
    });

    console.log("checked_models", checked_models);
    return checked_models;
  }


  function copyImageURL(event) {
    console.log('\nImageGeneratorGUI >>> RUNNING copyImageURL()');
    // const model = event.target.id.split('generatedImage_')[1];
    let copied_image_URL = event.target.src;
    let output_ID, copied_message_element;
    model = event.target.id.split('generatedImage_')[1];
    if (model[model.length - 2] === '_' && Number.isInteger(parseInt(model[model.length - 1]))) {
      model = model.slice(0, -2);
      output_ID = model.slice(-1, model.length);
    };
    
    copied_message_element = document.getElementById("copiedMessage_" + model);
    copied_message_element.style.opacity = 1;
    copied_message_element.style.transition = "none";

    navigator.clipboard.writeText(copied_image_URL)
    .then(() => {
      console.log("URL copied to clipboard:", copied_image_URL);
       // Keep the message visible for 2 seconds
       setTimeout(() => {
        copied_message_element.style.transition = "opacity 1s ease-in-out"; // Add fade-out transition
        copied_message_element.style.opacity = 0; // Gradually fade out
      }, 2000); // 2-second delay
    })
    .catch((err) => {
      console.error("Failed to copy URL:", err);
    });
  };










//--------------------------------------------------------------------------------------------------
//# HTML

  return (
    <div className='imageGeneratorGUI' id="anchorElement">
      <div className='imageGeneratorGUITextContainer'>
        <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={11 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#bbbbbb'}}>Enter Prompt:
        </div>
      </div>
      <textarea id='promptEntry' className='imageGeneratorGUIpromptEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
        textDecoration: 'none',
        color: '#000000'}} placeholder="Your prompt here..." onChange={handlePromptChange} required/>
      <div className='imageGeneratorGUITextContainer imageGeneratorGUInegativePromptContainer'>
        <div className='imageGeneratorGUITitle imageGeneratorGUIcopyNegativePromptTitle' data-aos="fade-right" data-aos-delay={11 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#bbbbbb'}}>Negative Prompt:
        </div>
        <input value={mobile ? "Copy Default" : "Copy Default Negative Prompt"} className="imageGeneratorGUI_submitButton imageGeneratorGUIcopyNegativePromptButton" id="copyNegativePromptButton" type="button" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <textarea id='negativePromptEntry' className='imageGeneratorGUIpromptEntry imageGeneratorGUInegativePromptEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
        textDecoration: 'none',
        color: '#000000'}} placeholder={"Your negative prompt here..."} onChange={handleNegativePromptChange} required/>
      <div className='imageGeneratorGUITextContainer'>
        <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#bbbbbb'}}>Select Model(s):
        </div>
      </div>
      <div className='imageGeneratorGUI_checklist' id='checklistModels' data-aos="fade-right" data-aos-delay={14 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
        textDecoration: 'none'
      }}>
        <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="black-forest-labs/FLUX.1-dev" onChange={handleModelChange} />
          black-forest-labs/FLUX.1-dev
        </label>
        {/* <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="SG161222/Realistic_Vision_V6.0_B1_noVAE" onChange={handleModelChange} />
          SG161222/Realistic_Vision_V6.0_B1_noVAE
        </label>
        <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="stabilityai/stable-diffusion-xl-base-1.0" onChange={handleModelChange} />
          stabilityai/stable-diffusion-xl-base-1.0
        </label>
        <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="runwayml/stable-diffusion-v1-5" onChange={handleModelChange} />
          runwayml/stable-diffusion-v1-5
        </label>
        <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="prompthero/openjourney-v4" onChange={handleModelChange} />
          prompthero/openjourney-v4
        </label> */}
        <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="ByteDance/SDXL-Lightning" onChange={handleModelChange} />
          ByteDance/SDXL-Lightning
        </label>
        <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="SG161222/RealVisXL_V4.0" onChange={handleModelChange} />
          SG161222/RealVisXL_V4.0
        </label>
        <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="SG161222/RealVisXL_V4.0_Lightning" onChange={handleModelChange} />
          SG161222/RealVisXL_V4.0_Lightning
        </label>
        <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="DALL-E" onChange={handleModelChange}/>
          DALL-E
        </label>
      </div>
      <div className='imageGeneratorGUITextContainer'>
        <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={15 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#bbbbbb'}}>Model Description:
        </div>
      </div>
      <div className='imageGeneratorGUI_modelDescription' id='modelDescriptionTitle' data-aos="fade-right" data-aos-delay={16 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"><u><b>black-forest-labs/FLUX.1-dev</b></u></div>
      <div className='imageGeneratorGUI_modelDescription' id='modelDescription' data-aos="fade-right" data-aos-delay={16 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">FLUX.1 defines the new state-of-the-art in image synthesis. Our models set new standards in their respective model class. FLUX.1 [pro] and [dev] surpass popular  models like Midjourney v6.0, DALL·E 3 (HD) and SD3-Ultra in each of the following aspects: Visual Quality, Prompt Following, Size/Aspect Variability, Typography and Output Diversity. FLUX.1 [schnell] is the most advanced few-step model to date, outperforming not even its in-class competitors but also strong non-distilled models like Midjourney v6.0 and DALL·E 3 (HD) .  Our models are specifically finetuned to preserve the entire output diversity from pretraining.</div>
      <a href="https://blackforestlabs.ai/announcing-black-forest-labs/" target='_blank' rel="noreferrer" className='imageGeneratorGUI_modelLink' id='modelLink' data-aos="fade-right" data-aos-delay={16 * delay_gap}data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" ><u>Learn More -></u></a>
      <div className='imageGeneratorGUITextContainer'>
        <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#bbbbbb'}}># of Ouputs (per model):
        </div>
        <select className='imageGeneratorGUIdropdownList' id='dropdownQuantity' onChange={handleDropdownChange} data-aos="fade-right" data-aos-delay={14 * delay_gap}data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none'}}>
          {/* <option value="0?">0?</option> */}
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          {/* <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option> */}
        </select>
        <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#bbbbbb'}}>Imaginitive Freedom:
        </div>
        <input id='guidanceScaleEntry' className='imageGeneratorGUIpromptEntry imageGeneratorGUInumberEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#000000'}} placeholder="" onChange={handleNegativePromptChange} required/>
        <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#bbbbbb'}}>Generation Duration:
        </div>
        <input id='inferenceStepsEntry' className='imageGeneratorGUIpromptEntry imageGeneratorGUInumberEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#000000'}} placeholder="" onChange={handleNegativePromptChange} required/>
        <input value="Generate Text" className="imageGeneratorGUI_submitButton" id="generateTextButton" type="submit" data-aos="fade-right" data-aos-delay={17 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <div className='imageGeneratorGUITextContainer'>
        <div id='textTitle' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={18 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
          textDecoration: 'none',
          color: '#bbbbbb'}}>Generated Text:
        </div>
      </div>
      <div className='imageGeneratorGUI_modelDescription' id='textOutput' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">...</div>
      <div className='imageGeneratorGUITextContainer'>
        <input value="Generate Image(s)" className="imageGeneratorGUI_submitButton" id="generateImageButton" type="submit" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <div className='banner_imageGeneratorGUI'>
        <div className='banner_imageGeneratorGUITitleContainer' data-aos="fade-in" data-aos-delay={delay_gap * 1} id='banner_imageGeneratorGUITitleContainer'>
          <span className='banner_imageGeneratorGUITitle' id="banner_imageGeneratorGUITitleContainer" data-aos-delay={2 * delay_gap} data-aos="zoom-in">Image Outputs</span>
          {/* <span className='banner_imageGeneratorGUISubTitle' id="banner_imageGeneratorGUITitleContainer" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">@EvanOnEarth_eth</span> */}
        </div>
      </div>
      <div className="imageGeneratorGUI_allOutputContainer" id="imageGeneratorGUI_allOutputContainer">
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_black-forest-labs/FLUX.1-dev">
          <div className="imageGeneratorGUI_modelTitleContainer">
            <div id='imageTitle_black-forest-labs/FLUX.1-dev' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
              textDecoration: 'none',
              color: '#bbbbbb'}}>black-forest: </div>
            <span className="imageGeneratorGUI_copiedMessage" id="copiedMessage_black-forest-labs/FLUX.1-dev">Image URL Copied!</span>
          </div>
          <div className="imageGeneratorGUI_imageOutputContainer" id="imageOutputContainer_black-forest-labs/FLUX.1-dev">
            <img src={image_URL} alt='' id='generatedImage_black-forest-labs/FLUX.1-dev' className='imageGeneratorGUI_generatedImage' onClick={copyImageURL}/>
          </div>
        </div>
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_ByteDance/SDXL-Lightning" style={{display: "none"}}>
          <div className="imageGeneratorGUI_modelTitleContainer">
          <div id='imageTitle_ByteDance/SDXL-Lightning' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>ByteDance: </div>
            <span className="imageGeneratorGUI_copiedMessage" id="copiedMessage_ByteDance/SDXL-Lightning">Image URL Copied!</span>
          </div>
          <div className="imageGeneratorGUI_imageOutputContainer" id="imageOutputContainer_ByteDance/SDXL-Lightning">
            <img src={image_URL} alt='' id='generatedImage_ByteDance/SDXL-Lightning' className='imageGeneratorGUI_generatedImage' onClick={copyImageURL}/>
          </div>
        </div>
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_SG161222/RealVisXL_V4.0" style={{display: "none"}}>
          <div className="imageGeneratorGUI_modelTitleContainer">
          <div id='imageTitle_SG161222/RealVisXL_V4.0' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>SG161222: </div>
            <span className="imageGeneratorGUI_copiedMessage" id="copiedMessage_SG161222/RealVisXL_V4.0">Image URL Copied!</span>
          </div>
          <div className="imageGeneratorGUI_imageOutputContainer" id="imageOutputContainer_SG161222/RealVisXL_V4.0">
            <img src={image_URL} alt='' id='generatedImage_SG161222/RealVisXL_V4.0' className='imageGeneratorGUI_generatedImage' onClick={copyImageURL}/>
          </div>
        </div>
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_SG161222/RealVisXL_V4.0_Lightning" style={{display: "none"}}>
          <div className="imageGeneratorGUI_modelTitleContainer">
          <div id='imageTitle_SG161222/RealVisXL_V4.0_Lightning' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>SG161222_Lightning: </div>
            <span className="imageGeneratorGUI_copiedMessage" id="copiedMessage_SG161222/RealVisXL_V4.0_Lightning">Image URL Copied!</span>
          </div>
          <div className="imageGeneratorGUI_imageOutputContainer" id="imageOutputContainer_SG161222/RealVisXL_V4.0_Lightning">
            <img src={image_URL} alt='' id='generatedImage_SG161222/RealVisXL_V4.0_Lightning' className='imageGeneratorGUI_generatedImage' onClick={copyImageURL}/>
          </div>
        </div>
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_DALL-E" style={{display: "none"}}>
          <div className="imageGeneratorGUI_modelTitleContainer">
            <div id='imageTitle_DALL-E' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
              textDecoration: 'none',
              color: '#bbbbbb'}}>DALL-E: </div>
            <span className="imageGeneratorGUI_copiedMessage" id="copiedMessage_DALL-E">Image URL Copied!</span>
          </div>
          <div className="imageGeneratorGUI_imageOutputContainer" id="imageOutputContainer_DALL-E">
            <img src={image_URL} alt='' id='generatedImage_DALL-E' className='imageGeneratorGUI_generatedImage' onClick={copyImageURL}/>
          </div>
        </div>
      </div>
      {/* <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/nofunlabs' target="_blank" 
      className='imageGeneratorGUIText imageGeneratorGUILink' id='nofunlabsLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave} style={{
        textDecoration: 'none',
        color: '#7CE2F9'}}>Learn More -></a> */}
    </div>
  )
}

export default ImageGeneratorGUI
