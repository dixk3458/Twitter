export default class TweetService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getTweets(username) {
    // username 쿼리에 따라 달라진다.
    const query = username ? `?username=${username}` : '';

    return this.httpClient.fetch(`/posts${query}`, {
      method: 'GET',
    });
  }

  async postTweet(text) {
    return this.httpClient.fetch(`/posts`, {
      method: 'POST',
      body: JSON.stringify({
        text: text,
        name: 'Ellie',
        username: 'ellie',
      }),
    });
  }

  async deleteTweet(postId) {
    return this.httpClient.fetch(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  async updateTweet(postId, text) {
    return this.httpClient.fetch(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ text: text }),
    });
  }
}
