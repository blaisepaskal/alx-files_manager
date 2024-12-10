import { createClient } from 'redis';
import { promisify } from 'util';

// class to define on redis commands
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
  }

  // check connection to redis
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // get value of a given key
  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  // sets key value pair to redis
  async set(key, value, duration) {
    await promisify(this.client.set)
      .bind(this.client)(key, duration, value);
  }

  // deletes key value par from redis server
  async del(key) {
    await promisify(this.client.del).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
