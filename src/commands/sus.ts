import { Message } from "discord.js";
import { isUserInVC, myClient, myCommand } from "../utils";

/* order: 
    among us, 
    wocky, 
    taco bell bell, 
    jelly bean nooo,
    stop it get some help,
    flight woah owah owah
*/
const sus_urls = [
  "https://www.youtube.com/watch?v=ekL881PJMjI",
  "https://www.youtube.com/watch?v=MOt6eVaPhzU",
  "https://www.youtube.com/watch?v=slRMfzADj4M",
  "https://www.youtube.com/watch?v=4JRTAFjVYio",
  "https://www.youtube.com/watch?v=l60MnDJklnM",
  "https://www.youtube.com/watch?v=eIAFkGPdoa8",
];

const sus: myCommand = {
  name: "sus",
  helptext: "...",
  aliases: ["amogus"],
  callback: async (client: myClient, message: Message) => {
    if (!isUserInVC(message)) return;
    if (!message.guildId) return;

    let queue = client.player?.getQueue(message.guildId);
    if (!queue) queue = client.player?.createQueue(message.guildId);

    await queue?.join(message.member?.voice.channelId ?? "#");

    const rand_url = sus_urls[getRand()];
    console.log(rand_url);

    return await queue?.play(`${rand_url}`, {
      index: 0,
    });
  },
};

export { sus };

const getRand = (): number => {
  return Math.floor(Math.random() * sus_urls.length);
};
