const fetch = require('node-fetch')

var localurl = "http://localhost:8000/status-json.xsl",
    dnOpsUrl = "http://wowza-ice-lbicecas-t28n5d2d8gzy-752305912.ap-southeast-2.elb.amazonaws.com/status-json.xsl",
    prodUrl = "http://jjj-loadbalancer-network-5b5007a4a6002723.elb.ap-southeast-2.amazonaws.com/status-json.xsl";

var status = {};
const HealthStatus = {
    "noStream": {
        stream: "None",
        health: "Unhealthy",
        code: 404
    },
    "mp3": {
        stream: "MP3",
        health: "Partial Stream Available",
        code: 503
    },
    "aac": {
        stream: "AAC",
        health: "Major Stream Available",
        code: 206
    },
    "all": {
        stream: "All Stream Running",
        health: "Healthy",
        code: 200
    }
};

// This fumction will be used as a callback function with stream data to find the stream status
function getStatus(data) {
    status = data.icestats.source == undefined ? HealthStatus.noStream :
        data.icestats.source.server_type == "audio/mp3" ? HealthStatus.mp3 :
        data.icestats.source.server_type == "audio/aac" ? HealthStatus.aac :
        HealthStatus.all;
}

//async function to fetch the stream
async function getStream(url) {
    var stream = await fetch(url)
        .then((resp) => resp.json())
        .then(getStatus)
}

getStream(prodUrl)

setTimeout(function () {
    console.log("Stream status :", status)
}, 300)