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
// import { all } from 'redux-saga/effects';












//--------------------------------------------------------------------------------------------------
//# Variables

const generating_placeholder_list = [
  generating_placeholder_0,
  generating_placeholder_1,
  generating_placeholder_2,
  generating_placeholder_3
];

const delay_gap = 50;

const default_negative_prompt = "out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature"
const simplifier_prefix = "I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:";

let parameter_dict = {"prompt": "",
                      "negative_prompt": "",
                      "quantity": 1,
                      "logit_bias": {},
                      "model": ""};

let image_URL = default_image;
let generated_text = '...';
const default_logit_bias = 25;

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
                    "gpt-4": {"description":  "GPT-4 is an advanced language model designed to deliver enhanced accuracy, comprehension, and creativity compared to its predecessor, GPT-3.5-turbo. With more refined reasoning and problem-solving capabilities, GPT-4 is suited for complex tasks that require higher precision, such as academic research assistance, legal document drafting, technical content generation, and in-depth customer support.",
                                                     "link": "https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4"},
                    "gpt-4-turbo": {"description": "GPT-4-Turbo is a streamlined variant of GPT-4, optimized to provide faster responses and more cost-effective usage while still delivering high-quality output. Though it retains much of GPT-4’s capabilities, GPT-4-Turbo is geared toward applications that benefit from reduced latency and budget-friendly operation. It’s suitable for tasks that require advanced language processing but can tolerate minor trade-offs in precision or depth compared to the original GPT-4.",
                                                     "link": "https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4"},
                    "gpt-4o": {"description": "GPT-4o is a multimodal model designed to process both text and image inputs, allowing for applications that benefit from combined textual and visual understanding. It’s ideal for use cases where insights from visual data need to complement language-based tasks, such as analyzing charts, understanding image context, or engaging in text-image interactive applications.",
                                                     "link": "https://platform.openai.com/docs/models#gpt-4o"},
                    "gpt-4o-mini": {"description": "GPT-4o-mini is a streamlined version of GPT-4o designed for faster performance with slightly reduced capabilities. It still supports multimodal input, making it suitable for applications requiring text and image analysis but with an emphasis on speed and efficiency over highly detailed visual analysis. GPT-4o-mini is ideal for lightweight multimodal applications where quick responses are more important than in-depth image interpretation.",
                                                     "link": "https://platform.openai.com/docs/models#gpt-4o-mini"},
                    "gpt-4o-realtime-preview": {"description": 'GPT-4o-Realtime-Preview is designed for applications requiring real-time, multimodal interactions with an emphasis on low-latency responses. This model is particularly useful for dynamic, conversational interfaces where "speech in, speech out" capabilities and immediate feedback are essential. GPT-4o-Realtime-Preview is a powerful option for interactive voice- or image-based applications, enabling seamless, responsive engagement in scenarios like virtual assistants, guided tutorials, or interactive multimedia experiences.',
                                                     "link": "https://platform.openai.com/docs/models#gpt-4o-realtime"},
                    "o1": {"description": `OpenAI's o1 model is a cutting-edge AI system designed to tackle complex, multi-step tasks with enhanced reasoning capabilities. Building upon its predecessor, o1-preview, this model is engineered to "think" more deeply before responding, enabling it to handle intricate problems across various domains. The o1 model is tailored for applications requiring advanced analytical thinking and problem-solving skills. It excels in scenarios where tasks involve multiple steps and demand a high level of reasoning.`,
                                                     "link": "https://platform.openai.com/docs/models#o1"},
                    "o1-preview": {"description": "The o1-preview model is optimized for tasks that demand complex reasoning, logical problem-solving, and deep analytical capabilities. It is designed for domains where precision and structured thinking are essential, such as coding, scientific research, mathematics, and complex technical content. While it can still perform general language tasks, o1-preview excels in specialized areas requiring a higher level of logical and structured response.",
                                                     "link": "https://platform.openai.com/docs/models#o1"},
                    "o1-mini": {"description": "o1-mini is a streamlined variant of o1-preview, designed to provide quick, structured responses with reduced processing demands. While it retains o1’s focus on logical reasoning and problem-solving, o1-mini prioritizes efficiency and speed, making it suitable for lightweight applications where rapid, analytical responses are required but without the depth and detail of o1-preview. It’s a good fit for technical applications that need basic analysis, structured output, or coding assistance at a faster pace.",
                                                     "link": "https://platform.openai.com/docs/models#o1"}};









//--------------------------------------------------------------------------------------------------
//# Functions

