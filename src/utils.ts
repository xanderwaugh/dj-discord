import { Client, Intents, Message, PresenceData, User } from "discord.js";
import { Player } from "discord-music-player/dist/Player";

// ! TYPES
export interface myClient extends Client {
  player?: Player;
}

export interface myCommand {
  name: string;
  helptext: string;
  aliases: string[] | undefined;
  callback(client: myClient, message: Message, ...args: string[]): void;
}

export type CommandDict = {
  [key: string]: myCommand;
};

// ? Other

// * UTIL FUNCTIONS
export const xannyid = "272513708188499968";
export const djStatus: PresenceData = {
  activities: [{ name: "Music", type: "LISTENING" }],
  status: "online",
};
export const myIntents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES,
];

export const tagXanny = (client: myClient) => {
  client.users.fetch(xannyid).then(async (user: User) => {
    await user.send("Error Occured");
  });
};
export const isUserInVC = (message: Message) => {
  const user_channel = message.member?.voice.channel;
  if (!user_channel) {
    return false;
  } else {
    return user_channel;
  }
};
