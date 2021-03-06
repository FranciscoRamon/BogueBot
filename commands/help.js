const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    const utility_commands =
        "|``" + `${botconfig.prefix}` + "help             ``|" + "`` - `` **Recebe todos os comandos por PM.**\n" +
        "|``" + `${botconfig.prefix}` + "help here        ``|" + "`` - `` **Recebe todos os comandos no canal enviado.**\n" +
        "|``" + `${botconfig.prefix}` + "help music       ``|" + "`` - `` **Todos os comandos de música disponíveis.**\n" +
        "|``" + `${botconfig.prefix}` + "invite           ``|" + "`` - `` **Mostra o link para convidar o " + `${bot.user.username}` + " para qualquer servidor.\n**" +
        "|``" + `${botconfig.prefix}` + "clear [numero]   ``|" + "`` - `` **Apaga uma certa quantidade de mensagens.                        **";

    const authority_commands =
        "|``" + `${botconfig.prefix}` + "mute [membro]             ``|" + "`` - `` **Muta um membro do servidor.\n                **" +
        "|``" + `${botconfig.prefix}` + "desmute [membro]          ``|" + "`` - `` **Desmuta um membro já mutado no servidor.\n   **" +
        "|``" + `${botconfig.prefix}` + "tempmute [membro] [tempo] ``|" + "`` - `` **Muta temporariamente um usuário.\n           **" +
        "|``" + `${botconfig.prefix}` + "kick [membro] [motivo]    ``|" + "`` - `` **Expulsa um membro do servidor.\n             **" +
        "|``" + `${botconfig.prefix}` + "ban [membro] [motivo]     ``|" + "`` - `` **Bane um membro do servidor.\n                **" +
        "|``" + `${botconfig.prefix}` + "report [membro] [motivo]  ``|" + "`` - `` **Denuncia um membro do servidor.\n            **" +
        "|``" + `${botconfig.prefix}` + "renameserver [novo nome]  ``|" + "`` - `` **Renomeia o servidor.                         **";

    const user_commands =
        "|``" + `${botconfig.prefix}` + "avatar [membro]  ``|" + "`` - `` **Exibe em tamanho grande o avatar de um membro.**";

    const music_file = require("./music.js");
    const musicprefix = `${botconfig.prefix}${music_file.help.name}`;
    const music_commands =
        "[``" + `${musicprefix}` + " [search]           ``] " + "`` - `` **Toca um vídeo do YouTube\n              **" +
        "[``" + `${musicprefix}` + " queue              ``] " + "``" + ` ou [${musicprefix}` + " q    ``]" + "`` - `` **Para visualizar toda a fila.\n   **" +
        "[``" + `${musicprefix}` + " queue [numero]     ``] " + "`` - `` **Para pular para uma certa posição da fila.\n   **" +
        "[``" + `${musicprefix}` + " np                 ``] " + "`` - `` **Exibe o que está sendo tocado no momento.\n   **" +
        "[``" + `${musicprefix}` + " skip               ``] " + "``" + ` ou [${musicprefix}` + " s    ``]" + "`` - `` **Pula para o próximo video da fila.\n   **" +
        "[``" + `${musicprefix}` + " leave              ``] " + "``" + ` ou [${musicprefix}` + " l    ``]" + "`` - `` **Sai do canal de voz e apaga a fila.    **\n" +
        "[``" + `${musicprefix}` + " pause              ``] " + "``" + ` ou [${musicprefix}` + " p    ``]" + "`` - `` **Pausa o vídeo.\n                       **" +
        "[``" + `${musicprefix}` + " play               ``] " + "`` - `` **Continua o vídeo de onde foi pausado.\n**";

    let help_embed = new Discord.RichEmbed()
        .setTitle(`**${bot.user.username} Ajuda**`)
        .setDescription(`Estes são todos os comandos disponíveis do ${bot.user.username} até o momento.\n` +
            "Note que o Bot está em constante manutenção para testes e implementações de novas funções.\n" +
            "Bot desenvolvido por [Fobenga](https://github.com/pedroxvi), de código aberto disponível em seu [GitHub](https://github.com/pedroxvi/BogueBot).\n" +
            "Use o prefixo ``" + `${botconfig.prefix}` + "`` para executar os comandos abaixo.")
        .setAuthor(`Comandos do ${bot.user.username}`, bot.user.displayAvatarURL)
        .setTimestamp(bot.user.createdAt)
        .setURL("https://github.com/pedroxvi")
        .setFooter("Fobenga, criado em ")
        .setColor("#00FF00")
        .addField('\u200B', "**__MÚSICA__**\n" + music_commands)
        .addField('\u200B', "**__AUTORIDADE__**\n" + authority_commands)
        .addField('\u200B', "**__UTILIDADE__**\n" + utility_commands)
        .addField('\u200B', "**__USUÁRIO__**\n" + user_commands);

    let helpcommand = args.join(" ");

    if (helpcommand === 'music') {
        return message.channel.send(new Discord.RichEmbed()
            .addField("Comandos de música", music_commands)
            .setColor("#00FF00"));
    }
    if (helpcommand === 'here') {
        return message.channel.send(help_embed);
    }

    return message.channel.send(`**<@${message.author.id}>, enviei todos os meus comandos pra você.**`).then(() => {
        message.member.send(help_embed);
    });
}

module.exports.help = {
    name: "help"
}