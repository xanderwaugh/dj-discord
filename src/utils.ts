import { Client, Intents, Message, PresenceData } from "discord.js";
import { Player } from "discord-music-player";
import { leave } from "./commands/leave";
import { pause } from "./commands/pause";
import { ping } from "./commands/ping";
import { play } from "./commands/play";
import { playing } from "./commands/playing";
import { skip } from "./commands/skip";
import { shuffle } from "./commands/shuffle";
import { help } from "./commands/help";
import { loop } from "./commands/loop";

// TYPES
interface myClient extends Client {
    player?: Player;
}

interface myCommand {
    name: string;
    aliases: string[] | undefined;
    callback(client: myClient, message: Message, ...args: string[]): void;
}

// commands obj
interface CommandDict {
    [name: string]: myCommand;
}
const commands = {
    leave: leave,
    pause: pause,
    ping: ping,
    play: play,
    playing: playing,
    skip: skip,
    shuffle: shuffle,
    help: help,
    loop: loop,
} as CommandDict;

// UTIL FUNCTIONS
const xannyid = "272513708188499968";

const djStatus: PresenceData = {
    activities: [{ name: "Music", type: "LISTENING" }],
    status: "online",
};
const myIntents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
];

const tagXanny = (client: myClient, message: Message) => {
    client.users.fetch(xannyid).then(async (user) => {
        await message.reply(`${user}`);
    });
};
const isUserInVC = (message: Message) => {
    const user_channel = message.member?.voice.channel;
    if (!user_channel) {
        return false;
    } else {
        return user_channel;
    }
};

export {
    myClient,
    myCommand,
    commands,
    isUserInVC,
    tagXanny,
    myIntents,
    djStatus,
};
