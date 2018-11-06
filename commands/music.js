const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const queue = new Map();
var leaving = false;
module.exports.run = async (bot, message, args) => {
	const voice_embed = new Discord.RichEmbed()
		.setFooter(`Chamado por ${message.author.username}`, message.author.displayAvatarURL);

	const voiceChannel = message.member.voiceChannel;
	var serverQueue = queue.get(message.guild.id);
	const url = args.join(" ");
	let yt_url = true;
	if (url === 'play' ||
		url === 'pause' ||
		url === 'leave' ||
		url === 'skip' ||
		url === 'queue' ||
		url === 'volume') {
		yt_url = false;
	}

	if (!voiceChannel) {
		return message.channel.send(voice_embed
			.setTitle("Você não está em um canal de voz.")
			.setColor("FF0000"));
	}

	var song_info;
	var song;
	if (yt_url) {
		song_info = await ytdl.getInfo(url);
		song = {
			title: song_info.title,
			url: song_info.video_url
		};
	} else {
		switch (url) {
			case "play":
				{
					return message.channel.send(new Discord.RichEmbed()
						.setTitle("Play was called")
						.setColor("#00FF00"));
				}
			case "pause":
				{
					return message.channel.send(new Discord.RichEmbed()
						.setTitle("Pause was called")
						.setColor("#00FF00"));
				}
			case "leave":
				{
					leaving = true;
					voiceChannel.leave();
					queue.delete(message.guild.id);
					return message.channel.send(new Discord.RichEmbed()
						.setTitle("Leave was called")
						.setColor("#00FF00"));
				}
			case "skip":
				{
					return message.channel.send(new Discord.RichEmbed()
						.setTitle("Skip was called")
						.setColor("#00FF00"));
				}
			case "queue":
				{
					return message.channel.send(new Discord.RichEmbed()
						.setTitle("Queue was called")
						.setColor("#00FF00"));
				}
			case "volume":
				{
					return message.channel.send(new Discord.RichEmbed()
						.setTitle("Volume was called")
						.setColor("#00FF00"));
				}
			default:
				break;
		}
	}

	leaving = false;
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};

		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(bot, message, message.guild, queueConstruct.songs[0]);

		} catch (e) {
			console.log(`Bot could not join a voice channel: + ${e}`);

			queue.delete(message.guild.id);

			return message.channel.send(voice_embed
				.setTitle("Não foi possível conectar ao canal de voz.")
				.setColor("#FF0000"));
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		await message.delete();
		return message.channel.send(voice_embed
			.setTitle(`Foi adicionado à fila: **${song.title}** `)
			.setColor("#00FF00")
			.setURL(song.url));
	}
}

function play(bot, message, guild, song) {
	var serverQueue = queue.get(guild.id);

	var dispatcher;
	if (!leaving)
		dispatcher = serverQueue.connection.playStream(ytdl(song.url));
	else return;

	if (!song) {
		queue.delete(guild.id);
		serverQueue.voiceChannel.leave();

		return message.channel.send(voice_embed
			.setTitle("Fim da queue, saí do canal de voz.")
			.setColor("#00FF00"));
	}

	message.delete();
	message.channel.send(new Discord.RichEmbed()
		.addField(`Agora tocando **${song.title}**`, song.url)
		.setURL(song.url)
		.setColor("#00FF00"));

	dispatcher.on('end', () => {
		console.log("song ended.");
		console.log(`Current musics in queue: ${serverQueue.songs}`);

		serverQueue.songs.shift();
		play(bot, message, guild, serverQueue.songs[0]);
	});

	dispatcher.on('error', error => console.log(error));
}

module.exports.help = {
	name: "music"
}