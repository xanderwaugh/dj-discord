import { Message } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const shuffle: myCommand = {
  name: "shuffle",
  helptext: "Shuffles the queue.",
  aliases: ["random"],
  callback: async (client: myClient, message: Message) => {
    if (!isUserInVC(message))
      return await message.reply("Please Join A Channel!");
    if (!client.player) return message.reply("Error, bot brok");

    const queue = client.player.getQueue(message.guildId ?? "");

    if (!queue)
      return await message.reply("There is no queue to shuffle!");

    queue.shuffle();
    return await message.reply("Shuffled Queue!");
  },
};

export { shuffle };
