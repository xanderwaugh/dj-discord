import { RepeatMode } from "discord-music-player";
import { Message } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const loop: myCommand = {
  name: "loop",
  helptext: "Toggle Infinite Song Loop.",
  aliases: ["repeat", "r"],
  callback: async (client: myClient, message: Message) => {
    if (!isUserInVC(message))
      return await message.reply("Please Join A Channel!");

    const queue = client.player?.getQueue(message.guildId ?? "");

    if (!queue) return await message.reply("No song queued to repeat.");

    if (queue.repeatMode === RepeatMode.SONG) {
      queue.setRepeatMode(RepeatMode.DISABLED);
      return await message.reply("Looping Disabled!");
    }
    queue.setRepeatMode(RepeatMode.SONG);
    return await message.reply("Looping Current Song!");
  },
};

export { loop };
