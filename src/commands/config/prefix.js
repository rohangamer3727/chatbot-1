const collection = require('../../models/guild');
const { bold, inlineCode } = require('discord.js');

module.exports = {
  name: 'prefix',
  subCommands: ['set', 'reset'],
  run: async (client, message, args) => {
    if (!message.member.permissions.has('Administrator')) {
      return message.channel.send(
        `${client.config.emojis.cross} | You need ${inlineCode(
          'Administrator'
        )} permission to use this command.`
      );
    }

    if (args[0] === 'set') {
      const prefix = args[1];
      if (!prefix) return message.channel.send('Please provide some prefix.');
      if (prefix.length > 10) {
        return message.channel.send(
          'Prefix must not be longer than 10 characters.'
        );
      }

      await collection.findOneAndUpdate(
        { guildId: message.guildId },
        { prefix: prefix },
        { upsert: true }
      );

      message.channel.send(
        `${client.config.emojis.tick} | Updated the server prefix to ${bold(
          prefix
        )}.`
      );
    } else if (args[0] === 'reset') {
      await collection.findOneAndUpdate(
        { guildId: message.guildId },
        { prefix: client.config.defaultPrefix }
      );

      message.channel.send(
        `${client.config.emojis.tick} | Reseted the prefix to ${bold(
          client.config.defaultPrefix
        )}.`
      );
    }
  },
};
