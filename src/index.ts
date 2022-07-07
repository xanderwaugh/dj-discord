import path from "path";
import dotenv from "dotenv-safe";
dotenv.config({
  path: path.join(__dirname, "../", ".env.local"),
});
import { Client } from "discord.js";
import { Player } from "discord-music-player";
import { myClient, myIntents, djStatus } from "./utils";
import { APIServer } from "./api";
import { commander } from "./commander";
// import dbots from "dbots";

// * ENVVARS
const { TOKEN, PREFIX } = process.env;
// const { TEST_TOKEN: TOKEN, TEST_PREFIX: PREFIX } = process.env; // dev

// * Create Client
const client: myClient = new Client({
  intents: myIntents,
  presence: djStatus,
});

// * Create Player
client.player = new Player(client, {
  quality: "high",
  timeout: 10,
  leaveOnEmpty: true,
  leaveOnStop: false,
});

// * Start
client.on("ready", async () => {
  console.log("Client Ready...");
  APIServer(client);

  // * Command Handler
  await commander(client, PREFIX ?? "!");

  // * Poll discordbotsgg
  // const poster = new dbots.Poster({
  //   client, apiKeys: { discordbotsgg: DBGG_KEY ?? "", topgg: TOPGG_KEY ?? "",
  //   }, clientLibrary: "discord.js", });
  // * Poll Services every 30 mins // poster.startInterval();

  // * Player Events
  client.player?.on("channelEmpty", async (queue) => {
    queue.connection?.leave();
  });
});

// Login
client.login(TOKEN);
