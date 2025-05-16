 const os = require("os");
const { createCanvas, loadImage } = require("canvas");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const moment = require("moment-timezone");
const fs = require("fs");

module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt", "up"],
    version: "1.5",
    author: "XOS Ayan",
    role: 0,
    noPrefix: true,
    shortDescription: {
      en: "Check bot uptime with image."
    },
    longDescription: {
      en: "Generates an image with uptime info and sends system stats as text."
    },
    category: "system",
    guide: {
      en: "Use: {pn} or just type 'uptime', 'upt', or 'up'"
    }
  },

  // Dummy function to avoid Goat Bot error
  onStart: async function () {},

  onChat: async function ({ message, event, usersData, threadsData }) {
    const prefix = global.GoatBot.config.prefix;
    const body = (event.body || "").toLowerCase().trim();
    const allTriggers = [`uptime`, `upt`, `up`, `${prefix}uptime`, `${prefix}upt`, `${prefix}up`];
    if (!allTriggers.includes(body)) return;

    try {
      const uptime = process.uptime();
      const days = Math.floor(uptime / 86400);
      const h = Math.floor((uptime % 86400) / 3600);
      const m = Math.floor((uptime % 3600) / 60);
      const s = Math.floor(uptime % 60);
      const upTimeStr = `${days}d ${h}h ${m}m ${s}s`;

      const cpuModel = os.cpus()[0].model;
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const usedMemory = totalMemory - freeMemory;
      const diskUsage = await getDiskUsage();
      const totalUsers = (await usersData.getAll()).length;
      const totalThreads = (await threadsData.getAll()).length;
      const currentTime = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");

      const background = await loadImage("https://i.imgur.com/hes9xq4.jpeg");
      const canvas = createCanvas(1000, 500);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(background, 0, 0, 1000, 500);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 50px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 5;

      ctx.fillText("BOT UPTIME", 72, 100);
      ctx.fillText(`${upTimeStr}`, 72, 200);
      ctx.shadowColor = "transparent";

      const imagePath = `${__dirname}/uptime_image.png`;
      const buffer = canvas.toBuffer();
      fs.writeFileSync(imagePath, buffer);

      await message.reply({
        body: `──────────────────      
𝗔𝗱𝗺𝗶𝗻 𝗜𝗻𝗳𝗼 :

𝗢𝗪𝗡𝗘𝗥: 𝗥𝗮𝗮𝗱
𝗣𝗥𝗘𝗙𝗜𝗫: ( ${prefix} )

𝗕𝗼𝘁 𝗨𝗽𝘁𝗶𝗺𝗲 :

𝗗𝗮𝘆𝘀: ${days}
𝗛𝗼𝘂𝗿𝘀: ${h} 
𝗠𝗶𝗻𝘂𝘁𝗲𝘀: ${m} 
𝗦𝗲𝗰𝗼𝗻𝗱𝘀: ${s}

𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗧𝗶𝗺𝗲: ${currentTime}
𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀: ${totalUsers}
𝗧𝗼𝘁𝗮𝗹 𝗧𝗵𝗿𝗲𝗮𝗱𝘀: ${totalThreads}

            - SaYonara     
──────────────────`,
        attachment: fs.createReadStream(imagePath)
      });

      fs.unlinkSync(imagePath);
    } catch (err) {
      console.error(err);
      await message.reply("❌ An error occurred while generating the uptime image.");
    }
  }
};

async function getDiskUsage() {
  const { stdout } = await exec("df -k /");
  const [_, total, used] = stdout.split("\n")[1].split(/\s+/).filter(Boolean);
  return {
    total: parseInt(total) * 1024,
    used: parseInt(used) * 1024
  };
}
