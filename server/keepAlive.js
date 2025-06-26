import axios from 'axios';
import cron from 'node-cron';

const URL = 'https://tic-tac-toe-multiplayer-online-server.onrender.com';

cron.schedule('*/5 * * * *', async () => {
  try {
    await axios.get(URL);
    console.log(`[PING] Server awake at ${new Date().toISOString()}`);
  } catch (err) {
    console.error(`[PING] Error: ${err.message}`);
  }
});
