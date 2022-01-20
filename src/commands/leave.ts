import { Message } from "discord.js";
import { myClient, myCommand } from "../utils";

const leave: myCommand = {
    name: "leave",
    aliases: ["quit", "disconnect", "dc", "scram"],
    callback: async (client: myClient, message: Message) => {
        const queue = client.player?.getQueue(message.guildId ?? "");
        if (queue) {
            queue.clearQueue();
            queue.connection?.leave();
            return await message.reply("Leaving Channel...");
        } else {
            return await message.reply("I am not in a channel!");
        }
    },
};

export { leave };
