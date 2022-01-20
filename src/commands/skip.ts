import { Message } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const skip: myCommand = {
    name: "skip",
    aliases: ["fs"],
    callback: async (client: myClient, message: Message) => {
        if (!isUserInVC(message)) {
            return await message.reply("Please Join A Channel!");
        }

        const queue = client.player?.getQueue(message.guildId ?? "");
        if (queue) {
            const { name, author } = queue.skip();
            return await message.reply(`${name} - ${author} skipped!`);
        }

        const guildQueue = client.player?.getQueue(message.guildId ?? "");
        if (guildQueue) {
            const { name, author } = guildQueue.skip();
            return await message.reply(`${name} - ${author} skipped!`);
        }

        await message.reply("No songs queued.");
    },
};

export { skip };
