const serverUrls = {
    remote: {
        dev: "http://45.156.119.155:3002"
    },
    local: {
        dev: "http://localhost:3002"
    }
}

export function getServerUrl(category) {
    return serverUrls.remote.dev + "/" + category
}