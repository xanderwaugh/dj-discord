import "dotenv/config";
import express from "express";
import { Queue } from "discord-music-player";
import { myClient } from "./utils";

interface guildList {
    name: string;
    id: string;
    index: number;
}

const APIServer = (client: myClient) => {
    // Express API
    const app = express();

    // Guild List
    app.get("/guilds", (_req, res) => {
        client.guilds.fetch().then((guilds) => {
            let guildNames: guildList[] = [];
            let count = 0;
            guilds.forEach((guild) => {
                guildNames.push({
                    name: guild.name,
                    id: guild.id,
                    index: count,
                });
                count++;
            });

            res.json(guildNames);
        });
    });

    // Command List
    app.get("/queue", (_req, res) => {
        // Loop throrugh guilds and loop through queue
        client.guilds.fetch().then((guilds) => {
            let songqueue: (Queue | undefined)[] = [];
            guilds.forEach((guild) => {
                let gque = client.player?.getQueue(guild.id);
                songqueue.push(gque);
            });
            res.json(songqueue);
        });
    });

    // Generate Invite Link
    app.get("/invite", (_req, res) => {
        let inv = client.generateInvite({
            scopes: ["bot"],
            permissions: "ADMINISTRATOR",
        });
        res.json(inv);
    });

    // Uptime
    app.get("/uptime", (_req, res) => {
        res.json(client.uptime);
    });

    // Listen on port 3000
    app.listen(4000, () => {
        console.log("API Server open on http://localhost:4000/");
    });
};

export { APIServer };
