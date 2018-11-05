const fetch = require('node-fetch')
const RequestStream = require('./RequestStream');
const fs = require('fs')

let RS = new RequestStream()

function getURL({
    state = "NSW",
    baseUrl = 'https://abcradiolivehls-lh.akamaihd.net/i/abcextra_1@327281/master.m3u8',
    baseStationStartTime = new Date().getTime()
}) {
    state = state.toUpperCase()
    //Lets check the default values
    console.log("baseStationStartTime:", baseStationStartTime);
    console.log("baseUrl:", baseUrl)
    console.log("state is :", state)


    let timeGap = 0;
    state == "WA" ? timeGap = 3 * 3600000 :
        state == "QLD" ? timeGap = 1 * 3600000 :
        state == "NSW" ? timeGap = 0 : timeGap = 0

    let startTime = baseStationStartTime - timeGap
    console.log("startTime:: ", startTime, "endTime:: ", baseStationStartTime);

    let customUrl = baseUrl + "?start=" + startTime / 1000 + "&end=" + baseStationStartTime / 1000

    return customUrl
}

function controlStream(start, end) {
    const baseUrl = "https://abcradiolivehls-lh.akamaihd.net/i/abcextra_1@327281/master.m3u8";

    let baseStationTime = new Date().getTime();
    console.log("baseStationTime is :", baseStationTime)
    start = start * 60000
    end = end * 60000
    console.log("start: ", start, "end : ", end)
    let dvrConstraint = 180 * 60000
    console.log("dvrConstraint is :", dvrConstraint)
    const dvrStart = baseStationTime - 180 * 60000;
    console.log("dvrStart is :", dvrStart)

    start = start > dvrConstraint ? dvrConstraint :
        start <= 0 ? dvrConstraint : start

    end = end >= dvrConstraint ? 60000 :
        end <= 0 ? end : end

    console.log("After check start is : ", start / 60000, "end is: ", end / 60000)

    let customUrl = baseUrl + "?start=" + (baseStationTime - start) / 1000 + "&end=" + (baseStationTime - end) / 1000;
    console.log("customUrl: ", customUrl)
    return customUrl
}


function DST(tz) {
    const now = new Date(),
        utcDate = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        ),
        utcTime = utcDate.getTime()
    // console.log("now is : ", now)
    // console.log("utcDate is : ", utcDate)

    console.log("now in UNIX is : ", now.getTime())
    console.log("utcDate in UNIX is : ", utcTime)


    tz = tz.toUpperCase()
    let currentTime = 0;
    if (tz == "AEDT") {
        currentTime = utcTime + 11 * 3600000
        console.log("AEDT")
    } else if (tz == "ACDT") {
        currentTime = utcTime + 10.5 * 3600000
        console.log("ACDT")
    } else if (tz == "ACST") {
        currentTime = utcTime + 9.5 * 3600000
        console.log("ACST")
    } else if (tz == "AWST") {
        currentTime = utcTime + 8 * 3600000
        console.log("AWST")
    } else if (tz == "AEST") {
        currentTime = utcTime + 10 * 3600000
        console.log("AEST")
    }
    // tz = tz == "AEDT" ? currentTime = utcTime + 11 * 3600000 :
    //     tz == "ACDT" ? currentTime = utcTime + 10.5 * 3600000 :
    //     tz == "ACST" ? currentTime = utcTime + 9.5 * 3600000 :
    //     tz == "AWST" ? currentTime = utcTime + 8 * 3600000 :
    //     tz == "AEST" ? currentTime = utcTime + 10 * 3600000 : 8 * 3600000;

    console.log("current time is : ", currentTime)
    return currentTime;
}


async function runStream(url) {
    console.log("url is :", url)
    const stream = await fetch(url);
    console.log("customStream: ", stream)
    return await stream;
}

DST('AWST');

// fetch(url)
//     .then(res => {
//         return new Promise((resolve, reject) => {
//             const dest = fs.createWriteStream('./stream.mp3');
//             res.body.pipe(dest);
//             res.body.on('error', err => {
//                 reject(err);
//             });
//             dest.on('finish', () => {
//                 resolve();
//             });
//             dest.on('error', err => {
//                 reject(err)
//             })
//         })
//     })

//a(getURL("qld"))
//runStream(a(getURL("wa")))

//getURL('nsw')
//controlStream(116, 111)
//Run controlled stream with start and end time defined
//console.log(runStream(controlStream(150, 5)));
//Run stream for specific states
// console.log(runStream(
//     getURL({
//         state: "wa"
//     })
// ));
//console.log(runStream('https://api.github.com/'))
//console.log(RS.getRequest("https:/ / www.abc.net.au / "));