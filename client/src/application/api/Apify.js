import { APIFY_TOKEN } from "./env";

class Apify {
  constructor(actorId) {
    const { ApifyClient } = require("apify-client");

    this.client = new ApifyClient({
      token: APIFY_TOKEN,
    });

    this.token = APIFY_TOKEN;

    this.actorId = actorId;
  }

  // Starts an actor and waits for it to finish.
  async fetchItems() {
    const { defaultDatasetId } = await this.client.actor(this.actorId).call();

    // Fetches results from the actor's dataset.
    const { items } = await this.client.dataset(defaultDatasetId).listItems();
    console.log(items);

    return {
      items,
    };
  }
}

export default Apify;
