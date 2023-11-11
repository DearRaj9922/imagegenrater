import {surpriseMePrompts} from "../constants";

export function getRandomPrompt(prompt){
const randomlndex = Math. floor(Math.random() *
surpriseMePrompts. length) ;
const randomPrompt = surpriseMePrompts[randomlndex];

if(randomPrompt ===prompt) return getRandomPrompt(prompt);

return randomPrompt;
}

export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`downlaod-${_id}.jpg`);
}