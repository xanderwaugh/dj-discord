import "dotenv/config";
import express from "express";
import { myClient } from "./utils";

interface guildList {
  index: string | number;
  name: string;
  id: string;
  icon: string | null;
}

const APIServer = (client: myClient) => {
  // * Express API
  const app = express();

  // * Guild List
  app.get("/guilds", (_req, res) => {
    client.guilds.fetch().then((guilds) => {
      const guildNames: guildList[] = [];
      guilds.forEach((guild, idx) => {
        guildNames.push({
          index: idx,
          name: guild.name,
          id: guild.id,
          icon: guild.iconURL(),
        });
      });

      res.json({
        guilds: guildNames,
      });
    });
  });

  // * Generate Invite Link
  app.get("/invite", (_req, res) => {
    const inv = client.generateInvite({
      scopes: ["bot"],
      permissions: "ADMINISTRATOR",
    });
    res.json({
      url: inv,
    });
  });

  // * Uptime
  app.get("/uptime", (_req, res) => {
    res.json({
      uptime: client.uptime,
    });
  });

  // * Listen on port 3000
  app.listen(4000, () => {
    console.log("API Server open on http://localhost:4000/");
  });
};

export { APIServer };
