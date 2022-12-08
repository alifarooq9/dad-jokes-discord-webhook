import type { NextApiRequest, NextApiResponse } from "next";

const discordMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  await fetch(
    "https://discord.com/api/webhooks/1050298345920409611/x7IKNcgSxq53u5bqHxll-3Enxcix5tBwpR0m5sQvEgW8Z5tYh4EsCJIBxROIySKjOaLW",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: "This is a first message from discord webhook",
      }),
    }
  ).then((response) => {
    res.status(200).json(response.json());
  });

  res.status(200).json("Not working");
};

export default discordMessage;
