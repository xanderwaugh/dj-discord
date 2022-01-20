import { Message } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

const pause: myCommand = {
    name: "pause",
    aliases: ["stop", "resume"],
    callback: async (client: myClient, message: Message) => {
        if (!isUserInVC(message)) {
            return await message.reply("Please Join A Channel!");
        } else if (!client.player?.hasQueue(message.guildId ?? "")) {
            return await message.reply("There are no songs queued.");
        }

        const queue = client.player?.getQueue(message.guildId ?? "");
        const currentState = queue?.paused;
        queue?.setPaused(!currentState);
        await message.reply(`Player ${currentState ? "unpaused" : "paused"}.`);
    },
};

export { pause };
