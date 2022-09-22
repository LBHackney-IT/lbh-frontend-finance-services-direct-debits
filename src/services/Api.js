import Cookies from "js-cookie";

const API_URLS = {
  HOUSING: API_HOUSING_DEVELOPMENT,
  ASSET: API_ASSET_DEVELOPMENT,
  TENURE: API_TENURE_DEVELOPMENT,
  PERSON: API_PERSON_DEVELOPMENT,
  DIRECTDEBIT: API_DIRECT_DEBIT_DEVELOPMENT,
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
