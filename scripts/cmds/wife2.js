 module.exports = {
config: {
name: "wife2",
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
if (event.body && event.body.toLowerCase() === "amar bou gula koi? 🥹") {
return message.reply({
body: " এই নে তোর মাল গুলা \n  ───────────────◊  \n\n‣ 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧                                                        ‣‌‌‌𝐁𝐨𝐭 𝐍𝐚𝐦𝐞:🕸️ SpideY 🕷️ 」",
attachment: await global.utils.getStreamFromURL("https://i.imgur.com/xrvBhmO.mp4")
});
}
}
}
