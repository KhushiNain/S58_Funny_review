const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function checkFunny(review) {

  const response = await client.responses.create({
    model: "gpt-5.6-luna",
    input: `
You are checking restaurant reviews for a funny review website.

Decide whether the review is funny or humorous.

Reply with ONLY:
FUNNY
or
NOT_FUNNY

Review:
${review}
`
  });

  return response.output_text.trim();
}

module.exports = checkFunny;