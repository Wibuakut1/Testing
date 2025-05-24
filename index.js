const { Client, GatewayIntentBits, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const { config } = require('dotenv');
const fs = require('fs');
config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const duckraceCommand = new SlashCommandBuilder()
  .setName('duckrace')
  .setDescription('Duck race bergambar!')
  .addStringOption(option =>
    option.setName('peserta')
      .setDescription('Nama peserta dipisah koma')
      .setRequired(true)
  );

client.once('ready', async () => {
  console.log(`Bot login sebagai ${client.user.tag}`);
  await client.application.commands.set([duckraceCommand]);
});

const canvasWidth = 800;
const canvasHeight = 100;
const duckSize = 50;
const maxSteps = 10;

async function simulateDuckRace(names) {
  const progress = Array(names.length).fill(0);
  const duckImage = await loadImage('./assets/duck.png');
  const frames = [];

  while (true) {
    for (let i = 0; i < names.length; i++) {
      if (progress[i] < maxSteps) {
        if (Math.random() < 0.6) progress[i]++;
      }
    }

    const canvas = createCanvas(canvasWidth, canvasHeight * names.length);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#add8e6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < names.length; i++) {
      const x = (progress[i] / maxSteps) * (canvasWidth - duckSize);
      const y = i * canvasHeight + 20;

      ctx.drawImage(duckImage, x, y, duckSize, duckSize);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(names[i], 10, y + 20);
    }

    const buffer = canvas.toBuffer('image/png');
    frames.push(buffer);

    if (progress.some(p => p >= maxSteps)) break;
  }

  const winnerIndex = progress.findIndex(p => p >= maxSteps);
  const winner = names[winnerIndex];

  return { frames, winner };
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'duckrace') {
    const pesertaInput = interaction.options.getString('peserta');
    const names = pesertaInput.split(',').map(n => n.trim());

    if (names.length < 2) {
      await interaction.reply('Minimal 2 peserta.');
      return;
    }

    await interaction.deferReply();

    const { frames, winner } = await simulateDuckRace(names);

    for (const frame of frames) {
      const attachment = new AttachmentBuilder(frame, { name: 'duckrace.png' });
      await interaction.editReply({ files: [attachment] });
      await new Promise(r => setTimeout(r, 1000));
    }

    await interaction.followUp(`:checkered_flag: Pemenangnya adalah **${winner}**!`);
  }
});

client.login(process.env.TOKEN);
