//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import text_generator from "../../scripts/GeneratorOperator";

import './textGeneratorGUI.css'

import default_image from '../../image/image_preview.webp';
import generating_placeholder_0 from '../../image/generating/generating_0.webp';
import generating_placeholder_1 from '../../image/generating/generating_1.webp';
import generating_placeholder_2 from '../../image/generating/generating_2.webp';
import generating_placeholder_3 from '../../image/generating/generating_3.webp';
import loading_placeholder from '../../image/generating/image_loading_preview.webp';
import generation_failed_placeholder from '../../image/generating/generation_failed.webp'
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
const simplifier_prefix = "I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:";

let parameter_dict = {"prompt": "",
                      "negative_prompt": "",
                      "quantity": 1,
                      "width": "",
                      "height": "",
                      "guidance_scale": "",
                      "num_inference_steps": "",
                      "model": ""};

// let prompt = "";
// let negative_prompt = "";
// let quantity = 1;
// let guidance_scale = 0;
// let num_inference_steps = 0;
// let model = "black-forest-labs/FLUX.1-dev";
// let provider = "Livepeer";

let image_URL = default_image;
let generated_text = '...';

let generation_time = 0;
let pause_generation = false;

let mobile = window.innerWidth <= 600;
// let mobile = false;
// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || ) ) {
//   console.log("Mobile device detected");
//   mobile = true;
// };

const model_dict = {"gpt-3.5-turbo": {"description": "GPT-3.5-turbo is optimized for general-purpose conversational applications and tasks requiring text generation, including question answering, summarization, language translation, and more. As the default model in OpenAI’s ChatGPT API, it’s specifically engineered for balanced performance, cost-effectiveness, and high-quality output, making it versatile and suitable for both commercial and experimental use.",
                                      "link": "https://platform.openai.com/docs/models#gpt-3-5-turbo"},
                    "gpt-4": {"description":  "Latest (experimental) release of the Realistic Vision model specialized in creating photorealistic portraits.",
                                                     "link": "https://huggingface.co/SG161222/Realistic_Vision_V6.0_B1_noVAE"},
                    "gpt-4-turbo": {"description": "A base model for stable diffusion by Stability AI.",
                                                     "link": "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0"},
                    "gpt-4o": {"description": "A stable diffusion model by Runway ML.",
                                                     "link": "https://huggingface.co/runwayml/stable-diffusion-v1-5"},
                    "gpt-4o-mini": {"description": "A model by Prompthero for open-ended journey generation.",
                                                     "link": "https://huggingface.co/prompthero/openjourney-v4"},
                    "gpt-4o-realtime-preview": {"description": "A lightning-fast diffusion model by ByteDance.",
                                                     "link": "https://huggingface.co/ByteDance/SDXL-Lightning"},
                    "o1-preview": {"description": "A diffusion model that excels in generating high-quality, photorealistic images.",
                                                     "link": "https://huggingface.co/SG161222/RealVisXL_V4.0"},
                    "o1-mini": {"description": "A streamlined version of RealVisXL_V4.0, designed for faster inference while still aiming for photorealism.",
                                                     "link": "https://huggingface.co/SG161222/RealVisXL_V4.0_Lightning"}};

