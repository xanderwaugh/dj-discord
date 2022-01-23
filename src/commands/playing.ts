import { Message, MessageEmbed } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const playing: myCommand = {
  name: "playing",
  helptext: "Lists the Current Queue / Current Song Playing.",
  aliases: ["song", "q", "queue"],
  callback: async (client: myClient, message: Message) => {
    if (!isUserInVC(message))
      return await message.reply("Please Join A Channel!");

    const queue = client.player?.getQueue(message.guildId ?? "");
    if (!queue) return await message.reply("No Songs in Queue!");

    const embed = new MessageEmbed().setColor("BLUE");
    const nowSong = queue.nowPlaying;

    if (nowSong) {
      const { author, name, url, duration } = nowSong;
      embed.addField(
        `Now Playing. Length: ${duration}`,
        `[${name}](${url}) - ${author}`
      );
    } else {
      return await message.reply("No Songs in Queue!");
    }

    queue.songs.map(({ name, author, duration, url }, idx) => {
      if (idx != 0 && idx <= 15) {
        embed.addField(
          `Queue #${idx}. Length: ${duration}`,
          `[${name}](${url}) - ${author}`
        );
      }
    });
    return await message.reply({
      embeds: [embed],
    });
  },
};

export { playing };
