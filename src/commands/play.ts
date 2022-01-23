import "@discordjs/opus";
import { Message, MessageEmbed } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";
const play: myCommand = {
  name: "play",
  aliases: ["p"],
  helptext: "Plays a Song from a url or search.",
  callback: async (
    client: myClient,
    message: Message,
    ...args: string[]
  ) => {
    //  ? Damn TypeScript
    if (!isUserInVC(message))
      return await message.reply("Please Join A Channel!");
    if (!args.join(" ")) return await message.reply("Search for a song!");
    if (!client.player) return await message.reply("no player err");
    if (!message.guildId) return await message.reply("no guildid err");
    if (!message.member) return await message.reply("no memmber err");

    // ? Create Queue
    let queue = client.player.getQueue(message.guildId);
    if (!queue) queue = client.player.createQueue(message.guildId);

    await queue.join(message.member.voice.channelId ?? "#");

    return await queue
      .play(args.join(" "))
      .then(async song => {
        console.log(`${song?.name} --- ${song?.author}  \n${song.url}`);
        const embed = new MessageEmbed()
          .setColor("BLUE")
          .setTitle(`${song.name}`)
          .setURL(`${song.url}`)
          .addField(`Author: `, `${song.author}`, true)
          .addField(`Duration: `, `${song.duration}`, true)
          .setImage(song.thumbnail);

        return await message.reply({ embeds: [embed] });
      })
      // TODO Check if playlist?
      .catch(async () => {
        return await queue
          ?.playlist(args.join(" "))
          .then(async ({ name, songs, author, url }) => {
            const embed = new MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`Playlist Queued!`)
              .setURL(`${url}`)
              .addField("Playlist Name: ", `[${name}](${url})`, true)
              .addField("Playlist Creator: ", `${author}`, true)
              .addField("Length: ", `${songs.length}`, true);

            songs.forEach((song, idx) => {
              if (idx < 12) {
                embed.addField(
                  `Song #${idx + 1}, Duration ${song.duration}`,
                  `[${song.name}](${song.url}) - ${song.author}`
                );
              }
            });
            return await message.reply({ embeds: [embed] });
          });
      });
  },
};

export { play };
