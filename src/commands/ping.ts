import { Message } from "discord.js";
import { myClient } from "../utils";
import { myCommand } from "../utils";

const ping: myCommand = {
  name: "ping",
  helptext: "Pong!",
  aliases: [],
  callback: async (client: myClient, message: Message) => {
    // console.log(args);
    return await message.reply("Pong!");
  },
};

export { ping };
