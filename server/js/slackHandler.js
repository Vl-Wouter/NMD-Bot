import consola from 'consola';
import handleMessage from './handleMessage';

const formatForSlack = (message) => {
  const formatted = [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: message.message,
      },
    },
  ];
  if (message.link) {
    formatted.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `<${message.link.url}|${message.link.text}>`,
      },
    });
  }
  if (message.image) {
    if (message.image.is_accessory) {
      formatted[0].accessory = {
        type: 'image',
        image_url: message.image.url,
        alt_text: message.image.text,
      };
    } else {
      formatted.push({
        type: 'image',
        title: {
          type: 'plain_text',
          text: message.image.text,
          emoji: true,
        },
        image_url: message.image.url,
        alt_text: message.image.text,
      });
    }
  }
  return formatted;
};

export default async (client, event) => {
  consola.info(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  const reply = await handleMessage(event.text, client, null);
  const formattedReply = formatForSlack(reply);
  return formattedReply;
};
