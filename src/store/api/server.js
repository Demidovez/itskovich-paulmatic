const serverUrls = {
  remote: {
    http: "http://45.156.119.155:3002",
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
