// Requirements
const openai = require('./oaiConfig');

// Generate Image
const generateImage = async(req, res) => {
    const userPrompt = req.body.prompt;
    const imgSize = req.body.size;
    const imageDim = getImgDimensions(imgSize);

    console.log(req.body);

    try {
        const response = await openai.createImage({
            prompt: userPrompt,
            n: 1,
            size: imageDim
        });

        const imageUrl = response.data.data[0].url;
        console.log("OAI: Success");
        
        res.status(200).json({
            success: true,
            data: imageUrl,
        });

    } catch (error) {
        if(error.response){
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            requestBody: req.body,
            error: 'The image could not be generated',
            errorDetails: error.response.data,
        });
    }
};

function getImgDimensions(imgSize){
    switch(imgSize){
        case 'small':
            return '256x256';
        case 'medium': 
            return '512x512';
        case 'large':
            return '1024x1024';
        default:
            return '-1';
    }
};

module.exports = generateImage;

