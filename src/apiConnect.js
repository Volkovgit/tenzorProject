export function apiConnect() {
  const lasFm = {
    url: "http://ws.audioscrobbler.com/2.0",
    apiKey: "2cf860f449f80740452bbcee1d7a742e",
    apiSecret: "4e692081acc722a1e1fedd990e251fe6",
  };
  const createUrl = (params) => {
    params.api_key = lasFm.apiKey;
    const url = new URL(lasFm.url);
    for (let key in params) {
      url.searchParams.set(key, params[key]);
    }
    return url;
  };

  const createRequest = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    return xhr;
  };

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

// const lasFm = {
//   url: "http://ws.audioscrobbler.com/2.0",
//   apiKey: "2cf860f449f80740452bbcee1d7a742e",
//   apiSecret: "4e692081acc722a1e1fedd990e251fe6",
// };

// const testObj = {
//   method: "chart.getTopArtists",
//   format: "json",
//   api_key: lasFm.apiKey,
// };

// apiConnect()
//   .request(testObj)
//   .then((data) => console.log(data));
