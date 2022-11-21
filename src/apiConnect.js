/**
 * Класс для общения с сервером lastFm
 * @returns {Object}
 */
export function apiConnect() {
  const lasFm = {
    url: "http://ws.audioscrobbler.com/2.0",
    apiKey: "2cf860f449f80740452bbcee1d7a742e",
    apiSecret: "4e692081acc722a1e1fedd990e251fe6",
  };
  /**
   * генерируем УРЛ необходимого запроса
   * @param {object} params - реквест параметры необходимые для запроса
   * @returns {url}
   */
  const createUrl = (params) => {
    params.api_key = lasFm.apiKey;
    const url = new URL(lasFm.url);
    for (let key in params) {
      url.searchParams.set(key, params[key]);
    }
    return url;
  };
  /**
   * Генерируем XMLHttpRequest для отправки запроса
   * @param {Url} url - урл куда нужно отправить запрос
   * @returns {XMLHttpRequest}
   */
  const createRequest = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    return xhr;
  };

  /**
   * Промис запроса к серверу
   * @param {object} params - параметры, необходимые для генерации урла запроса
   * @returns {Promise}
   */
  function request(params) {
    return new Promise((resolve, reject) => {
      const url = createUrl(params);
      const xhr = createRequest(url);
      xhr.send();
      xhr.onload = () => {
        resolve(JSON.parse(xhr.response));
      };
    });
  }
  return {
    request,
  };
}