//AppStart                                                     
const TextGeneratorGUI = () => {









//--------------------------------------------------------------------------------------------------
//# Functions

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // Check default checklist options
  document.addEventListener("DOMContentLoaded", () => {
    let checkbox = document.querySelector('input[value="gpt-3.5-turbo"]');
    checkbox.checked = true;
    console.log('checkbox', checkbox);
    checkbox = document.querySelector('input[value="none"]');
    checkbox.checked = true; 
    console.log('checkbox', checkbox);
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
    parameter_dict["prompt"] = event.target.value;
    console.log("prompt", parameter_dict["prompt"]);
  }

  function handleNegativePromptChange(event) {
    parameter_dict["negative_prompt"] = event.target.value;
    console.log("negative_prompt", parameter_dict["negative_prompt"]);
  }

  function handleModelChange(event) {
    const selected_model = event.target.value;

    console.log("handleModelChange() -> Selected Model:", selected_model);
    
    const title_element = document.getElementById('modelDescriptionTitle');
    const description_element = document.getElementById('modelDescription');
    const link_element = document.getElementById('modelLink');
    const model_output_container = document.getElementById('modelOutputContainer_' + selected_model);
    // const checkbox_element = document.getElementById(event.target.id);
    if (event.target.checked) {
      model_output_container.style.display = 'block';
      title_element.innerHTML = `<u><b>` + selected_model + `</b></u>`;
      description_element.innerHTML = model_dict[selected_model]['description'];
      link_element.innerHTML = "Learn More ->";
      link_element.href = model_dict[selected_model]['link'];
    } else {
      model_output_container.style.display = 'none';
      title_element.innerHTML = "";
      description_element.innerHTML = "..."
      link_element.innerHTML = "";
      link_element.href = "";
    };    
  };

  async function handleMaxTokensChange(event) {
    let selected_size = event.target.value;
    console.log("handleMaxTokensChange() -> Selected Size:", selected_size);

    // Sets the size to the default size if all size checkboxes are turned off
    const selected_sizes = await getCheckedValues('size');
    if (selected_sizes.length === 0) {
      event.target.checked = true;
    } else {
      const all_models = await getAllChecklistOptions('model');

      all_models.forEach((model) => {
        const model_output_container = document.getElementById('modelOutputContainer_' + model);
        if (event.target.checked) {
          const new_size_container = document.createElement('div');
          new_size_container.id = 'sizeContainer_' + model + '_' + selected_size;
          new_size_container.className = 'textGeneratorGUIimageOutputSizeTitle';
          new_size_container.innerHTML = selected_size;

          const new_image_output_container = document.createElement('div');
          new_image_output_container.className = 'textGeneratorGUI_imageOutputContainer';
          new_image_output_container.id = 'imageOutputContainer_' + model + '_' + selected_size;

          for (let j = 0; j < parameter_dict["quantity"]; j++) {
            const new_image_element = document.createElement('img');
            new_image_element.src = default_image;
            new_image_element.alt = "Click to Copy URL";
            if (j === 0) {
              new_image_element.id = 'generatedImage_' + model + '_' + selected_size;
            } else {
              new_image_element.id = 'generatedImage_' + model + '_' + selected_size + '_' + j.toString();
            };
            new_image_element.className = 'textGeneratorGUI_generatedImage';
            new_image_element.onclick = copyImageURL;
            if (!mobile) {
              new_image_element.style.width = (100 / parameter_dict['quantity']).toString() + "%";
            };

            new_image_output_container.appendChild(new_image_element);
          };
          new_size_container.appendChild(new_image_output_container);
          model_output_container.appendChild(new_size_container);
        } else {
          const size_container_to_remove = document.getElementById('sizeContainer_' + model + '_' + selected_size);
          if (size_container_to_remove) {
            size_container_to_remove.remove();
          };
        };
      });
    };   
  };

  // async function updateImageDisplay(new_value) {
  //   const all_models = await getAllChecklistOptions('model');
  //   const all_sizes = await getAllChecklistOptions('size');
  //   const all_outputs_container = document.getElementById('textGeneratorGUI_allOutputContainer');
  //   // On desktop, stretches image output view beyond limits of UI while maintaining image size
  //   if (!mobile) {
  //     if (new_value > 3) {
  //       all_outputs_container.style.width = (50 + (new_value - 3) * (50 / 3)).toString() + '%';
  //       all_outputs_container.style.marginLeft = (-2 * (new_value - 3)).toString() + '%';
  //     } else {
  //       all_outputs_container.style.width = "50.5%";
  //       all_outputs_container.style.marginLeft = "0%";
  //     };
  //   };
  //   let image_container, model_name;
  //   for (let i = 0; i < all_models.length; i++) {
  //     model_name = all_models[i];
  //     image_container = document.getElementById('imageOutputContainer_' + model_name);
  //     for (let k = 0; k < all_sizes.length; k++) {
  //       size = all_sizes[k];
  //       // Adds new img elements if the quantity was increased
  //       if (new_value > parameter_dict["quantity"]) {
  //         for (let j = parameter_dict["quantity"]; j < new_value; j++) {
  //           const new_image_element = document.createElement('img');
  //           new_image_element.src = default_image;
  //           new_image_element.alt = "Click to Copy URL";
  //           new_image_element.id = 'generatedImage_' + model_name + '_' + j.toString();
  //           new_image_element.className = 'textGeneratorGUI_generatedImage';
  //           new_image_element.onclick = copyImageURL;

  //           image_container.appendChild(new_image_element);
  //         }
  //       // Removes extra img elements if the quantity is reduced
  //       } else if (new_value < parameter_dict["quantity"]) {
  //         for (let j = parameter_dict["quantity"] - (parameter_dict["quantity"] - new_value); j < parameter_dict["quantity"]; j++) {
  //           const image_element = document.getElementById('generatedImage_' + model_name + '_' + j.toString());
  //           image_element.remove();
  //         };
  //       };
  //     // Sets the sizes of the sizes of the img elements to match the quantity
  //     for (let i = 0; i < new_value; i++) {
  //       let new_width = "100%";
  //       if (!mobile) {
  //         new_width = (100 / new_value).toString() + "%";
  //       };
        
  //       // const new_width = (100 / new_value).toString() + "%";
  //       let image_element;
  //       if (i === 0) {
  //         image_element = document.getElementById('generatedImage_' + model_name);
  //       } else {
  //         image_element = document.getElementById('generatedImage_' + model_name + '_' + i.toString());
  //       };
  //       image_element.style.width = new_width;
  //     };
  //   };
  // };

  async function handleDropdownChange(event) {
    console.log('\nTextGeneratorGUI >>> RUNNING handleDropdownChange()');
    const element_ID = event.target.id;
    const new_value = event.target.value;
    if (element_ID === "dropdownQuantity") {
      const all_models = await getAllChecklistOptions('model');
      const all_sizes = await getCheckedValues('size');
      const all_outputs_container = document.getElementById('textGeneratorGUI_allOutputContainer');
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
      let image_container, model_name, size;
      for (let i = 0; i < all_models.length; i++) {
        model_name = all_models[i];
        for (let k = 0; k < all_sizes.length; k++) {
          size = all_sizes[k];
          image_container = document.getElementById('imageOutputContainer_' + model_name + '_' + size.toString());
          // Adds new img elements if the quantity was increased
          if (new_value > parameter_dict["quantity"]) {
            for (let j = parameter_dict["quantity"]; j < new_value; j++) {
              const new_image_element = document.createElement('img');
              new_image_element.src = default_image;
              new_image_element.alt = "Click to Copy URL";
              new_image_element.id = 'generatedImage_' + model_name + '_' + size.toString() + '_' + j.toString();
              new_image_element.className = 'textGeneratorGUI_generatedImage';
              new_image_element.onclick = copyImageURL;

              image_container.appendChild(new_image_element);
            };
          // Removes extra img elements if the quantity is reduced
          } else if (new_value < parameter_dict["quantity"]) {
            for (let j = parameter_dict["quantity"] - (parameter_dict["quantity"] - new_value); j < parameter_dict["quantity"]; j++) {
              const image_element = document.getElementById('generatedImage_' + model_name + '_' + size.toString() + '_' + j.toString());
              image_element.remove();
            };
          };
          // Sets the sizes of the sizes of the img elements to match the quantity
          for (let k = 0; k < new_value; k++) {
            let new_width = "100%";
            if (!mobile) {
              new_width = (100 / new_value).toString() + "%";
            };
            
            // const new_width = (100 / new_value).toString() + "%";
            let image_element;
            if (k === 0) {
              image_element = document.getElementById('generatedImage_' + model_name + '_' + size);
              image_element.style.width = new_width;
            } else {
              image_element = document.getElementById('generatedImage_' + model_name + '_' + size + '_' + k.toString());
            };
            if (image_element) {
              image_element.style.width = new_width;
            } else {
              console.log('image_element not found');
              console.log('generatedImage_' + model_name + '_' + size.toString() + '_' + k.toString());
            };
          };
        };
      };

      parameter_dict["quantity"] = new_value;
    } else if (element_ID === 'guidanceScaleEntry') {
      parameter_dict["guidance_scale"] = new_value;
      console.log('guidance_scale', parameter_dict["guidance_scale"]);
    } else if (element_ID === 'inferenceStepsEntry') {
      parameter_dict["num_inference_steps"] = new_value;
      console.log('num_inference_steps', parameter_dict["num_inference_steps"]);
    };
  };

  async function handleSubmitClick(event) {
    console.log('\nTextGeneratorGUI >>> RUNNING handleSubmitClick()');

    const element_ID = event.target.id;

    if (element_ID === 'copyNegativePromptButton') {
      navigator.clipboard.writeText(default_negative_prompt);
    } else if (element_ID === 'copySimplifierPrefixButton') {
      navigator.clipboard.writeText(simplifier_prefix);
    } else if (element_ID === 'pauseButton') {
      pause_generation = !pause_generation;
      if (pause_generation) {
        event.target.value = "Resume";
      } else {
        event.target.value = "Pause";
      };
    } else if (element_ID === 'generateTextButton') {
      pause_generation = false
      document.getElementById('pauseButton').value = "Pause";
      document.getElementById('generationTimeContainer').style.display = 'block';
      await setGenerationTime(0);

      const checked_models = await getCheckedValues('model');
      const checked_sizes = await getCheckedValues('size');
      parameter_dict = await updateParameterDict();

      for (let i = 0; i < checked_models.length; i++) {
        parameter_dict["model"] = checked_models[i];

        for (let j = 0; j < checked_sizes.length; j++) {
          parameter_dict["max_tokens"] = checked_sizes[j];

          for (let output_ID = 0; output_ID < parameter_dict["quantity"]; output_ID++) {
            console.log('output_ID', output_ID);
            image_URL = await handleTextGeneration(parameter_dict, output_ID);
            console.log("image_URL:", image_URL);
          };
        };
      };
    };
  };

  

  async function handleTextGeneration(parameter_dict, output_ID) {
    console.log('\nTextGeneratorGUI >>> RUNNING handleTextGeneration()');
    
    console.log('parameter_dict:', parameter_dict);
    console.log('output_ID:', output_ID);
    const model = parameter_dict["model"];
    console.log('Model Currently Generating:', model);
    const size = parameter_dict["max_tokens"];
    console.log('Size Currently Generating:', size);

    // const length = parameter_dict["width"].toString() + "x" + parameter_dict["height"].toString();
    // console.log('length Currently Generating:', length);
    // Page element setup
    var model_title_element = document.getElementById('textTitle_' + parameter_dict["model"]);
    var model_short_name = model_title_element.innerHTML;
    var text_element;
    if (output_ID === 0) {
      text_element = document.getElementById('generatedText_' + model + '_' + size.toString());
    } else {
      text_element = document.getElementById('generatedText_' + model + '_' + size.toString() + '_' + output_ID.toString());
    };

    var image_element;
    if (output_ID === 0) {
      image_element = document.getElementById('generatedImage_' + model + '_' + size.toString());
    } else {
      image_element = document.getElementById('generatedImage_' + model + '_' + size.toString() + '_' + output_ID.toString());
    };

    // Temporary Fix
    // text_element = document.getElementById('imageOutputContainer_black-forest-labs/FLUX.1-dev_256x256');
    
    model_title_element.innerHTML = model_short_name + " Generating";
    image_element.src = generating_placeholder_0;
    
    // text generation
    let text_generator_response, text_generator_promise, text_generator_result;

    //temporary
    parameter_dict['max_tokens'] = 0;

    text_generator_response = text_generator.generateText(parameter_dict); 
    model_title_element.innerHTML = "Generating";

    // Loop
    var number_of_loops = 0;
    var loop_count = 1;
    var loop = true;
    console.log('len', text_generator_response.length);
    console.log(text_generator_response);
    while ( loop ) {
      await pause(500);
      if (!pause_generation) {
        if (loop_count % 2 === 0) {
          generation_time += 1;
          await setGenerationTime(generation_time);
        };
        if (loop_count > 3) {
          model_title_element.innerHTML = "Generating";
          image_element.src = generating_placeholder_0;
          loop_count = 0;
          number_of_loops++;
          console.log('number_of_loops', number_of_loops);
        } else {
          model_title_element.insertAdjacentText('beforeEnd', '.');
          image_element.src = generating_placeholder_list[loop_count];
        };
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
    };

    console.log('text_generator_response', text_generator_response);
    console.log('text_generator_response[generated_text]', text_generator_response['generated_text']);
    // const text_URL = text_generator_result[0]['url'];


    generated_text = text_generator_result;
    text_element.innerHTML = generated_text;
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

  async function displayImage(image_element, new_image) {
    console.log('\nTextGeneratorGUI >>> RUNNING displayImage()');
    image_element.src = new_image;
    console.log('Image Displayed!', new_image);
    console.log('New Image src:', image_element.src);
  };

  async function setGenerationTime(seconds) {
    // console.log('\nTextGeneratorGUI >>> RUNNING setGenerationTime()');

    generation_time = seconds;
    const generation_time_element = document.getElementById('generationTime');

    const total_minutes = Math.floor(seconds / 60);
    const seconds_remainder = seconds % 60; 
    const formatted_seconds = seconds_remainder.toString().padStart(2, '0');
    const formatted_time = `${total_minutes}:${formatted_seconds}`;

    generation_time_element.value = formatted_time;

    return(formatted_time);
  };

  async function updateParameterDict() {
    console.log('\nTextGeneratorGUI >>> RUNNING updateParameterDict()');
    parameter_dict["quantity"] = document.getElementById("dropdownQuantity").value;
    console.log('quantity', parameter_dict["quantity"]);
    parameter_dict["prompt"] = document.getElementById("promptEntry").value;
    // parameter_dict["negative_prompt"] = document.getElementById("negativePromptEntry").value;
    parameter_dict["guidance_scale"] = document.getElementById("guidanceScaleEntry").value;
    parameter_dict["num_inference_steps"] = document.getElementById("inferenceStepsEntry").value;

    // parameter_dict['teperature'] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['max_tokens'] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['top_p'] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['frequency_penalty'] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['presence_penalty'] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['stop'] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['model'] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['provider'] = document.getElementById("inferenceStepsEntry").value;
    return(parameter_dict);
  };



  async function handleImageGeneration(parameter_dict, output_ID) {
    console.log('\nTextGeneratorGUI >>> RUNNING handleTextGeneration()');
    console.log('parameter_dict:', parameter_dict);
    console.log('output_ID:', output_ID);
    const model = parameter_dict["model"];
    console.log('Model Currently Generating:', model);
    const size = parameter_dict["width"].toString() + "x" + parameter_dict["height"].toString();
    console.log('Size Currently Generating:', size);
    // Page element setup
    var image_title_element = document.getElementById('imageTitle_' + parameter_dict["model"]);
    var image_short_name = image_title_element.innerHTML;
    var image_element;
    if (output_ID === 0) {
      image_element = document.getElementById('generatedImage_' + model + '_' + size);
    } else {
      image_element = document.getElementById('generatedImage_' + model + '_' + size + '_' + output_ID.toString());
    };
    
    image_title_element.innerHTML = image_short_name + " Generating";
    image_element.src = generating_placeholder_0;
    
    // Image generation
    let text_generator_response, text_generator_promise, text_generator_result;
    text_generator_response = text_generator.generateImage(parameter_dict);

    // Loop
    var number_of_loops = 0;
    var loop_count = 1;
    var loop = true;
    console.log('len', text_generator_response.length);
    console.log(text_generator_response);
    while ( loop ) {
      await pause(500);
      if (!pause_generation) {
        if (loop_count % 2 === 0) {
          generation_time += 1;
          await setGenerationTime(generation_time);
        };
        if (loop_count > 3) {
          image_title_element.innerHTML = image_short_name + " Generating";
          image_element.src = generating_placeholder_0;
          loop_count = 0;
          number_of_loops++;
          console.log('number_of_loops', number_of_loops);
        } else {
          image_title_element.insertAdjacentText('beforeEnd', '.');
          image_element.src = generating_placeholder_list[loop_count];
        };
        loop_count+=1;
        // console.log("loop_count", loop_count);
        // console.log('text_generator_response.len', text_generator_response.length);
        // console.log('text_generator_response', text_generator_response);
        text_generator_promise = text_generator_response.then((result) => {
          console.log("result:", result);
          if (typeof result === 'string') {
            if (result === 'error') {
              // image_element.src = generation_failed_placeholder;
              loop = false;
              text_generator_result = generation_failed_placeholder
            } else {
              image_element.src = loading_placeholder;
              loop = false;
              text_generator_result = result;
            };
          };
        });
      };
    };

    console.log('text_generator_response', text_generator_response);
    console.log('text_generator_response[image_URL]', text_generator_response['image_URL']);

    await pause(100); // brief pause to assign new image URL, which comes right after displaying the loading placeholder
    image_URL = text_generator_result;
    image_title_element.innerHTML = image_short_name;
    // image_element.src = image_URL;
    await displayImage(image_element, image_URL);
  
    return(image_URL);
  }

  async function getAllChecklistOptions(parameter) {
    console.log('\nTextGeneratorGUI >>> RUNNING getAllChecklistOptions()');

    let checklist_element;
    if (parameter === 'model') {
      checklist_element = document.getElementById("checklistModels");
    } else if (parameter === 'size') {
      checklist_element = document.getElementById("checklistSizes");
    };
    const checklist_options = checklist_element.querySelectorAll("input[type='checkbox']"); 
    const all_checklist_options = []; 
  
    checklist_options.forEach((checkbox) => {
      all_checklist_options.push(checkbox.value); 
    });

    console.log("all_checklist_options", all_checklist_options);
    return all_checklist_options;
  };


  async function getCheckedValues(parameter) {
    console.log('\nTextGeneratorGUI >>> RUNNING getCheckedValues()');

    let checklist_element;
    if (parameter === 'model') {
      checklist_element = document.getElementById("checklistModels");
    } else if (parameter === 'size' || parameter === 'width' || parameter === 'height') {
      checklist_element = document.getElementById("checklistSizes");
    };
    const checklist_values = checklist_element.querySelectorAll("input[type='checkbox']"); 
    const checked_items = []; 
  
    checklist_values.forEach((checkbox) => {
      if (checkbox.checked) {
        checked_items.push(checkbox.value); 
      }
    });

    console.log("checked_items", checked_items);
    return(checked_items);
  };


  function copyImageURL(event) {
    console.log('\nTextGeneratorGUI >>> RUNNING copyImageURL()');

    let copied_image_URL = event.target.src;
    console.log("Image URL:", copied_image_URL);

    const image_element_ID = event.target.id.split('generatedImage_')[1];
    // console.log('image_element_ID:', image_element_ID);

    let model_name;
    for (const model in model_dict) {
      if (image_element_ID.includes(model)) {
        model_name = model;
      };
    };
    
    const copied_message_element = document.getElementById("copiedMessage_" + model_name);
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
    <div className='textGeneratorGUI' id="anchorElement">
      <div className='textGeneratorGUITextContainer textGeneratorGUIpromptContainer'>
        <div className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={11 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Enter Prompt:
        </div>
        <input value={mobile ? "Copy Simplifier" : "Copy Simplifier Prefix"} className="textGeneratorGUI_submitButton textGeneratorGUIfloatRightButton" id="copySimplifierPrefixButton" type="button" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <textarea id='promptEntry' className='textGeneratorGUIpromptEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"  onChange={handlePromptChange}
        placeholder="Your prompt here..." required/>
      {/* <div className='textGeneratorGUITextContainer textGeneratorGUIpromptContainer'>
        <div className='textGeneratorGUITitle textGeneratorGUIcopyNegativePromptTitle' data-aos="fade-right" data-aos-delay={11 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Negative Prompt:
        </div>
        <input value={mobile ? "Copy Default" : "Copy Default Negative Prompt"} className="textGeneratorGUI_submitButton textGeneratorGUIfloatRightButton" id="copyNegativePromptButton" type="button" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <textarea id='negativePromptEntry' className='textGeneratorGUIpromptEntry textGeneratorGUInegativePromptEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onChange={handleNegativePromptChange}
        placeholder={"Your negative prompt here..."} required/> */}
      <div className='textGeneratorGUITextContainer'>
        <div className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Select Model(s):
        </div>
      </div>
      <div className='textGeneratorGUI_checklist' id='checklistModels' data-aos="fade-right" data-aos-delay={14 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" value="gpt-3.5-turbo" onChange={handleModelChange} />
          GPT 3.5 Turbo
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" value="gpt-4" onChange={handleModelChange} />
          GPT 4
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" value="gpt-4-turbo" onChange={handleModelChange} />
          GPT 4 Turbo
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" value="gpt-4o" onChange={handleModelChange} />
          GPT 4o
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" value="gpt-4o-mini" onChange={handleModelChange} />
          GPT 4o Mini
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" value="gpt-4o-realtime-preview" onChange={handleModelChange} />
          GPT 4o Realtime Preview
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" value="o1-preview" onChange={handleModelChange} />
          o1 Preview
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" value="o1-mini" onChange={handleModelChange} />
          o1 Mini
        </label>
      </div>
      <div className='textGeneratorGUITextContainer'>
        <div className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={15 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Model Description:
        </div>
      </div>
      <div className='textGeneratorGUI_modelDescription' id='modelDescriptionTitle' data-aos="fade-right" data-aos-delay={16 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"><u><b>black-forest-labs/FLUX.1-dev</b></u></div>
      <div className='textGeneratorGUI_modelDescription' id='modelDescription' data-aos="fade-right" data-aos-delay={16 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
        GPT-3.5-turbo is optimized for general-purpose conversational applications and tasks requiring text generation, including question answering, summarization, language translation, and more. As the default model in OpenAI’s ChatGPT API, it’s specifically engineered for balanced performance, cost-effectiveness, and high-quality output, making it versatile and suitable for both commercial and experimental use.
      </div>
      <a href="https://platform.openai.com/docs/models#gpt-3-5-turbo" target='_blank' rel="noreferrer" className='textGeneratorGUI_modelLink' id='modelLink' data-aos="fade-right" data-aos-delay={16 * delay_gap}data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" >
        <u>Learn More -></u>
      </a>
      <div className='textGeneratorGUITextContainer'>
        <div className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Maximum Character Length(s):
        </div>
      </div>
      <div className='textGeneratorGUI_checklist' id='checklistSizes' data-aos="fade-right" data-aos-delay={14 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
        {/* <label className="textGeneratorGUIsizeOption">
          <input type="checkbox" value="256x256" onChange={handleMaxTokensChange} />
          256x256
        </label> */}
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_none'>
          <input type="checkbox" value="none" id='maxTokensCheckbox_none' onChange={handleMaxTokensChange} />
          None
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_280'>
          <input type="checkbox" value="280" id='maxTokensCheckbox_280' onChange={handleMaxTokensChange} />
          280 (Twitter)
        </label>        
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_custom_1'>
          <input type="checkbox" value="custom" id='maxTokensCheckbox_custom_1' onChange={handleMaxTokensChange}/>
          Custom Length 1:&nbsp;
          <input id='maxTokensInput_custom_1' className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" placeholder="" onChange={handleDropdownChange} required/>
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_custom_2'>
          <input type="checkbox" value="custom" id='maxTokensCheckbox_custom_2' onChange={handleMaxTokensChange}/>
          Custom Length 2:&nbsp;
          <input id='maxTokensInput_custom_2' className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" placeholder="" onChange={handleDropdownChange} required/>
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_custom_3'>
          <input type="checkbox" value="custom" id='maxTokensCheckbox_custom_3' onChange={handleMaxTokensChange}/>
          Custom Length 3:&nbsp;
          <input id='maxTokensInput_custom_3' className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" placeholder="" onChange={handleDropdownChange} required/>
        </label>
      </div>
      <div className='textGeneratorGUITextContainer'>
      <div className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          # of Ouputs (per model):
        </div>
        <select className='textGeneratorGUIdropdownList' id='dropdownQuantity' onChange={handleDropdownChange} data-aos="fade-right" data-aos-delay={14 * delay_gap}data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" style={{
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
        <div className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Imaginitive Freedom:
        </div>
        <input id='guidanceScaleEntry' className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" placeholder="" onChange={handleDropdownChange} required/>
        <div className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={13 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Generation Duration:
        </div>
        <input id='inferenceStepsEntry' className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" placeholder="" onChange={handleDropdownChange} required/>
        <input value="Generate Text" className="textGeneratorGUI_submitButton" id="generateTextButton" type="submit" data-aos="fade-right" data-aos-delay={17 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <div className='textGeneratorGUITextContainer'>
        <div id='textTitle' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={18 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Generated Text:
        </div>
      </div>
      <div className='textGeneratorGUI_modelDescription' id='textOutput' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">...</div>
      <div className='textGeneratorGUITextContainer'>
        <input value="Generate" className="textGeneratorGUI_submitButton" id="generateImageButton" type="submit" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <div className='banner_textGeneratorGUI'>
        <div className='banner_textGeneratorGUITitleContainer' data-aos="fade-in" data-aos-delay={delay_gap * 1} id='banner_textGeneratorGUITitleContainer'>
          <span className='banner_textGeneratorGUITitle' id="banner_textGeneratorGUITitleContainer" data-aos-delay={2 * delay_gap} data-aos="zoom-in">Text Outputs</span>
          {/* <span className='banner_textGeneratorGUISubTitle' id="banner_textGeneratorGUITitleContainer" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">@EvanOnEarth_eth</span> */}
        </div>
      </div>
      <div className='textGeneratorGUIgenerationTimeContainer ' id='generationTimeContainer'>
        <div className='textGeneratorGUIrow'>
          <div className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
            Generation Time:
          </div>
          <input id='generationTime' className='textGeneratorGUIpromptEntry textGeneratorGUInumberDisplay' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" value="0:00" readOnly/>
        </div>
        <input value="Pause" className="textGeneratorGUI_submitButton textGeneratorGUI_pauseButton" id="pauseButton" type="button" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <div className="textGeneratorGUI_allOutputContainer" id="textGeneratorGUI_allOutputContainer">
        {/* gpt-3.5-turbo */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-3.5-turbo">
          <div className="textGeneratorGUI_modelTitleContainer">
            <div id='textTitle_gpt-3.5-turbo' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 3.5 Turbo:
            </div>
            <span className="textGeneratorGUI_copiedMessage" id="copiedMessage_gpt-3.5-turbo">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_gpt-3.5-turbo_none" className="textGeneratorGUIimageOutputSizeTitle">
          No Character Limit
            {/* <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_gpt-3.5-turbo_none">
              <img src={image_URL} alt='' id='generatedImage_gpt-3.5-turbo_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
            </div> */}
            <div className='textGeneratorGUI_generatedText' id='generatedText_gpt-3.5-turbo_none' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_gpt-3.5-turbo_none">
                <img src={image_URL} alt='' id='generatedImage_gpt-3.5-turbo_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4 */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4" style={{display: "none"}}>
          <div className="textGeneratorGUI_modelTitleContainer">
            <div id='textTitle_gpt-4' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4:
            </div>
          </div>
          <div id="sizeContainer_gpt-4_none" className="textGeneratorGUIimageOutputSizeTitle">
          No Character Limit
            <div className='textGeneratorGUI_generatedText' id='generatedText_gpt-3.5-turbo' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_gpt-4_none">
                <img src={image_URL} alt='' id='generatedImage_gpt-4_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4-turbo */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4-turbo" style={{display: "none"}}>
          <div className="textGeneratorGUI_modelTitleContainer">
            <div id='textTitle_gpt-4-turbo' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4 Turbo:
            </div>
          </div>
          <div id="sizeContainer_gpt-4-turbo_none" className="textGeneratorGUIimageOutputSizeTitle">
          No Character Limit
            <div className='textGeneratorGUI_generatedText' id='generatedText_gpt-3.5-turbo' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_gpt-4-turbo_none">
                <img src={image_URL} alt='' id='generatedImage_gpt-4-turbo_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4o */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4o" style={{display: "none"}}>
          <div className="textGeneratorGUI_modelTitleContainer">
            <div id='textTitle_gpt-4o' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4o:
            </div>
            <span className="textGeneratorGUI_copiedMessage" id="copiedMessage_gpt-4o">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_gpt-4o_none" className="textGeneratorGUIimageOutputSizeTitle">
          No Character Limit
            <div className='textGeneratorGUI_generatedText' id='generatedText_gpt-3.5-turbo' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_gpt-4o_none">
                <img src={image_URL} alt='' id='generatedImage_gpt-4o_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4o-mini */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4o-mini" style={{display: "none"}}>
          <div className="textGeneratorGUI_modelTitleContainer">
            <div id='textTitle_gpt-4o-mini' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4o Mini:
            </div>
            <span className="textGeneratorGUI_copiedMessage" id="copiedMessage_gpt-4o-mini">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_gpt-4o-mini_none" className="textGeneratorGUIimageOutputSizeTitle">
          No Character Limit
            <div className='textGeneratorGUI_generatedText' id='generatedText_gpt-3.5-turbo' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_gpt-4o-mini_none">
                <img src={image_URL} alt='' id='generatedImage_gpt-4o-mini_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4o-realtime-preview */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4o-realtime-preview" style={{display: "none"}}>
          <div className="textGeneratorGUI_modelTitleContainer">
            <div id='textTitle_gpt-4o-realtime-preview' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4o Realtime Preview:
            </div>
            <span className="textGeneratorGUI_copiedMessage" id="copiedMessage_gpt-4o-realtime-preview">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_gpt-4o-realtime-preview_none" className="textGeneratorGUIimageOutputSizeTitle">
          No Character Limit            
            <div className='textGeneratorGUI_generatedText' id='generatedText_gpt-3.5-turbo' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_gpt-4o-realtime-preview_none">
                <img src={image_URL} alt='' id='generatedImage_gpt-4o-realtime-preview_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
              </div>
            </div>
          </div>
        </div>
        {/* o1-preview */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_o1-preview" style={{display: "none"}}>
          <div className="textGeneratorGUI_modelTitleContainer">
            <div id='textTitle_o1-preview' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              o1 Preview:
            </div>
            <span className="textGeneratorGUI_copiedMessage" id="copiedMessage_o1-preview">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_o1-preview_none" className="textGeneratorGUIimageOutputSizeTitle">
          No Character Limit
            <div className='textGeneratorGUI_generatedText' id='generatedText_gpt-3.5-turbo' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_o1-preview_none">
                <img src={image_URL} alt='' id='generatedImage_o1-preview_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
              </div>
            </div>
          </div>
        </div>
        {/* o1-mini */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_o1-mini" style={{display: "none"}}>
          <div className="textGeneratorGUI_modelTitleContainer">
            <div id='textTitle_o1-mini' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              o1-mini:
            </div>
            <span className="textGeneratorGUI_copiedMessage" id="copiedMessage_o1-mini">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_o1-mini_none" className="textGeneratorGUIimageOutputSizeTitle">
          No Character Limit
            <div className='textGeneratorGUI_generatedText' id='generatedText_gpt-3.5-turbo' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              <div className="textGeneratorGUI_imageOutputContainer" id="imageOutputContainer_o1-mini_none">
                <img src={image_URL} alt='' id='generatedImage_o1-mini_none' className='textGeneratorGUI_generatedImage' onClick={copyImageURL}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextGeneratorGUI
