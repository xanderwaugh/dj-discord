import fs, { Dirent } from "fs";
import { myClient, tagXanny, CommandDict } from "./utils";

const commander = async (client: myClient, PREFIX: string) => {
  const commands = await loadCommands();
  console.log("Commands Done Loading");

  client.on("messageCreate", async message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(1).split(/ +/);
    const userCmd = args.shift()?.toLowerCase();
    if (!userCmd) return;

    const hasAlias = Object.keys(commands).find(index =>
      commands[index].aliases?.includes(userCmd)
    );

    try {
      if (hasAlias) {
        commands[hasAlias].callback(client, message, ...args);
      } else if (commands[userCmd]) {
        commands[userCmd].callback(client, message, ...args);
      } else {
        console.log("Not a cmd");
      }
    } catch (error) {
      tagXanny(client);
    }
  });
};

export { commander };

// Load Commands
export const loadCommands = async () => {
  const commands: CommandDict = {} as CommandDict;

  for (const command of getFiles()) {
    const commandFile = await import(command);
    const split = command.replace(/\\/g, "/").split("/");
    const commandName = split[split.length - 1].replace(".js", "");
    commands[commandName.toLowerCase()] =
      commandFile[commandName.toLowerCase()];
  }
  return commands;
};

export const getFiles = () => {
  const dir = `${__dirname}/commands/`;
  const files: Dirent[] = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  const commandFiles: string[] = [];

  files.forEach(file => {
    commandFiles.push(`${dir}/${file.name}`);
  });
  return commandFiles;
};
