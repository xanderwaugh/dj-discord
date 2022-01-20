import { Message } from "discord.js";
import { myClient } from "../utils";
import { myCommand } from "../utils";

const ping: myCommand = {
    name: "ping",
    aliases: undefined,
    callback: async (client: myClient, message: Message) => {
        // console.log(args);
        await message.reply("Pong!");
    },
};

export { ping };
