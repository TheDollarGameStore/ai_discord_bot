const token = "Discord Bot Token Goes Here";

const {Client, GatewayIntentBits} = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => {
    console.log("Bot online");
});

client.on("messageCreate", async (message) => {
    if (message.content.substring(0, 6) === "!topic") {
        try {
            var request = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    requestor_id: message.author.username,
                    topic: message.content.substring(7, message.content.length).trim()
                })
            }
            var response = await fetch("http://localhost:3001/story/suggest", request);
            var jsonResponse = await response.json();
    
            if (jsonResponse.status === "Success") {
                message.channel.send("Suggested Topic: " + message.content.substring(6, message.content.length).trim());
            }
            else {
                message.channel.send("An error occured...");
            }
        }
        catch (e) {
            message.channel.send("An error occured...");
            console.log(e);
        }
        
    }
});

client.login(token);