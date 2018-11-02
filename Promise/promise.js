const fetch = require('node-fetch')

//var u = new Date().toUTCString();
//console.log("Sydney time :", new Date());

function getURL(state = "nsw", baseStationTime = new Date()) {
    const baseUrl = "https://abcradiolivehls-lh.akamaihd.net/i/abcextra_1@327281/master.m3u8";
    let stateTimeGap = 0;

    state == "wa" ? stateTimeGap = -3 :
        state == "qld" ? stateTimeGap = -1 :
        state == "nsw" ? stateTimeGap = 0 : stateTimeGap = 0

    // let statetStartTimeHour = baseStationTime.getHours() + stateTimeGap
    //  console.log("baseStationTime Hour", baseStationTime.getHours())
    //  console.log("stateTimeGap: ", stateTimeGap)
    //  console.log("stateStartTime Hour", statetStartTimeHour);

    let statetStartTime = baseStationTime.setHours(stateTimeGap)
    console.log("baseStationTime", baseStationTime.setHours(0))
    console.log("stateStartTime", statetStartTime);

    let customUrl = baseUrl + "?start=" + statetStartTime
    return customUrl
}

function controlStream(start, end, baseStationTime = new Date()) {
    const baseUrl = "https://abcradiolivehls-lh.akamaihd.net/i/abcextra_1@327281/master.m3u8";
    let customUrl = "";

    const dvrStartMinute = baseStationTime.setMinutes(-180);

    console.log("dvrConstraint Minute is :", dvrStartMinute)

    console.log("start: ", start, "\n", "end: ", end)

    start > 180 || start <= 0 ? 180 : 2;
    end <= 180 || end >= start ? 0 : end;

    let startMin = baseStationTime.setMinutes(-start),
        endMin = baseStationTime.setMinutes(-end);
    console.log("startMin: ", startMin, "\n", "endMin: ", endMin)
    customUrl = baseUrl + "?start=" + startMin + "&end=" + endMin;

    return customUrl
}

function timeStream(start, end, baseStationTime = new Date()) {

    const dvrStartMinute = baseStationTime.setMinutes(-180);
    console.log("dvrConstraint Minute is :", dvrStartMinute)
    console.log("start: ", start, "\n", "end: ", end)
    start > 180 || start <= 0 ? 180 : 2;
    end <= 180 || end >= start ? 0 : end;

    let startMin = baseStationTime.setMinutes(-start),
        endMin = baseStationTime.setMinutes(-end);
    console.log("startMin: ", startMin, "\n", "endMin: ", endMin)

    return function getControlStream(url) {
        let customUrl = url + "+" + startMin + "&end=" + endMin;
        return customUrl
    }

}

async function runStream(url) {
    console.log("url is :", url)
    const stream = await fetch(url);
    console.log("customeStream: ", stream)
    //return stream
}

runStream(getURL("qld"));
//runStream(controlStream(150, 5))

//let a = timeStream(150, 5)
//a(getURL("qld"))
//runStream(a(getURL("nsw")))