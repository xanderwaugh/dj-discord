import { myClient, commands } from "./utils";

const commander = (client: myClient, PREFIX: string) => {
    client.on("messageCreate", (message) => {
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;

        const args = message.content.slice(1).split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        const aliasidx = Object.keys(commands).find((index) =>
            commands[index].aliases?.includes(commandName ?? "")
        );
        console.log(`Normal: ${commandName}...Alias: ${aliasidx}`);

        if (aliasidx) {
            try {
                commands[aliasidx].callback(client, message, ...args);
            } catch {
                // tagXanny(client, message);
            }
        } else if (commands[commandName ?? ""]) {
            try {
                commands[commandName ?? ""].callback(client, message, ...args);
            } catch {
                // tagXanny(client, message);
            }
        } else console.log("Not a cmd");
    });
};

export { commander };
