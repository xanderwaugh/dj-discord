import { EmbedField, Message, MessageEmbed } from "discord.js";
import { myClient, myCommand, commands } from "../utils";

const help: myCommand = {
    name: "help",
    aliases: ["h"],
    callback: async (client: myClient, message: Message) => {
        let emb_fields: EmbedField[] = [];
        Object.keys(commands).forEach((cmd) => {
            emb_fields.push({
                name: `${commands[cmd].name}`,
                value: `Aliases: [${commands[cmd].aliases}]`,
                inline: false,
            });
        });

        const embed = new MessageEmbed({
            title: "DJ-Fisher Help Command",
            color: "LUMINOUS_VIVID_PINK",
            fields: emb_fields,
        });
        return await message.reply({
            embeds: [embed],
        });
    },
};

export { help };
