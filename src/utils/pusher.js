import Pusher from 'pusher-js';

const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: 'us2',
  encrypted: true
});

export const getChannel = channel => pusher.subscribe(channel);
