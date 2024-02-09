import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


const basePromptPrefix =
  "This is a chat related to Aeternity Blockchain. You Only need to answer the questions related to Aeternity Blockchain. You are allowed to write Aeternity smart contracts. Refuse to answer the Questions not related to Aeternity Blockchain.";

const generateAction = async (req, res) => {
  try {
    const baseCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `${basePromptPrefix}${req.body.usrInput}` }],
      model: 'gpt-3.5-turbo',
    });

    res.status(200).json({ output: baseCompletion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', output: null });
  }
};

export default generateAction;
