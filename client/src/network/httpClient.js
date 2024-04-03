export default class HTTPClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });

    console.log(res);

    // DELETE 메서드는 아무런것도 반환하지 않는다. 따라서 undefined가 반환될텐데 그 경우 json()을 이용해 오브젝트 변환이 안되 오류

    let data;

    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    // 브라우저에서 제공하는 fetch()는 성공하든 실패하든 반환하기 때문에
    // res로 받아온 status에 따라서 에러를 처리해줘야한다.

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : 'Something Error 💩';
      const error = new Error(message);
      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
      throw error;
    }

    return data;
  }
}
