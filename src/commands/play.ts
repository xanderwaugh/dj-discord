import "@discordjs/opus";
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
            // Check if can play list
            .catch(async () => {
                return await queue
                    ?.playlist(args.join(" "))
                    .then(async ({ name, songs, author }) => {
                        const embed = new MessageEmbed()
                            .setColor("DARK_ORANGE")
                            .setTitle(
                                `Playing Playlist Queued By: ${message.author.username}`
                            )
                            .addField("Playlist Name", `${name}`, false)
                            .addField("Playlist Author", `${author}`, false)
                            .addField(
                                "Playlist Length",
                                `${songs.length}`,
                                false
                            );
                        return await message.reply({ embeds: [embed] });
                    });
            });

        // OG PLAYLIST
        return await queue
            ?.playlist(args.join(" "))
            .then(async ({ name, author, songs }) => {
                const embed = new MessageEmbed()
                    .setColor("DARK_ORANGE")
                    .setTitle(
                        `Playing Playlist Queued By: ${message.author.username}`
                    )
                    .addField("Playlist Name", `${name}`, false)
                    .addField("Playlist Author", `${author}`, false)
                    .addField("Playlist Length", `${songs.length}`, false);
                return await message.reply({ embeds: [embed] });
            });

        // OG
        // return await queue
        //     ?.play(args.join(" "))
        //     .then(async (song) => {
        //         console.log(`${song?.name}---${song?.author}`);
        //         const embed = new MessageEmbed()
        //             .setColor("BLUE")
        //             .addField("Title", song.name, true)
        //             .addField("Author", song.author, true)
        //             .setThumbnail(song.thumbnail);
        //         return await message.reply({ embeds: [embed] });
        //     })
        //     // Exception
        //     .catch(async () => {
        //         tagXanny(client);
        //         return await message.reply("An err occured @xander");
        //     });
    },
};

export { play };
