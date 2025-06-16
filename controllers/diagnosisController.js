import axios from "axios";


export const getDiagnosis = async(req,res)=>{
    const {message} = req.body

    if(!message){
        res.status(400).json({message:"No Prompt Found"})
    }else{
        try {
            const response = await axios.post(
              "https://openrouter.ai/api/v1/chat/completions",
              {
                model: "openai/gpt-3.5-turbo",
                messages: [
                  {
                    role: "system",
                    content:
                      "You are a veterinary assistant. When given pet symptoms, respond with possible conditions and detailed advice, what could be wrong most probably and what precautions to take. Keep it concise and professional and generate a message what should they convey when they show their pet to a vet.",
                  },
                  {
                    role: "user",
                    content: message,
                  },
                ],
                temperature: 0.6,
                max_tokens: 150,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                  "HTTP-Referer": "http://localhost:5173", // or your deployed frontend URL
                  "X-Title": "VetMate AI",
                },
              }
            );

            const aiReply = response.data.choices[0].message.content
            res.status(200).json({result:aiReply,message:"Fetched successfully"})
            
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message:error.message})
            
            
        }
    }

}