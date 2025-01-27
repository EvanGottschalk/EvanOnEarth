//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useState } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import image_generator from "../../scripts/GeneratorOperator";

import './imageGeneratorGUI.css'

import default_image from '../../image/image_preview.webp';
import generating_placeholder_0 from '../../image/generating/generating_0.webp';
import generating_placeholder_1 from '../../image/generating/generating_1.webp';
import generating_placeholder_2 from '../../image/generating/generating_2.webp';
import generating_placeholder_3 from '../../image/generating/generating_3.webp';
import loading_placeholder from '../../image/generating/image_loading_preview.webp';
import generation_failed_placeholder from '../../image/generating/generation_failed.webp'
// import { all } from 'redux-saga/effects';












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

let image_URL = default_image;

let generation_time = 0;
let pause_generation = false;

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
                    "DALL-E": {"description": "Text-to-image generation powered by OpenAI and ChatGPT.",
                                                     "link": "https://openai.com/index/dall-e-3/"}};











//--------------------------------------------------------------------------------------------------
//# Functions

//AppStart                                                     
const ImageGeneratorGUI = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // Check default checklist options
  document.addEventListener("DOMContentLoaded", () => {
    let checkbox = document.querySelector('input[value="black-forest-labs/FLUX.1-dev"]');
    checkbox.checked = true; 
    checkbox = document.querySelector('input[value="256x256"]');
    checkbox.checked = true; 
  });

  function pause(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function mouseOver(event) {
    // console.log('\nImageGeneratorGUI >>> RUNNING mouseOver()');
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseLeave(event) {
    // console.log('\nImageGeneratorGUI >>> RUNNING mouseLeave()');
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  function handlePromptChange(event) {
    parameter_dict["prompt"] = event.target.value;
    console.log("\nhandlePromptChange() -> prompt:", parameter_dict["prompt"]);
  }

  function handleNegativePromptChange(event) {
    parameter_dict["negative_prompt"] = event.target.value;
    console.log("\nhandleNegativePromptChange() -> negative_prompt:", parameter_dict["negative_prompt"]);
  }

  async function handleModelChange(event) {
    const selected_model = event.target.value;

    console.log("\nhandleModelChange() -> Selected Model:", selected_model);
    
    const title_element = document.getElementById('modelDescriptionTitle');
    const description_element = document.getElementById('modelDescription');
    const link_element = document.getElementById('modelLink');
    const model_output_container = document.getElementById('modelOutputContainer_' + selected_model);
    
    // If no models would be left selected, nothing changes
    const selected_models = await getCheckedValues('model');
    if (selected_models.length === 0) {
      event.target.checked = true;
    } else {
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
  };

  async function handleSizeChange(event) {
    let selected_size = event.target.value;
    console.log("\nhandleSizeChange() -> Selected Size:", selected_size);

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
          new_size_container.className = 'imageGeneratorGUIimageOutputSizeTitle';
          new_size_container.innerHTML = selected_size;

          const new_image_output_container = document.createElement('div');
          new_image_output_container.className = 'imageGeneratorGUIimageOutputContainer';
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
            new_image_element.className = 'imageGeneratorGUIgeneratedImage';
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

  async function handleDropdownChange(event) {
    console.log('\nhandleDropdownChange() -> value:', event.target.value);
    const element_ID = event.target.id;
    const new_value = event.target.value;
    if (element_ID === "dropdownQuantity") {
      const all_models = await getAllChecklistOptions('model');
      const all_sizes = await getCheckedValues('size');
      const all_outputs_container = document.getElementById('imageGeneratorGUIallOutputContainer');
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
              new_image_element.className = 'imageGeneratorGUIgeneratedImage';
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
    console.log('\nImageGeneratorGUI >>> RUNNING handleSubmitClick()');

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
    } else if (element_ID === 'generateImageButton') {
      pause_generation = false
      document.getElementById('pauseButton').value = "Pause";
      document.getElementById('generationTimeContainer').style.display = 'block';
      await setGenerationTime(0);

      const checked_models = await getCheckedValues('model');
      const checked_sizes = await getCheckedValues('size');
      parameter_dict = await updateParameterDict();

      for (let i = 0; i < checked_models.length; i++) {
        parameter_dict["model"] = checked_models[i];
        console.log('model_currently_generating', parameter_dict["model"]);

        for (let j = 0; j < checked_sizes.length; j++) {
          parameter_dict["width"] = checked_sizes[j].split("x")[0];
          parameter_dict["height"] = checked_sizes[j].split("x")[1];
          for (let output_ID = 0; output_ID < parameter_dict["quantity"]; output_ID++) {
            console.log('output_ID', output_ID);
            image_URL = await handleImageGeneration(parameter_dict, output_ID);
            console.log("image_URL:", image_URL);
          };
        };
      };
    };
  };


  async function displayImage(image_element, new_image) {
    console.log('\nImageGeneratorGUI >>> RUNNING displayImage()');
    image_element.src = new_image;
    console.log('Image Displayed!', new_image);
    console.log('New Image src:', image_element.src);
  };

  async function setGenerationTime(seconds) {
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
    console.log('\nImageGeneratorGUI >>> RUNNING updateParameterDict()');
    parameter_dict["quantity"] = document.getElementById("dropdownQuantity").value;
    parameter_dict["prompt"] = document.getElementById("promptEntry").value;
    parameter_dict["negative_prompt"] = document.getElementById("negativePromptEntry").value;
    parameter_dict["guidance_scale"] = document.getElementById("guidanceScaleEntry").value;
    parameter_dict["num_inference_steps"] = document.getElementById("inferenceStepsEntry").value;
    console.log('parameter_dict:', parameter_dict);
    return(parameter_dict);
  };

  async function handleImageGeneration(parameter_dict, output_ID) {
    console.log('\nImageGeneratorGUI >>> RUNNING handleImageGeneration()');
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
    let image_generator_response, image_generator_promise, image_generator_result;
    image_generator_response = image_generator.generateImage(parameter_dict);

    // Loop
    var number_of_loops = 0;
    var loop_count = 1;
    var loop = true;
    console.log('len', image_generator_response.length);
    console.log(image_generator_response);
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
        image_generator_promise = image_generator_response.then((result) => {
          console.log("result:", result);
          if (typeof result === 'string') {
            if (result === 'error') {
              loop = false;
              image_generator_result = generation_failed_placeholder
            } else {
              image_element.src = loading_placeholder;
              loop = false;
              image_generator_result = result;
            };
          };
        });
      };
    };

    console.log('image_generator_response', image_generator_response);
    console.log('image_generator_response[image_URL]', image_generator_response['image_URL']);

    await pause(100); // brief pause to assign new image URL, which comes right after displaying the loading placeholder
    image_URL = image_generator_result;
    image_title_element.innerHTML = image_short_name;
    await displayImage(image_element, image_URL);
  
    return(image_URL);
  }

  async function getAllChecklistOptions(parameter) {
    console.log('\nImageGeneratorGUI >>> RUNNING getAllChecklistOptions()');

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
    console.log('\nImageGeneratorGUI >>> RUNNING getCheckedValues()');

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
    let copied_image_URL = event.target.src;
    console.log("copyImageURL() -> Copied Image URL:", copied_image_URL);

    const image_element_ID = event.target.id.split('generatedImage_')[1];

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
    <div className='imageGeneratorGUI' id="anchorElement_ImageGeneratorGUI">
      <div className='imageGeneratorGUItextContainer imageGeneratorGUIpromptContainer'>
        <div className='imageGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={10 * delay_gap} data-aos="fade-right">
          Enter Prompt:
        </div>
        <input className="imageGeneratorGUIsubmitButton imageGeneratorGUIfloatRightButton" id="copySimplifierPrefixButton" type="button" onClick={handleSubmitClick} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={10 * delay_gap} data-aos="fade-left"
          value={mobile ? "Copy Simplifier" : "Copy Simplifier Prefix"}
        />
      </div>
      <textarea className='imageGeneratorGUIpromptEntry' id='promptEntry' onChange={handlePromptChange} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
        data-aos-delay={11 * delay_gap} data-aos="zoom-in"
        placeholder="Your prompt here..." required/>
      <div className='imageGeneratorGUItextContainer imageGeneratorGUIpromptContainer'>
        <div className='imageGeneratorGUITitle imageGeneratorGUIcopyNegativePromptTitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={12 * delay_gap} data-aos="fade-right">
          Negative Prompt:
        </div>
        <input className="imageGeneratorGUIsubmitButton imageGeneratorGUIfloatRightButton" id="copyNegativePromptButton" type="button" onClick={handleSubmitClick} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={12 * delay_gap} data-aos="fade-left"
          value={mobile ? "Copy Default" : "Copy Default Negative Prompt"}
        />
      </div>
      <textarea className='imageGeneratorGUIpromptEntry imageGeneratorGUInegativePromptEntry' id='negativePromptEntry' onChange={handleNegativePromptChange} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
        data-aos-delay={13 * delay_gap} data-aos="zoom-in"
        placeholder={"Your negative prompt here..."} required
      />
      <div className='imageGeneratorGUItextContainer'>
        <div className='imageGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={14 * delay_gap} data-aos="fade-right">
          Select Model(s):
        </div>
      </div>
      <div className='imageGeneratorGUIcheckList' id='checklistModels' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
        data-aos-delay={15 * delay_gap} data-aos="zoom-in">
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
          DALL-E 3
        </label>
        {/* <label className="imageGeneratorGUImodelOption">
          <input type="checkbox" value="DALL-E" onChange={handleModelChange}/>
          DALL-E 2
        </label> */}
      </div>
      <div className='imageGeneratorGUItextContainer'>
        <div className='imageGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={16 * delay_gap} data-aos="fade-right">
          Model Description:
        </div>
      </div>
      <div className="imageGeneratorGUItextContainer" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
        data-aos-delay={17 * delay_gap} data-aos="zoom-in">
        <div className='imageGeneratorGUImodelDescription' id='modelDescriptionTitle'>
          <u><b>black-forest-labs/FLUX.1-dev</b></u>
        </div>
        <div className='imageGeneratorGUImodelDescription' id='modelDescription'>
          FLUX.1 defines the new state-of-the-art in image synthesis. Our models set new standards in their respective model class. FLUX.1 [pro] and [dev] surpass popular  models like Midjourney v6.0, DALL·E 3 (HD) and SD3-Ultra in each of the following aspects: Visual Quality, Prompt Following, Size/Aspect Variability, Typography and Output Diversity. FLUX.1 [schnell] is the most advanced few-step model to date, outperforming not even its in-class competitors but also strong non-distilled models like Midjourney v6.0 and DALL·E 3 (HD) .  Our models are specifically finetuned to preserve the entire output diversity from pretraining.
        </div>
        <a className='imageGeneratorGUImodelLink' id='modelLink' href="https://blackforestlabs.ai/announcing-black-forest-labs/" target='_blank' rel="noreferrer">
          <u>Learn More -></u>
        </a>
      </div>
      <div className='imageGeneratorGUItextContainer'>
        <div className='imageGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={18 * delay_gap} data-aos="fade-right">
          Select Size(s):
        </div>
      </div>
      <div className='imageGeneratorGUIcheckList' id='checklistSizes' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
        data-aos-delay={19 * delay_gap} data-aos="zoom-in">
        <label className="imageGeneratorGUIsizeOption">
          <input type="checkbox" value="256x256" onChange={handleSizeChange} />
          256x256
        </label>
        <label className="imageGeneratorGUIsizeOption">
          <input type="checkbox" value="512x512" id="checkBox_512x512" onChange={handleSizeChange} />
          512x512
        </label>
        <label className="imageGeneratorGUIsizeOption">
          <input type="checkbox" value="1024x1024" onChange={handleSizeChange} />
          1024x1024
        </label>
        <label className="imageGeneratorGUIsizeOption">
          <input type="checkbox" value="2048x2048" onChange={handleSizeChange} />
          2048x2048
        </label>
        <label className="imageGeneratorGUIsizeOption">
          <input type="checkbox" value="960x536" onChange={handleSizeChange}/>
          960x536 (16:9 | YouTube)
        </label>
        <label className="imageGeneratorGUIsizeOption">
          <input type="checkbox" value="1920x1080" onChange={handleSizeChange}/>
          1920x1080 (16:9 | YouTube)
        </label>
        <label className="imageGeneratorGUIsizeOption">
          <input type="checkbox" value="536x960" onChange={handleSizeChange}/>
          536x960 (16:9 | TikTok)
        </label>
        <label className="imageGeneratorGUIsizeOption">
          <input type="checkbox" value="1080x1920" onChange={handleSizeChange}/>
          1080x1920 (16:9 | TikTok)
        </label>
        <label className="imageGeneratorGUIsizeOption">
          <input disabled type="checkbox" value="Custom" onChange={handleSizeChange}/>
          Custom (coming soon!)
        </label>
      </div>
      <div className='imageGeneratorGUItextContainer'>
        <div className='imageGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={20 * delay_gap} data-aos="fade-right">
          # of Ouputs (per model):
        </div>
        <select className='imageGeneratorGUIdropdownList' id='dropdownQuantity' onChange={handleDropdownChange} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={21 * delay_gap} data-aos="fade-right">
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
        <div className='imageGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={22 * delay_gap} data-aos="fade-right">
          Imaginitive Freedom:
        </div>
        <div className="imageGeneratorGUIrow">
          <input className='imageGeneratorGUIpromptEntry imageGeneratorGUInumberEntry' id='guidanceScaleEntry' onChange={handleDropdownChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
            data-aos-delay={23 * delay_gap} data-aos="fade-right"
            placeholder="" />
          <div className='textGeneratorGUIhelperText' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
            data-aos-delay={23 * delay_gap} data-aos="fade-left">
            (1 to 20)
          </div>
        </div>
        <div className='imageGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={24 * delay_gap} data-aos="fade-right">
          Generation Duration:
        </div>
        <div className="imageGeneratorGUIrow">
          <input className='imageGeneratorGUIpromptEntry imageGeneratorGUInumberEntry' id='inferenceStepsEntry' onChange={handleDropdownChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
            data-aos-delay={25 * delay_gap} data-aos="fade-right"
            placeholder="" />
          <div className='textGeneratorGUIhelperText' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
            data-aos-delay={25 * delay_gap} data-aos="fade-left">
            (1 to 100)</div>
        </div>
        {/* <input value="Generate Text" className="imageGeneratorGUIsubmitButton" id="generateTextButton" type="submit" data-aos="fade-right" data-aos-delay={17 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI" onClick={handleSubmitClick}/> */}
      </div>
      {/* <div className='imageGeneratorGUItextContainer'>
        <div id='textTitle' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay={18 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI">
          Generated Text:
        </div>
      </div>
      <div className='imageGeneratorGUImodelDescription' id='textOutput' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI">...</div> */}
      <div className='imageGeneratorGUItextContainer'>
        <input className="imageGeneratorGUIsubmitButton" id="generateImageButton" type="submit" onClick={handleSubmitClick} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
          data-aos-delay={26 * delay_gap} data-aos="fade-right"
          value="Generate"
        />
      </div>
      <div className='imageGeneratorGUIbanner' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
        data-aos-delay={27 * delay_gap} data-aos="zoom-out">
        <div className='imageGeneratorGUIbannerTitleContainer' id='banner_imageGeneratorGUITitleContainer' >
          <span className='imageGeneratorGUIbannerTitle' id="banner_imageGeneratorGUITitleContainer" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
            data-aos-delay={27 * delay_gap} data-aos="zoom-in">
            Image Outputs
          </span>
          {/* <span className='banner_imageGeneratorGUISubTitle' id="banner_imageGeneratorGUITitleContainer" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">@EvanOnEarth_eth</span> */}
        </div>
      </div>
      <div className='imageGeneratorGUIgenerationTimeContainer ' id='generationTimeContainer'>
        <div className='imageGeneratorGUIrow'>
          <div className='imageGeneratorGUITitle'>
            Generation Time:
          </div>
          <input id='generationTime' className='imageGeneratorGUIpromptEntry imageGeneratorGUInumberDisplay' value="0:00" readOnly/>
        </div>
        <input value="Pause" className="imageGeneratorGUIsubmitButton imageGeneratorGUIpauseButton" id="pauseButton" type="button" onClick={handleSubmitClick}/>
      </div>
      <div className="imageGeneratorGUIallOutputContainer" id="imageGeneratorGUIallOutputContainer">
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_black-forest-labs/FLUX.1-dev">
          <div className="imageGeneratorGUImodelTitleContainer">
            <div id='imageTitle_black-forest-labs/FLUX.1-dev' className='imageGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
              data-aos-delay={28 * delay_gap} data-aos="fade-right">
              black-forest:
            </div>
            <span className="imageGeneratorGUIcopiedMessage" id="copiedMessage_black-forest-labs/FLUX.1-dev">
              Image URL Copied!
            </span>
          </div>
          <div className="imageGeneratorGUIimageOutputSizeTitle" id="sizeContainer_black-forest-labs/FLUX.1-dev_256x256" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
            data-aos-delay={29 * delay_gap} data-aos="fade-right">
            256x256
            <div className="imageGeneratorGUIimageOutputContainer" id="imageOutputContainer_black-forest-labs/FLUX.1-dev_256x256">
              <img src={image_URL} alt='' id='generatedImage_black-forest-labs/FLUX.1-dev_256x256' className='imageGeneratorGUIgeneratedImage' onClick={copyImageURL} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement_ImageGeneratorGUI"
                data-aos-delay={30 * delay_gap} data-aos="fade-right"/>
            </div>
          </div>
          {/* <div id="sizeContainer_black-forest-labs/FLUX.1-dev_512x512" className="imageGeneratorGUIimageOutputSizeTitle">512x512
            <div className="imageGeneratorGUIimageOutputContainer" id="imageOutputContainer_black-forest-labs/FLUX.1-dev_512x512">
              <img src={image_URL} alt='' id='generatedImage_black-forest-labs/FLUX.1-dev_512x512' className='imageGeneratorGUIgeneratedImage' onClick={copyImageURL}/>
            </div>
          </div> */}
        </div>
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_ByteDance/SDXL-Lightning" style={{display: "none"}}>
          <div className="imageGeneratorGUImodelTitleContainer">
            <div id='imageTitle_ByteDance/SDXL-Lightning' className='imageGeneratorGUITitle' data-aos="fade-right">
              ByteDance:
            </div>
            <span className="imageGeneratorGUIcopiedMessage" id="copiedMessage_ByteDance/SDXL-Lightning">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_ByteDance/SDXL-Lightning_256x256" className="imageGeneratorGUIimageOutputSizeTitle">
          256x256
            <div className="imageGeneratorGUIimageOutputContainer" id="imageOutputContainer_ByteDance/SDXL-Lightning_256x256">
              <img src={image_URL} alt='' id='generatedImage_ByteDance/SDXL-Lightning_256x256' className='imageGeneratorGUIgeneratedImage' onClick={copyImageURL}/>
            </div>
          </div>
        </div>
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_SG161222/RealVisXL_V4.0" style={{display: "none"}}>
          <div className="imageGeneratorGUImodelTitleContainer">
            <div id='imageTitle_SG161222/RealVisXL_V4.0' className='imageGeneratorGUITitle' data-aos="fade-right">
              SG161222:
            </div>
            <span className="imageGeneratorGUIcopiedMessage" id="copiedMessage_SG161222/RealVisXL_V4.0">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_SG161222/RealVisXL_V4.0_256x256" className="imageGeneratorGUIimageOutputSizeTitle">
          256x256
            <div className="imageGeneratorGUIimageOutputContainer" id="imageOutputContainer_SG161222/RealVisXL_V4.0_256x256">
              <img src={image_URL} alt='' id='generatedImage_SG161222/RealVisXL_V4.0_256x256' className='imageGeneratorGUIgeneratedImage' onClick={copyImageURL}/>
            </div>
          </div>
        </div>
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_SG161222/RealVisXL_V4.0_Lightning" style={{display: "none"}}>
          <div className="imageGeneratorGUImodelTitleContainer">
            <div id='imageTitle_SG161222/RealVisXL_V4.0_Lightning' className='imageGeneratorGUITitle' data-aos="fade-right">
              SG161222_Lightning:
            </div>
            <span className="imageGeneratorGUIcopiedMessage" id="copiedMessage_SG161222/RealVisXL_V4.0_Lightning">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_SG161222/RealVisXL_V4.0_Lightning_256x256" className="imageGeneratorGUIimageOutputSizeTitle">
          256x256
            <div className="imageGeneratorGUIimageOutputContainer" id="imageOutputContainer_SG161222/RealVisXL_V4.0_Lightning_256x256">
              <img src={image_URL} alt='' id='generatedImage_SG161222/RealVisXL_V4.0_Lightning_256x256' className='imageGeneratorGUIgeneratedImage' onClick={copyImageURL}/>
            </div>
          </div>
        </div>
        <div className='imageGeneratorGUImodelOutputContainer' id="modelOutputContainer_DALL-E" style={{display: "none"}}>
          <div className="imageGeneratorGUImodelTitleContainer">
            <div id='imageTitle_DALL-E' className='imageGeneratorGUITitle' data-aos="fade-right">
              DALL-E:
            </div>
            <span className="imageGeneratorGUIcopiedMessage" id="copiedMessage_DALL-E">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_DALL-E_256x256" className="imageGeneratorGUIimageOutputSizeTitle">
          256x256
            <div className="imageGeneratorGUIimageOutputContainer" id="imageOutputContainer_DALL-E_256x256">
              <img src={image_URL} alt='' id='generatedImage_DALL-E_256x256' className='imageGeneratorGUIgeneratedImage' onClick={copyImageURL}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGeneratorGUI