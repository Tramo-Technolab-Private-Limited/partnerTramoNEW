const hostname = window.location.hostname.split('.').slice(-2).join('.');
const siteUrl = process.env.REACT_APP_BASE_URL;

export function UploadFile(url: any, body: any, token: any) {
  var init = {
    method: 'POST',
    headers: {
      token: token ? token : null,

    },
    body: body,
  };
  return fetch(siteUrl + url, init)
    .then((res) =>
      res.json().then((data) => {
        var apiData = {
          status: res.status,
          data: data,
        };
        return apiData;
      })
    )
    .catch((err) => {
      return 'error';
    });
}

export function Api(url: any, apiMethod: any, body: any, token: any) {
  let userAgent: any = navigator.userAgent;
  var init: any =
    apiMethod == 'GET'
      ? {
        method: 'GET',
        headers: {
          //  'Authorization': token
          'Content-Type': 'application/json',
          token: token ? token : null,
          latitude: localStorage.getItem('lat')?.toString(),
          longitude: localStorage.getItem('long')?.toString(),
          ip: localStorage.getItem('ip')?.toString(),
          'user-Agent': userAgent,
          devicetype: userAgent.match(/Android/i)
            ? 'android'
            : userAgent.match(/mac/i)
              ? 'macbook'
              : 'windows',
        },
      }
      : {
        method: apiMethod,
        headers: {
          token: token ? token : null,
          'Content-Type': 'application/json',
          latitude: localStorage.getItem('lat')?.toString(),
          longitude: localStorage.getItem('long')?.toString(),
          ip: localStorage.getItem('ip')?.toString(),
          'user-Agent': userAgent,
          devicetype: userAgent.match(/Android/i)
            ? 'android'
            : userAgent.match(/mac/i)
              ? 'macbook'
              : 'windows',
        },
        body: JSON.stringify(body),
      };

  return fetch(siteUrl + url, init)
    .then((res) =>
      res.json().then((data) => {
        var apiData = {
          status: res.status,
          data: data,
        };
        return apiData;
      })
    )
    .catch((err) => {
      return 'error';
    });
}
