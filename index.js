const Discord = require('discord.js');

const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGE_REACTIONS"
    ],
});

// const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/911140068612272129/RRCswPVUTMfRkmcUFptyFH6lLNO3bQiGVzEHuTu38K5Kw2pVtkvhSvBtbg3lGhUw_nA_' });

client.once("ready", () => {
    console.log("I am ready to rock and roll")
}); 

client.on("message", async message => {
    if(message.content === "!test") {
        const response = await fetch('https://api.tdameritrade.com/v1/marketdata/BLDP/pricehistory?apikey=HK4RSQ3URFCJEJ5TQC52JWAPQZACPBNT&periodType=day&period=1&frequencyType=minute&frequency=30&startDate=1636992000000&endDate=1636992000001');
        const body = await response.text();
        message.channel.send("Response Body:" + body);
    }
})
client.login("OTExMTI0MTE4NjMwNDY1NTU2.YZc0dQ.pNQOn6zsnqhg86RkPGcHZYxlCE4");



// Http Client
const fetch = require('node-fetch');
//fetch('https://api.tdameritrade.com/v1/marketdata/BLDP/pricehistory?apikey=HK4RSQ3URFCJEJ5TQC52JWAPQZACPBNT&periodType=day&period=1&frequencyType=minute&frequency=30&startDate=1636992000000&endDate=1636992000001').then(response => message.channel.send(response.json()));



client.on("message", async message => {
    if(message.content.startsWith("!check")) {
        
        let ticker = message.toString().split(" ")[1].toUpperCase();
        //fetch('https://aws.random.cat/meow').then(response => console.log("Res: " + response.json()));
        const response = await fetch('https://api.tdameritrade.com/v1/marketdata/' + ticker + '/pricehistory?apikey=HK4RSQ3URFCJEJ5TQC52JWAPQZACPBNT&periodType=day&period=1&frequencyType=minute&frequency=30&startDate=1636992000000&endDate=1636992000001&needExtendedHoursData=false');
        const body = await response.text();
        message.channel.send("Searching candle data for $" + ticker + "...\n");
        message.channel.send("Here is the candle data for $" + ticker + "\n" + body);

    } else if (message.content.startsWith("!options")) {
        let ticker = message.toString().split(" ")[1].toUpperCase();
        const response = await fetch('https://api.tdameritrade.com/v1/marketdata/chains?apikey=HK4RSQ3URFCJEJ5TQC52JWAPQZACPBNT&symbol=' + ticker + '&contractType=CALL&strikeCount=1&fromDate=2021-11-15&toDate=2021-11-20');
        const body = await response.text();
        
        message.channel.send("Searching options data for $" + ticker + "...\n");
        message.channel.send("Here is the options data for $" + ticker + "\n" + body);
    }
})