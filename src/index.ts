import "dotenv/config";
import { Client } from "discord.js";
import { Player } from "discord-music-player";
import { myClient, myIntents, djStatus } from "./utils";
import { APIServer } from "./api";
import { commander } from "./commander";

const { TOKEN, PREFIX } = process.env; // prod
// const { TEST_TOKEN: TOKEN, TEST_PREFIX: PREFIX } = process.env; // dev

// Create Client
const client: myClient = new Client({
  intents: myIntents,
  presence: djStatus,
});

// Create Player
client.player = new Player(client, {
  quality: "high",
  timeout: 10,
  leaveOnEmpty: true,
  leaveOnStop: false,
});

client.on("ready", async () => {
  console.log("Client Ready...");
  APIServer(client);

  // Command Handler
  await commander(client, PREFIX ?? "!");
});

// Player Events
client.player.on("channelEmpty", async queue => {
  //   const guildQueue = client.player?.getQueue(queue.guild.id);
  //   if (guildQueue) guildQueue.clearQueue();
  queue.connection?.leave();
});

// Login
client.login(TOKEN);
