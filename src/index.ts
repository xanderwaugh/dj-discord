import "dotenv/config";
import { Client } from "discord.js";
import { Player } from "discord-music-player";
import { myClient, myIntents, djStatus } from "./utils";
import { APIServer } from "./api";
import { commander } from "./commander";

// let TOKEN: string;
// let PREFIX: string;
// if (process.env.NODE_ENV === "production") {
//     TOKEN = process.env.TOKEN ?? "";
//     PREFIX = process.env.PREFIX ?? "";
// } else {
//     TOKEN = process.env.TEST_TOKEN ?? "";
//     PREFIX = "$";
// }

const { TOKEN, PREFIX } = process.env;

// Create Client --- intents: [new Intents(32441)],
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
    // console.log("Commands", commands);
    commander(client, PREFIX ?? "!");
});

// Login
client.login(TOKEN);
