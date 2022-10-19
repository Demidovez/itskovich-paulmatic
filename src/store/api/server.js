const serverUrls = {
  remote: {
    http: "http://82.146.41.108:3002",
    https: window.location.origin + "/api",
  },
  local: {
    dev: "http://localhost:3002",
  },
};

export function getServerUrl(category) {
  const protocol = window.location.protocol.replace(":", "");

  return serverUrls.remote[protocol] + "/" + category;
}

export function getHeaders(additinalHeaders) {
  return {
    "caller-version-code": 1,
    sessionToken: "user-1",
    "Content-type": "application/json",
    ...additinalHeaders,
  };
}
