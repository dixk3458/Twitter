export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    // username 쿼리에 따라 달라진다.
    const query = username ? `?username=${username}` : '';

    const response = await fetch(`${this.baseURL}/posts${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text,
        name: 'Ellie',
        username: 'ellie',
      }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteTweet(postId) {
    const response = await fetch(`${this.baseURL}/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 204) {
      throw new Error();
    }
  }

  async updateTweet(postId, text) {
    const response = await fetch(`${this.baseURL}/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  }
}
