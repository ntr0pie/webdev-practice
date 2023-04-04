function onFormSubmit(event)
{
    event.preventDefault();

    const prompt = document.querySelector("#prompt").value;
    const size = document.querySelector("#size").value;

    if(prompt === '')
    {
        alert('Please add a valid prompt');
        return;
    }

    generateImageRequest(prompt, size);

}

async function generateImageRequest(prompt, size)
{

    const opMsg = document.getElementById('output-message');
    const opImg = document.getElementById('output-image');


    try {
        const response = await fetch('/openai/generateImage', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({prompt, size})
            });
        
        if(!response.ok)
        {
            throw new Error("The image couldn't be generated"); 
        }

        const data = await response.json();
        const imageUrl = data.data; 

        opMsg.textContent = 'Image generated'
        opImg.src = imageUrl


    } catch (error) {
        opMsg.textContent = error;
        opImg.src = 'https://i.imgur.com/iGHeAqD.png'
    }
}

const inputForm = document.querySelector('.input-form')
inputForm.addEventListener('submit', onFormSubmit)