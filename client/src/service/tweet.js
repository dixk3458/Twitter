export default class TweetService {
  constructor(httpClient, tokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage;
  }

  async getTweets(username) {
    // username 쿼리에 따라 달라진다.
    const query = username ? `?username=${username}` : '';

    return this.httpClient.fetch(`/posts${query}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    return this.httpClient.fetch(`/posts`, {
      method: 'POST',
      headers: this.getHeaders(),
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
      headers: this.getHeaders(),
    });
  }

  async updateTweet(postId, text) {
    return this.httpClient.fetch(`/posts/${postId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text: text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
