import { Message } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const skip: myCommand = {
  name: "skip",
  helptext: "Skips the current track.",
  aliases: ["fs"],
  callback: async (client: myClient, message: Message) => {
    if (!isUserInVC(message))
      return await message.reply("Please Join A Channel!");

    const queue = client.player?.getQueue(message.guildId ?? "");
    if (!queue) return await message.reply("No songs queued.");

    const { name, author } = queue.skip();
    return await message.reply(`${name} - ${author} skipped!`);
  },
};

export { skip };
