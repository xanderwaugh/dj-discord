import { Message } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const shuffle: myCommand = {
    name: "shuffle",
    aliases: ["random"],
    callback: async (client: myClient, message: Message) => {
        if (!isUserInVC(message)) {
            return await message.reply("Please Join A Channel!");
        }
        const queue = client.player?.getQueue(message.guildId ?? "");
        if (queue) {
            queue.shuffle();
            await message.reply("Shuffled Queue!");
        } else {
            await message.reply("There is no queue to shuffle!");
        }
    },
};

export { shuffle };
