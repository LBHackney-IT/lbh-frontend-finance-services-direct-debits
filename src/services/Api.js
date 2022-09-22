import Cookies from "js-cookie";

const API_URLS = {
  DIRECTDEBIT:
    "https://bvpgbe4xm0.execute-api.eu-west-2.amazonaws.com/development",
  HOUSING: "https://y1e46yws9c.execute-api.eu-west-2.amazonaws.com/development",
  ASSET: "https://xw8x2e7q06.execute-api.eu-west-2.amazonaws.com/development",
  TENURE: "https://2524go3mdg.execute-api.eu-west-2.amazonaws.com/development",
  PERSON: "https://sr1g61wye9.execute-api.eu-west-2.amazonaws.com/development",
};

const fetchCall = async (url, method, body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("hackneyToken")}`,
    },
  };

  if (method !== "GET") {
    config.method = method;
  }
  if (method !== "GET") {
    config.body = JSON.stringify(body);
  }

  try {
    return await fetch(url, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  } catch (e) {
    console.log(e);
  }
};

const postCall = (endpoint, url, body) => {
  return fetchCall(`${API_URLS[endpoint]}${url}`, "POST", body);
};

const putCall = (endpoint, url, body) => {
  return fetchCall(`${API_URLS[endpoint]}${url}`, "PUT", body);
};

const getCall = (endpoint, url, config) => {
  return fetchCall(
    `${API_URLS[endpoint]}${url}${
      config ? `?${new URLSearchParams(config)}` : ""
    }`,
    "GET",
    ""
  );
};

export { postCall, putCall, getCall };
