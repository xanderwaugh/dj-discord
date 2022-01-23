import { Message, MessageEmbed } from "discord.js";
import { loadCommands } from "../commander";
import { myClient, myCommand } from "../utils";

const help: myCommand = {
  name: "help",
  helptext: "Lists all Commands.",
  aliases: ["h"],
  callback: async (client: myClient, message: Message) => {
    const cmds = await loadCommands();

    const help_embed = new MessageEmbed({
      title: "DJFisher Help Commands",
      color: "RANDOM",
      fields: [],
    });

    Object.keys(cmds).forEach(cmd => {
      help_embed.addField(
        `${cmds[cmd]}`,
        `${cmds[cmd].helptext}\nAliases: ${cmds[cmd].aliases ?? "none"}`,
        false
      );
    });

    return await message.reply({
      embeds: [help_embed],
    });
  },
};

export { help };
