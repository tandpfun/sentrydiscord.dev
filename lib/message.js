import { MessageEmbed } from 'discord.js';
import getColor from './colors.js';
import * as parser from './parser.js';

export default function createMessage(event) {
  const embed = new MessageEmbed();

  embed.setAuthor('Sentry → Discord', '', 'https://sentrydiscord.dev');

  embed.setTitle(parser.getTitle(event));
  embed.setURL(parser.getLink(event));
  embed.setTimestamp(parser.getTime(event));
  embed.setColor(getColor(parser.getLevel(event)));

  const fileLocation = parser.getFileLocation(event)
  embed.setDescription(
    `${fileLocation ? `\`📄 ${fileLocation}\`\n` : ''}\`\`\`${parser.getLanguage(event) || parser.getPlatform(event)}\n${parser.getErrorCodeSnippet(event)}
    \`\`\``
  );

  const locations = parser.getLocation(event);
  embed.addField('Stack', `\`\`\`${locations.join('\n')}\n\`\`\``);

  const tags = parser.getTags(event)
  const release = parser.getRelease(event);
  if (Object.keys(tags).length > 0 || release != null) {
    embed.addField('Tags', `${release ? `Release: ${release}\n` : ''}${tags.map(([key, value]) => `${key}: ${value}`).join('\n')}`, true)
  }

  const user = parser.getUser(event);
  if (user?.username) {
    embed.addField('User', `${user.username} ${user.id ? `(${user.id})` : ''}`, true);
  }

  const contexts = parser.getContexts(event);
  if (contexts.length > 0) {
    embed.addField('Contexts', contexts.join('\n'), true);
  }/* else {
    embed.addField("​", "​", true) // Zero-Width Space Field
  }*/

  const extras = parser.getExtras(event);
  if (extras.length > 0) {
    embed.addField('Extras', extras.join('\n'), true);
  }

  return {
    username: 'Sentry',
    avatar_url: `https://sentrydiscord.dev/icons/sentry.png`,
    embeds: [embed.toJSON()],
  };
}
