import { Message } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const pause: myCommand = {
  name: "pause",
  helptext: "Pauses / Resumes the Current Song.",
  aliases: ["stop", "resume"],
  callback: async (client: myClient, message: Message) => {
    if (!isUserInVC(message))
      return await message.reply("Please Join A Channel!");

    const queue = client.player?.getQueue(message.guildId ?? "");
    if (!queue) return await message.reply("There are no songs queued.");

    const currentState = queue.paused;
    queue.setPaused(!currentState);
    return await message.reply(
      `Player ${currentState ? "unpaused" : "paused"}.`
    );
  },
};

export { pause };
