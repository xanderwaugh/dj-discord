import { Message, MessageEmbed } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const play: myCommand = {
    name: "play",
    aliases: ["p"],
    callback: async (client: myClient, message: Message, ...args: string[]) => {
        if (!isUserInVC(message)) {
            return await message.reply("Please Join A Channel!");
        }

        let queue = client.player?.getQueue(message.guildId ?? "");
        if (!queue) {
            queue = client.player?.createQueue(message.guildId ?? "");
        }
        await queue?.join(message.member?.voice.channelId ?? "");

        return await queue
            ?.play(args.join(" "))
            .then(async (song) => {
                console.log(`${song?.name}---${song?.author}`);
                const embed = new MessageEmbed()
                    .setColor("BLUE")
                    .addField("Title", song.name, true)
                    .addField("Author", song.author, true)
                    .setThumbnail(song.thumbnail);
                return await message.reply({ embeds: [embed] });
            })
            // Exception
            .catch(async () => {
                return await message.reply("An err occured @xander");
            });
    },
};

export { play };
