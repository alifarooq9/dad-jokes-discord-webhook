import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../env/server.mjs";

const discordMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dadJoke = await fetch(
      "https://dad-jokes.p.rapidapi.com/random/joke",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": env.API_KEY,
          "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
        },
      }
    ).then((response) => {
      return response.json();
    });

    await fetch(env.DISCORD_WEBHOOK_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        content: `${dadJoke.body[0].setup}. ||${dadJoke.body[0].punchline}||`,
      }),
    });

    res.status(200).json({ success: true, dadJoke: dadJoke });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong on server",
      cause: error,
    });
  }
};

export default discordMessage;

export const config = {
  api: {
    bodyParser: false,
  },
};
