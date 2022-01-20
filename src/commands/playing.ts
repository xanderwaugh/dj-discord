import { Message, MessageEmbed } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const playing: myCommand = {
    name: "playing",
    aliases: ["song", "q", "queue"],
    callback: async (client: myClient, message: Message) => {
        if (!isUserInVC(message)) {
            return await message.reply("Please Join A Channel!");
        }

        const queue = client.player?.createQueue(message.guildId ?? "");

        if (queue) {
            const embed = new MessageEmbed().setColor("BLUE");

            queue.songs.forEach(
                ({ name, author, requestedBy, duration, url }, idx) => {
                    if (idx === 0) {
                        embed.addField(
                            `Now playing, Requested by: ${
                                requestedBy?.username ?? ""
                            }. Length: ${duration}`,
                            `${name} - ${author}`,
                            false
                        );
                    } else {
                        embed.addField(
                            `Song #${idx + 1}, Requested by: ${
                                requestedBy?.username ?? ""
                            }. Length: ${duration}`,
                            `${name} - ${author} [link](${url})`,
                            false
                        );
                    }
                }
            );
            return await message.reply({
                embeds: [embed],
            });
        } else {
            return await message.reply("No songs in queue!");
        }
    },
};

export { playing };
