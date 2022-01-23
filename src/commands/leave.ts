import { Message } from "discord.js";
import { myClient, myCommand } from "../utils";

const leave: myCommand = {
  name: "leave",
  helptext: "Leaves the Channel and clears the Queue.",
  aliases: ["quit", "disconnect", "dc", "scram"],
  callback: async (client: myClient, message: Message) => {
    const queue = client.player?.getQueue(message.guildId ?? "");

    if (!queue) return await message.reply("I am not in a channel!");

    queue.clearQueue();
    queue.connection?.leave();
    return await message.reply("Leaving Channel...");
  },
};

export { leave };