//AppStart                                                     
const TextGeneratorGUI = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // Check default checklist options
  document.addEventListener("DOMContentLoaded", () => {
    let checkbox = document.querySelector('input[value="gpt-3.5-turbo"]');
    checkbox.checked = true;
    checkbox = document.querySelector('input[value="0"]');
    checkbox.checked = true; 
  });

  function pause(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  function mouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  };
  
  function mouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  };

  function handlePromptChange(event) {
    parameter_dict["prompt"] = event.target.value;
    console.log("\nhandlePromptChange() -> prompt:", parameter_dict["prompt"]);
  };

  function handleInputFieldChange(event) {
    console.log('\nTextGeneratorGUI >>> RUNNING handleInputFieldChange()');
    
    let parameter_name = event.target.id.split('inputField_')[1];
    console.log('handleInputFieldChange() -> Changing ' + parameter_name + ' to ' + event.target.value);

    if (parameter_name.includes('logit_bias')) { 
      parameter_dict['logit_bias'][Number(parameter_name.split(':')[1])] = event.target.value
    } else {
      parameter_dict[parameter_name] = event.target.value;
    };    
  };

  async function handleModelChange(event) {
    const selected_model = event.target.value;
    const model_short_name = event.target.alt;

    console.log("handleModelChange() -> Selected Model:", selected_model);
    
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
        title_element.innerHTML = `<u><b>` + model_short_name + `</b></u>`;
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

  async function handleMaxTokensChange(event) {
    console.log('\nTextGeneratorGUI >>> RUNNING handleMaxTokensChange()');
    let selected_size, checkbox_element, checked_value;
    if (event.value) {
      selected_size = event.value;
      checkbox_element = event;
      checked_value = event.checked;
    } else {
      selected_size = event.target.value;
      checkbox_element = document.getElementById('maxTokensCheckbox_' + selected_size);
      checked_value = event.target.checked;
    };
    
    parameter_dict["max_tokens"] = selected_size;
    let selected_size_value;
    if (selected_size.includes('custom')) {
      selected_size_value = document.getElementById('maxTokensInput_' + selected_size).value;
    } else {
      selected_size_value = selected_size;
    };
    if (selected_size_value === '0') {
      selected_size_value = 'No Limit';
    };
    console.log("handleMaxTokensChange() -> Selected Size:", selected_size);
    console.log("handleMaxTokensChange() -> Selected Size VALUE:", selected_size_value);
    

    // Sets the size to the default size if all size checkboxes are turned off
    const selected_sizes = await getCheckedValues('size');
    if (selected_sizes.length === 0) {
      checkbox_element.checked = true;
    } else {
      const all_models = await getAllChecklistOptions('model');

      all_models.forEach((model) => {
        const model_output_container = document.getElementById('modelOutputContainer_' + model);
        if (checked_value) {
          const new_size_container = document.createElement('div');
          new_size_container.id = 'sizeContainer_' + model + '_' + selected_size;
          
          const new_title_element = document.createElement("span");
          new_title_element.id = 'sizeContainerTitle_' + model + '_' + selected_size;
          new_title_element.className = 'textGeneratorGUIimageOutputSizeTitle';
          if (selected_size.includes('custom')) {
            new_title_element.textContent = "Custom # of Words: " + selected_size_value.toString();
          } else {
            new_title_element.textContent = "# of Words: " + selected_size_value.toString();
          };
          new_size_container.appendChild(new_title_element);

          const new_text_output_container = document.createElement('div');
          new_text_output_container.className = 'textGeneratorGUItextOutputContainer';
          new_text_output_container.id = 'textOutputContainer_' + model + '_' + selected_size;

          for (let j = 0; j < parameter_dict["quantity"]; j++) {
            // Create the text element
            const new_text_element = document.createElement('div');
            // new_text_element.innerHTML = '';
            if (j === 0) {
              new_text_element.id = 'generatedText_' + model + '_' + selected_size;
            } else {
              new_text_element.id = 'generatedText_' + model + '_' + selected_size + '_' + j.toString();
            };
            new_text_element.className = 'textGeneratorGUIgeneratedText';
            if (!mobile) {
              new_text_element.style.width = (100 / parameter_dict['quantity']).toString() + "%";
            };

            // Create the image element
            const new_image_element = document.createElement('img');
            new_image_element.src = default_image;
            new_image_element.alt = "Click to Copy URL";
            if (j === 0) {
              new_image_element.id = 'generatedImage_' + model + '_' + selected_size;
            } else {
              new_image_element.id = 'generatedImage_' + model + '_' + selected_size + '_' + j.toString();
            };
            new_image_element.className = 'textGeneratorGUIgeneratedImage';
            if (!mobile) {
              // The first value, .40, comes from the CSS in textGeneratorGUIgeneratedImage 
              new_image_element.style.width = (.40 * (100 / parameter_dict['quantity'])).toString() + "%";
            };

            // Combine the elements
            new_text_element.appendChild(new_image_element);
            new_text_output_container.appendChild(new_text_element);
          };
          new_size_container.appendChild(new_text_output_container);
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
    console.log('\nTextGeneratorGUI >>> RUNNING handleDropdownChange()');
    const element_ID = event.target.id;
    const new_value = event.target.value;
    if (element_ID === "dropdownQuantity") {
      const all_models = await getAllChecklistOptions('model');
      const all_sizes = await getCheckedValues('size');
      const all_outputs_container = document.getElementById('textGeneratorGUIallOutputContainer');
      // On desktop, stretches image output view beyond limits of UI while maintaining image size
      if (!mobile) {
        let new_container_width;
        if (new_value > 2) {
          new_container_width = (50 + (new_value - 2) * (50 / 2));
          new_container_width = Math.min(new_container_width, 96);
          // all_outputs_container.style.marginLeft = (-2 * (new_value - 2)).toString() + '%';
        } else {
          new_container_width = 50.5;
          // all_outputs_container.style.marginLeft = "0%";
        };
        all_outputs_container.style.width = new_container_width.toString() + "%";
      };
      let text_container, model_name, size;
      for (let i = 0; i < all_models.length; i++) {
        model_name = all_models[i];
        for (let k = 0; k < all_sizes.length; k++) {
          size = all_sizes[k];
          text_container = document.getElementById('textOutputContainer_' + model_name + '_' + size.toString());
          // Adds new text and image elements if the quantity was increased
          if (new_value > parameter_dict["quantity"]) {
            for (let j = parameter_dict["quantity"]; j < new_value; j++) {
              const new_text_element = document.createElement('div');
              new_text_element.id = 'generatedText_' + model_name + '_' + size.toString() + '_' + j.toString();
              new_text_element.className = 'textGeneratorGUIgeneratedText';

              const new_image_element = document.createElement('img');
              new_image_element.src = default_image;
              new_image_element.id = 'generatedImage_' + model_name + '_' + size.toString() + '_' + j.toString();
              new_image_element.className = 'textGeneratorGUIgeneratedImage';

              new_text_element.appendChild(new_image_element);
              text_container.appendChild(new_text_element);
            };
          // Removes extra img elements if the quantity is reduced
          } else if (new_value < parameter_dict["quantity"]) {
            for (let j = parameter_dict["quantity"] - (parameter_dict["quantity"] - new_value); j < parameter_dict["quantity"]; j++) {
              const text_element = document.getElementById('generatedText_' + model_name + '_' + size.toString() + '_' + j.toString());
              text_element.remove();
            };
          };
          // Sets the sizes of the sizes of the img elements to match the quantity
          for (let k = 0; k < new_value; k++) {
            let new_width = "100%";
            if (!mobile) {
              new_width = (100 / new_value).toString() + "%";
            };
            
            // const new_width = (100 / new_value).toString() + "%";
            let text_element;
            if (k === 0) {
              text_element = document.getElementById('generatedText_' + model_name + '_' + size);
              text_element.style.width = new_width;
            } else {
              text_element = document.getElementById('generatedText_' + model_name + '_' + size + '_' + k.toString());
            };
            if (text_element) {
              text_element.style.width = new_width;
            } else {
              console.log('text_element not found');
              console.log('generatedText_' + model_name + '_' + size.toString() + '_' + k.toString());
            };
          };
        };
      };

      parameter_dict["quantity"] = new_value;
    } else if (element_ID.includes('custom')) {
      const custom_input_ID = element_ID.split('maxTokensInput_')[1];
      const checkbox_element = document.getElementById('maxTokensCheckbox_' + custom_input_ID);
      if (new_value) {
        if (checkbox_element.checked) {
          const checked_models = await getCheckedValues('model');
          checked_models.forEach((model) => {
            document.getElementById('sizeContainerTitle_' + model + '_' + custom_input_ID).textContent = 'Custom # of Words: ' + new_value;
          });          
        } else {
          checkbox_element.checked = true;
          await handleMaxTokensChange(checkbox_element);
        }
      } else {
        checkbox_element.checked = false;
        await handleMaxTokensChange(checkbox_element);
      };
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
      document.getElementById('pauseButton').style.opacity = '1';
      await setGenerationTime(0);

      const checked_models = await getCheckedValues('model');
      const checked_sizes = await getCheckedValues('size');
      parameter_dict = await updateParameterDict();

      for (let i = 0; i < checked_models.length; i++) {
        parameter_dict["model"] = checked_models[i];

        for (let j = 0; j < checked_sizes.length; j++) {
          parameter_dict["max_tokens"] = checked_sizes[j];
          console.log('parameter_dict["max_tokens"]', parameter_dict["max_tokens"]);
          console.log("checked_sizes[j]", checked_sizes[j])
          console.log(parameter_dict);
          parameter_dict["max_tokens"] = checked_sizes[j];
          console.log('parameter_dict["max_tokens"]', parameter_dict["max_tokens"]);
          console.log("checked_sizes[j]", checked_sizes[j])
          console.log(parameter_dict);

          for (let output_ID = 0; output_ID < parameter_dict["quantity"]; output_ID++) {
            console.log('output_ID', output_ID);
            generated_text = await handleTextGeneration(parameter_dict, output_ID);
            console.log("generated_text:", generated_text);
          };
        };
      };
      console.log('handleSubitClick() -> Text Generation Complete!');
      document.getElementById('pauseButton').style.opacity = '0';
    };
  };


  async function handleTextGeneration(parameter_dict, output_ID) {
    console.log('\nTextGeneratorGUI >>> RUNNING handleTextGeneration()');
    
    console.log('parameter_dict:', parameter_dict);
    console.log('output_ID:', output_ID);
    const model = parameter_dict["model"];
    console.log('Model Currently Generating:', model);

    // Handle custom length inputs
    const size = parameter_dict["max_tokens"].toString();
    if (parameter_dict["max_tokens"].includes('custom')) {
      parameter_dict["max_tokens"] = document.getElementById('maxTokensInput_' + parameter_dict["max_tokens"]).value; 
    };

    // Page element setup
    var model_title_element = document.getElementById('textTitle_' + parameter_dict["model"]);
    var model_short_name = model_title_element.innerHTML;
    var text_element;
    if (output_ID === 0) {
      console.log('text_element:', 'generatedText_' + model + '_' + size);
      text_element = document.getElementById('generatedText_' + model + '_' + size);
    } else {
      text_element = document.getElementById('generatedText_' + model + '_' + size + '_' + output_ID.toString());
    };
    console.log('text_element', 'generatedText_' + model + '_' + size + '_' + output_ID.toString());

    var image_element;
    if (output_ID === 0) {
      image_element = document.getElementById('generatedImage_' + model + '_' + size);
    } else {
      image_element = document.getElementById('generatedImage_' + model + '_' + size + '_' + output_ID.toString());
    };
    console.log('image_element', 'generatedImage_' + model + '_' + size + '_' + output_ID.toString());

    // On the 2nd "Generate" click, the image elements are removed, so they must be added back
    if (!image_element) {
      text_element.innerHTML = '';

      image_element = document.createElement('img');
      image_element.src = generating_placeholder_0;
      if (output_ID === 0) {
        image_element.id = 'generatedImage_' + model + '_' + size;
      } else {
        image_element.id = 'generatedImage_' + model + '_' + size + '_' + output_ID.toString();
      };
      image_element.className = 'textGeneratorGUIgeneratedImage';
      if (!mobile) {
        image_element.style.width = (100 / parameter_dict['quantity']).toString() + "%";
      };

      text_element.appendChild(image_element);
    }

    model_title_element.innerHTML = model_short_name + " Generating";
    image_element.src = generating_placeholder_0;
    
    // text generation
    let text_generator_response, text_generator_promise, text_generator_result;

    text_generator_response = text_generator.generateText(parameter_dict);
    // BUG FIX - resetting the parameter_dict back to the text version of the size prevents errors when
    //           the quantity is above 1 and a custom size is being generated
    parameter_dict["max_tokens"] = size;

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
          model_title_element.innerHTML = model_short_name + " Generating";
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
          if (typeof result === 'string') {
            if (result === 'error') {
              // image_element.src = generation_failed_placeholder;
              loop = false;
              image_element.src = generation_failed_placeholder
            } else {
              image_element.src = loading_placeholder;
              loop = false;
              text_generator_result = result;
            };
          };
        });
        console.log('promise', text_generator_promise);
      };
    };

    console.log('text_generator_response', text_generator_response);
    console.log('text_generator_response[generated_text]', text_generator_response['generated_text']);

    generated_text = text_generator_result;
    if (generated_text) {
      text_element.innerHTML = generated_text;
    };
    model_title_element.innerHTML = model_short_name;
  
    return(generated_text);
  };


  async function displayImage(image_element, new_image) {
    console.log('\nTextGeneratorGUI >>> RUNNING displayImage()');
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
    console.log('\nTextGeneratorGUI >>> RUNNING updateParameterDict()');
    parameter_dict["quantity"] = document.getElementById("dropdownQuantity").value;
    parameter_dict["prompt"] = document.getElementById("promptEntry").value;
    parameter_dict['temperature'] = document.getElementById("inputField_temperature").value;
    parameter_dict['top_p'] = document.getElementById("inputField_top_p").value;
    parameter_dict['frequency_penalty'] = document.getElementById("inputField_frequency_penalty").value;
    parameter_dict['presence_penalty'] = document.getElementById("inputField_presence_penalty").value;
    parameter_dict['logit_bias'][default_logit_bias] = document.getElementById("inputField_logit_bias:" + default_logit_bias.toString()).value;
    parameter_dict['logit_bias'][-default_logit_bias] = document.getElementById("inputField_logit_bias:-" + default_logit_bias.toString()).value;
    parameter_dict['stop'] = document.getElementById("inputField_stop").value;
    // parameter_dict["max_tokens"] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['model'] = document.getElementById("inferenceStepsEntry").value;
    // parameter_dict['provider'] = document.getElementById("inferenceStepsEntry").value;
    return(parameter_dict);
  };


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












//--------------------------------------------------------------------------------------------------
//# HTML

  return (
    <div className='textGeneratorGUI' id="anchorElement">
      <div className='textGeneratorGUITextContainer textGeneratorGUIpromptContainer'>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={11 * delay_gap} data-aos="fade-right">
          Enter Prompt:
        </div>
        {/* <input value={mobile ? "Copy Simplifier" : "Copy Simplifier Prefix"} className="textGeneratorGUIsubmitButton textGeneratorGUIfloatRightButton" id="copySimplifierPrefixButton" type="button" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/> */}
      </div>
      <textarea className='textGeneratorGUIpromptEntry' id='promptEntry' onChange={handlePromptChange} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
        data-aos-delay={12 * delay_gap} data-aos="zoom-in"
        placeholder="Your prompt here..." required/>
      {/* <div className='textGeneratorGUITextContainer textGeneratorGUIpromptContainer'>
        <div className='textGeneratorGUITitle textGeneratorGUIcopyNegativePromptTitle' data-aos="fade-right" data-aos-delay={11 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Negative Prompt:
        </div>
        <input value={mobile ? "Copy Default" : "Copy Default Negative Prompt"} className="textGeneratorGUIsubmitButton textGeneratorGUIfloatRightButton" id="copyNegativePromptButton" type="button" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div>
      <textarea id='negativePromptEntry' className='textGeneratorGUIpromptEntry textGeneratorGUInegativePromptEntry' data-aos="fade-right" data-aos-delay={12 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onChange={handleNegativePromptChange}
        placeholder={"Your negative prompt here..."} required/> */}
      <div className='textGeneratorGUITextContainer'>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={13 * delay_gap} data-aos="fade-right">
          Select Model(s):
        </div>
      </div>
      <div className='textGeneratorGUIchecklist' id='checklistModels' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
        data-aos-delay={14 * delay_gap} data-aos="zoom-in">
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="GPT 3.5 Turbo" value="gpt-3.5-turbo" onChange={handleModelChange} />
          GPT 3.5 Turbo
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="GPT 4" value="gpt-4" onChange={handleModelChange} />
          GPT 4
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="GPT 4 Turbo" value="gpt-4-turbo" onChange={handleModelChange} />
          GPT 4 Turbo
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="GPT 4o" value="gpt-4o" onChange={handleModelChange} />
          GPT 4o
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="GPT 4o Mini" value="gpt-4o-mini" onChange={handleModelChange} />
          GPT 4o Mini
        </label>
        {/* <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="GPT 4o Realtime Preview" value="gpt-4o-realtime-preview" onChange={handleModelChange} />
          GPT 4o Realtime Preview
        </label> */}
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="o1" value="o1" onChange={handleModelChange} />
          o1
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="o1 Preview" value="o1-preview" onChange={handleModelChange} />
          o1 Preview
        </label>
        <label className="textGeneratorGUImodelOption">
          <input type="checkbox" alt="o1 Mini" value="o1-mini" onChange={handleModelChange} />
          o1 Mini
        </label>
      </div>
      <div className='textGeneratorGUITextContainer'>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={15 * delay_gap} data-aos="fade-right">
          Model Description:
        </div>
      </div>
      <div className="textGeneratorGUITextContainer" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
        data-aos-delay={17 * delay_gap} data-aos="zoom-in">
        <div className='textGeneratorGUImodelDescription' id='modelDescriptionTitle'>
          <u><b>GPT 3.5 Turbo</b></u>
        </div>
        <div className='textGeneratorGUImodelDescription' id='modelDescription'>
          GPT-3.5-turbo is optimized for general-purpose conversational applications and tasks requiring text generation, including question answering, summarization, language translation, and more. As the default model in OpenAI’s ChatGPT API, it’s specifically engineered for balanced performance, cost-effectiveness, and high-quality output, making it versatile and suitable for both commercial and experimental use.
        </div>
        <a href="https://platform.openai.com/docs/models#gpt-3-5-turbo" target='_blank' rel="noreferrer" className='textGeneratorGUImodelLink' id='modelLink'>
          <u>Learn More -></u>
        </a>
      </div>
      <div className='textGeneratorGUITextContainer'>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={18 * delay_gap} data-aos="fade-right">
          Maximum # of Words:
        </div>
      </div>
      <div className='textGeneratorGUIchecklist' id='checklistSizes' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
        data-aos-delay={19 * delay_gap} data-aos="zoom-in">
        {/* <label className="textGeneratorGUIsizeOption">
          <input type="checkbox" value="256x256" onChange={handleMaxTokensChange} />
          256x256
        </label> */}
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_0'>
          <input type="checkbox" value="0" id='maxTokensCheckbox_0' onChange={handleMaxTokensChange}/>
          None
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_50'>
          <input type="checkbox" value="50" id='maxTokensCheckbox_50' onChange={handleMaxTokensChange} />
          50
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_100'>
          <input type="checkbox" value="100" id='maxTokensCheckbox_100' onChange={handleMaxTokensChange} />
          100
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_200'>
          <input type="checkbox" value="200" id='maxTokensCheckbox_200' onChange={handleMaxTokensChange} />
          200
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_500'>
          <input type="checkbox" value="500" id='maxTokensCheckbox_500' onChange={handleMaxTokensChange} />
          500
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_custom_1'>
          <input type="checkbox" value="custom_1" id='maxTokensCheckbox_custom_1' onChange={handleMaxTokensChange}/>
          Custom Length 1:&nbsp;
          <input id='maxTokensInput_custom_1' className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' placeholder="" onChange={handleDropdownChange} required/>
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_custom_2'>
          <input type="checkbox" value="custom_2" id='maxTokensCheckbox_custom_2' onChange={handleMaxTokensChange}/>
          Custom Length 2:&nbsp;
          <input id='maxTokensInput_custom_2' className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' placeholder="" onChange={handleDropdownChange} required/>
        </label>
        <label className="textGeneratorGUImaxTokensOption" id='maxTokensContainer_custom_3'>
          <input type="checkbox" value="custom_3" id='maxTokensCheckbox_custom_3' onChange={handleMaxTokensChange}/>
          Custom Length 3:&nbsp;
          <input id='maxTokensInput_custom_3' className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' placeholder="" onChange={handleDropdownChange} required/>
        </label>
      </div>
      <div className='textGeneratorGUITextContainer'>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={20 * delay_gap} data-aos="fade-right">
          # of Ouputs (per model):
        </div>
        <select className='textGeneratorGUIdropdownList' id='dropdownQuantity' onChange={handleDropdownChange} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={21 * delay_gap}data-aos="fade-right">
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
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={22 * delay_gap} data-aos="fade-right">
          Creativity:
        </div>
        <div className='textGeneratorGUIrow'>
          <input className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' id='inputField_temperature' onChange={handleInputFieldChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={23 * delay_gap} data-aos="fade-right"
            placeholder=""
          />
          <div className='textGeneratorGUIhelperText' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={23 * delay_gap} data-aos="fade-left">
            (0 to 2)
          </div>
        </div>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={24 * delay_gap} data-aos="fade-right">
          Linguistic Freedom:
        </div>
        <div className='textGeneratorGUIrow'>
          <input className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' id='inputField_top_p' onChange={handleInputFieldChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={25 * delay_gap} data-aos="fade-right"
            placeholder=""
          />
          <div className='textGeneratorGUIhelperText' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={25 * delay_gap} data-aos="fade-left">
            (0 to 1)
          </div>
        </div>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={26 * delay_gap} data-aos="fade-right">
          Vocabulary Variety:
        </div>
        <div className='textGeneratorGUIrow'>
          <input className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' id='inputField_frequency_penalty' onChange={handleInputFieldChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={27 * delay_gap} data-aos="fade-right"
            placeholder=""
          />
          <div className='textGeneratorGUIhelperText' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={27 * delay_gap} data-aos="fade-left">
            (-2 to 2)
          </div>
        </div>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={28 * delay_gap} data-aos="fade-right">
          Topic Variety:
        </div>
        <div className='textGeneratorGUIrow'>
          <input className='textGeneratorGUIpromptEntry textGeneratorGUInumberEntry' id='inputField_presence_penalty' onChange={handleInputFieldChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={29 * delay_gap} data-aos="fade-right"
            placeholder=""
          />
          <div className='textGeneratorGUIhelperText' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={29 * delay_gap} data-aos="fade-left">
            (-2 to 2)
          </div>
        </div>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={30 * delay_gap} data-aos="fade-right">
          Force Word:
        </div>
        <div className='textGeneratorGUIrow'>
          <input className='textGeneratorGUIpromptEntry textGeneratorGUIwordEntry' id={'inputField_logit_bias:' + default_logit_bias.toString()} onChange={handleInputFieldChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            placeholder=""
            data-aos-delay={31 * delay_gap} data-aos="fade-right"
          />
        </div>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={32 * delay_gap} data-aos="fade-right">
          Avoid Word:
        </div>
        <div className='textGeneratorGUIrow'>
          <input className='textGeneratorGUIpromptEntry textGeneratorGUIwordEntry' id={'inputField_logit_bias:-' + default_logit_bias.toString()} onChange={handleInputFieldChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            placeholder=""
            data-aos-delay={33 * delay_gap} data-aos="fade-right"
          />
        </div>
        <div className='textGeneratorGUITitle' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={34 * delay_gap} data-aos="fade-right">
          Cut-off Word:
        </div>
        <div className='textGeneratorGUIrow'>
          <input className='textGeneratorGUIpromptEntry textGeneratorGUIwordEntry' id='inputField_stop' onChange={handleInputFieldChange} required data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={35 * delay_gap} data-aos="fade-right"
            placeholder=""
          />
          {/* <div className='textGeneratorGUIhelperText'>(-2 to 2)</div> */}
        </div>
        <input className="textGeneratorGUIsubmitButton" id="generateTextButton" type="submit" onClick={handleSubmitClick} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
          data-aos-delay={36 * delay_gap} data-aos="fade-right"
          value="Generate"
        />
      </div>
      {/* <div className='textGeneratorGUITextContainer'>
        <div id='textTitle' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={18 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
          Generated Text:
        </div>
      </div>
      <div className='textGeneratorGUImodelDescription' id='textOutput' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">...</div>
      <div className='textGeneratorGUITextContainer'>
        <input value="Generate" className="textGeneratorGUIsubmitButton" id="generateImageButton" type="submit" data-aos="fade-right" data-aos-delay={20 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement" onClick={handleSubmitClick}/>
      </div> */}
      <div className='banner_textGeneratorGUI' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
        data-aos-delay={37 * delay_gap} data-aos="zoom-out">
        <div className='banner_textGeneratorGUITitleContainer' id='banner_textGeneratorGUITitleContainer'>
          <span className='banner_textGeneratorGUITitle' id="banner_textGeneratorGUITitleContainer" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
            data-aos-delay={38 * delay_gap} data-aos="zoom-in">
            Text Outputs
          </span>
          {/* <span className='banner_textGeneratorGUISubTitle' id="banner_textGeneratorGUITitleContainer" data-aos="zoom-in" data-aos-delay={3 * delay_gap} target="_blank">@EvanOnEarth_eth</span> */}
        </div>
      </div>
      <div className='textGeneratorGUIgenerationTimeContainer ' id='generationTimeContainer'>
        <div className='textGeneratorGUIrow'>
          <div className='textGeneratorGUITitle'>
            Generation Time:
          </div>
          <input className='textGeneratorGUIpromptEntry textGeneratorGUInumberDisplay' id='generationTime' value="0:00" readOnly/>
        </div>
        <input className="textGeneratorGUIsubmitButton textGeneratorGUIpauseButton" value="Pause" id="pauseButton" type="button" onClick={handleSubmitClick}/>
      </div>
      <div className="textGeneratorGUIallOutputContainer" id="textGeneratorGUIallOutputContainer">
        {/* gpt-3.5-turbo */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-3.5-turbo">
          <div className="textGeneratorGUImodelTitleContainer">
            <div className='textGeneratorGUITitle' id='textTitle_gpt-3.5-turbo' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
              data-aos-delay={39 * delay_gap} data-aos="fade-right">
              GPT 3.5 Turbo:
            </div>
            {/* <span className="textGeneratorGUIcopiedMessage" id="copiedMessage_gpt-3.5-turbo">Image URL Copied!</span> */}
          </div>
          <div id="sizeContainer_gpt-3.5-turbo_0">
            <div className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_gpt-3.5-turbo_0" data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
              data-aos-delay={40 * delay_gap} data-aos="fade-right">
              No Word Limit
            </div>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_gpt-3.5-turbo_0">
              <div className='textGeneratorGUIgeneratedText' id='generatedText_gpt-3.5-turbo_0' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
              data-aos-delay={41 * delay_gap} data-aos="zoom-in">
                  <img className='textGeneratorGUIgeneratedImage' id='generatedImage_gpt-3.5-turbo_0' alt='' data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement"
                    data-aos-delay={42 * delay_gap} data-aos="zoom-in"
                    src={image_URL}
                  />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4 */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4" style={{display: "none"}}>
          <div className="textGeneratorGUImodelTitleContainer">
            <div id='textTitle_gpt-4' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4:
            </div>
          </div>
          <div id="sizeContainer_gpt-4_0">
            <span className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_gpt-4_0">
              No Word Limit
            </span>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_gpt-4_0">
              <div className='textGeneratorGUIgeneratedText' id='generatedText_gpt-4_0' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
                <img src={image_URL} alt='' id='generatedImage_gpt-4_0' className='textGeneratorGUIgeneratedImage'/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4-turbo */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4-turbo" style={{display: "none"}}>
          <div className="textGeneratorGUImodelTitleContainer">
            <div id='textTitle_gpt-4-turbo' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4 Turbo:
            </div>
          </div>
          <div id="sizeContainer_gpt-4-turbo_0">
            <span className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_gpt-4-turbo_0">
              No Word Limit
            </span>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_gpt-4-turbo_0">
              <div className='textGeneratorGUIgeneratedText' id='generatedText_gpt-4-turbo_0' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
                <img src={image_URL} alt='' id='generatedImage_gpt-4-turbo_0' className='textGeneratorGUIgeneratedImage'/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4o */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4o" style={{display: "none"}}>
          <div className="textGeneratorGUImodelTitleContainer">
            <div id='textTitle_gpt-4o' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4o:
            </div>
            <span className="textGeneratorGUIcopiedMessage" id="copiedMessage_gpt-4o">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_gpt-4o_0">
            <span className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_gpt-4o_0">
              No Word Limit
            </span>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_gpt-4o_0">
              <div className='textGeneratorGUIgeneratedText' id='generatedText_gpt-4o_0' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
                <img src={image_URL} alt='' id='generatedImage_gpt-4o_0' className='textGeneratorGUIgeneratedImage'/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4o-mini */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4o-mini" style={{display: "none"}}>
          <div className="textGeneratorGUImodelTitleContainer">
            <div id='textTitle_gpt-4o-mini' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4o Mini:
            </div>
          </div>
          <div id="sizeContainer_gpt-4o-mini_0">
            <span className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_gpt-4o-mini_0">
              No Word Limit
            </span>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_gpt-4o-mini_0">
              <div className='textGeneratorGUIgeneratedText' id='generatedText_gpt-4o-mini_0' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">    
                <img src={image_URL} alt='' id='generatedImage_gpt-4o-mini_0' className='textGeneratorGUIgeneratedImage'/>
              </div>
            </div>
          </div>
        </div>
        {/* gpt-4o-realtime-preview */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_gpt-4o-realtime-preview" style={{display: "none"}}>
          <div className="textGeneratorGUImodelTitleContainer">
            <div id='textTitle_gpt-4o-realtime-preview' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              GPT 4o Realtime Preview:
            </div>
            <span className="textGeneratorGUIcopiedMessage" id="copiedMessage_gpt-4o-realtime-preview">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_gpt-4o-realtime-preview_0">
            <span className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_gpt-4o-realtime-preview_0">
              No Word Limit
            </span>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_gpt-4o-realtime-preview_0">
              <div className='textGeneratorGUIgeneratedText' id='generatedText_gpt-4o-realtime-preview_0' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
                <img src={image_URL} alt='' id='generatedImage_gpt-4o-realtime-preview_0' className='textGeneratorGUIgeneratedImage'/>
              </div>
            </div>
          </div>
        </div>
        {/* o1 */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_o1" style={{display: "none"}}>
          <div className="textGeneratorGUImodelTitleContainer">
            <div id='textTitle_o1' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              o1:
            </div>
            <span className="textGeneratorGUIcopiedMessage" id="copiedMessage_o1">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_o1_0">
            <span className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_o1_0">
              No Word Limit
            </span>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_o1_0">
              <div className='textGeneratorGUIgeneratedText' id='generatedText_o1_0' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
                <img src={image_URL} alt='' id='generatedImage_o1_0' className='textGeneratorGUIgeneratedImage'/>
              </div>
            </div>
          </div>
        </div>
        {/* o1-preview */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_o1-preview" style={{display: "none"}}>
          <div className="textGeneratorGUImodelTitleContainer">
            <div id='textTitle_o1-preview' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              o1 Preview:
            </div>
            <span className="textGeneratorGUIcopiedMessage" id="copiedMessage_o1-preview">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_o1-preview_0">
            <span className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_o1-preview_0">
              No Word Limit
            </span>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_o1-preview_0">  
              <div className='textGeneratorGUIgeneratedText' id='generatedText_o1-preview_0' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
                <img src={image_URL} alt='' id='generatedImage_o1-preview_0' className='textGeneratorGUIgeneratedImage'/>
              </div>
            </div>
          </div>
        </div>
        {/* o1-mini */}
        <div className='textGeneratorGUImodelOutputContainer' id="modelOutputContainer_o1-mini" style={{display: "none"}}>
          <div className="textGeneratorGUImodelTitleContainer">
            <div id='textTitle_o1-mini' className='textGeneratorGUITitle' data-aos="fade-right" data-aos-delay={22 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
              o1-mini:
            </div>
            <span className="textGeneratorGUIcopiedMessage" id="copiedMessage_o1-mini">Image URL Copied!</span>
          </div>
          <div id="sizeContainer_o1-mini_0">
            <span className="textGeneratorGUIimageOutputSizeTitle" id ="sizeContainerTitle_o1-mini_0">
              No Word Limit
            </span>
            <div className="textGeneratorGUItextOutputContainer" id="textOutputContainer_o1-mini_0">  
              <div className='textGeneratorGUIgeneratedText' id='generatedText_o1-mini_0' data-aos="fade-right" data-aos-delay={19 * delay_gap} data-aos-anchor-placement="top-center" data-aos-anchor="#anchorElement">
                <img src={image_URL} alt='' id='generatedImage_o1-mini_0' className='textGeneratorGUIgeneratedImage'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextGeneratorGUI
