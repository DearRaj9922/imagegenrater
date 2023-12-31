import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt} from '../utils';
import { FormField, Loader } from '../components';

import { download } from '../assets';
import { downloadImage } from '../utils';


const CreatePost = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  //  a=true; 

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generatImage=()=>{
    if(form.prompt){
      try {
        // setGeneratingImg(true);
        async function query(data) {
          setGeneratingImg(true);
          const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
              headers: { 
                "Accept": "image/png",
                "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                "Content-Type": "application/json" 
              },
              method: "POST",
              body: JSON.stringify(data),
            }
          );

          const result = await response.blob();
          return result;
        }
        query({"inputs":form.prompt}).then((blob) => {
          // setForm({...form,photo:`data:image/png;base64,${data.photo}`})
              // Create an img element
          const img = document.createElement('img');

          // Create a blob URL for the image data
          const imgUrl = URL.createObjectURL(blob);

          // Set the src attribute of the img element to the blob URL
          img.src = imgUrl;


        // Update the state with the img element
        setForm({ ...form, photo:imgUrl });
        });
        // setGeneratingImg(false);

      } catch (error) {
        alert(error);
      }finally{
        // {form.photo?(setGeneratingImg(false)):(setGeneratingImg(true))}
        setGeneratingImg(false);
      }
    }
    else{
      alert('Please enter a valid prompt');
    
    }
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);

      try {
        const response = await fetch(
          "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
          {
            headers: { 
              "Accept": "image/png",
              "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
              "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify(form),
          })

          await response.json();
          navigate('/');
      } catch (error) {
        alert(err)
      }finally{
        setLoading(false);
      
      }
    }
    else{
      alert("please fill all fields");
    
    }
  }
const handleChange=(e)=>{
  setForm({...form, [e.target.name]:e.target.value})
}

const handleSurpriseMe=()=>{
  const randomPrompt=getRandomPrompt(form.prompt);
  setForm({...form,prompt:randomPrompt})
}
  return (
    <section className="max-w-7xl mx-auto">
            <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through AI and share it with the community</p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., Dear Raj"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo?(
              <img
              src={form.photo}
              alt={form.prompt}
              id='previewImage'
              className='w-full h-full object-contain'
              />
              
            ):(
              <img
              src={preview}
              alt="preview"
              id='previewImage'
              className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader/>
                </div>
            )}
          </div>
          </div>

          <div className='mt-5 flex gap-5'>
            <button
            type="button"
            onClick={generatImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {generatingImg ? 'Generating...':'Generate'}
            </button>
          </div>
          <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>
              Once you have created the image you want,you can share it with others in the community
            </p>
            <button
            type="submit"
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {loading ? 'Sharing...':'Share with the community'}
            </button>
          </div>
      </form>
    </section>
  )
}

export default CreatePost
