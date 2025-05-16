module.exports = {
config: {
name: "wife3",
version: "1.0",
author: "xovhi",
countDown: 5,
role: 0,
shortDescription: "no prefix",
longDescription: "no prefix",
category: "no prefix",
},

onStart: async function(){}, 
onChat: async function({ event, message, getLang }) {
if (event.body && event.body.toLowerCase() === "mahid's wifey") {
return message.reply({
body: " এই যে Mahider  মাল টা 🙂 \n  ───────────────◊  \n\n‣ 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧                                                        ‣‌‌‌𝐁𝐨𝐭 𝐍𝐚𝐦𝐞:🕸️ SpideY 🕷️ 」",
attachment: await global.utils.getStreamFromURL("https://i.imgur.com/TlncU4o.jpeg")
});
}
}
}
