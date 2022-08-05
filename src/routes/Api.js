import Cookies from "js-cookie";

const API_URLS = {
  DIRECTDEBIT:
    "https://bvpgbe4xm0.execute-api.eu-west-2.amazonaws.com/development",
  HOUSING: "https://y1e46yws9c.execute-api.eu-west-2.amazonaws.com/development",
  ASSET: "https://xw8x2e7q06.execute-api.eu-west-2.amazonaws.com/development",
  TENURE: "https://2524go3mdg.execute-api.eu-west-2.amazonaws.com/development",
  PERSON: "https://sr1g61wye9.execute-api.eu-west-2.amazonaws.com/development",
};

const postCall = async (endpoint, url, body) => {
  try {
    let output = [];
    await fetch(`${API_URLS[endpoint]}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("hackneyToken")}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        output = data;
      });
    return output;
  } catch (error) {
    console.log(error);
  }
};

const putCall = async (endpoint, url, body) => {
  try {
    let output = [];
    await fetch(`${API_URLS[endpoint]}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("hackneyToken")}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        output = data;
      });
    return output;
  } catch (error) {
    console.log(error);
  }
};

const getCall = async (endpoint, url, config) => {
  try {
    let output = [];
    await fetch(
      `${API_URLS[endpoint]}${url}${
        config ? `?${new URLSearchParams(config)}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("hackneyToken")}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        output = data;
      });
    // const { data } =  await instance.get(url, config)
    return output;
  } catch (error) {
    console.log(error);
  }
}; // requestCall

const getHousingSearchTenant = async (params) => {
  const { personType, search, page } = params;
  return getCall("HOUSING", "/api/v1/search/persons", {
    personType,
    searchText: search,
    pageSize: 100,
    page,
  });
};

const getTenant = async (params) => {
  const { id } = params;
  return getCall("ASSET", `/api/v1/assets/${id}`, {});
};

const getProperty = async (params) => {
  const { id } = params;
  return getCall("TENURE", `/api/v1/tenures/${id}`, {});
};

const getPerson = async (params) => {
  const { id } = params;
  return getCall("PERSON", `/api/v1/persons/${id}`, {});
};

const postPerson = async (params) => {
  return postCall("PERSON", `/api/v2/persons`, params);
};

const getDirectDebits = async (params) => {
  const { TargetId } = params;
  return getCall("DIRECTDEBIT", "/api/v1/direct-debit", {
    TargetId,
  });
};

const getDirectDebit = async (params) => {
  const { id } = params;
  return getCall("DIRECTDEBIT", `/api/v1/direct-debit/${id}`);
};

const cancelDirectDebit = async (params) => {
  const { id, status, reason } = params;
  return putCall("DIRECTDEBIT", `/api/v1/direct-debit/${id}`, {
    // /direct-debit-maintenance
    status,
    reason,
  });
};

const pauseDirectDebit = async (params) => {
  const { id, status, pauseDuration, reason } = params;
  return putCall("DIRECTDEBIT", `/api/v1/direct-debit/${id}`, {
    status, // Paused
    pauseDuration,
    reason,
  });
};

const addDirectDebit = async (params) => {
  console.log(params);
  return postCall("DIRECTDEBIT", `/api/v1/direct-debit/`, params);
};

const updateDirectDebit = async (params) => {
  const { id, additionalAmount, fixedAmount, preferredDate, reason } = params;
  return putCall("DIRECTDEBIT", `/api/v1/direct-debit/${id}`, {
    additionalAmount: Number(additionalAmount),
    fixedAmount: Number(fixedAmount),
    preferredDate: Number(preferredDate),
    reason,
  });
};

export {
  getHousingSearchTenant,
  getTenant,
  getProperty,
  getPerson,
  postPerson,
  getDirectDebits,
  getDirectDebit,
  addDirectDebit,
  cancelDirectDebit,
  pauseDirectDebit,
  updateDirectDebit,
};
