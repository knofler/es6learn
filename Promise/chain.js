const fetch = require('node-fetch')

function main({
    tz,
    start = 0,
    end = 0,
    baseUrl = 'https://abcradiolivehls-lh.akamaihd.net/i/abcextra_1@327281/master.m3u8'
}) {
    const now = new Date(),
        utcDate = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        ),
        utcTime = utcDate.getTime(),
        baseStationStartTime = now.getTime();

    console.log("now in UNIX is : ", now.getTime())
    console.log("utcDate in UNIX is : ", utcTime)

    tz = tz.toUpperCase()
    let TZStartTime = 0;
    start = start * 60000
    end = end * 60000

    return {
        timeZone: function () {
            if (tz == "AEDT") {
                TZStartTime = utcTime + 11 * 3600000
                console.log("AEDT")
            } else if (tz == "ACDT") {
                TZStartTime = utcTime + 10.5 * 3600000
                console.log("ACDT")
            } else if (tz == "ACST") {
                TZStartTime = utcTime + 9.5 * 3600000
                console.log("ACST")
            } else if (tz == "AWST") {
                TZStartTime = utcTime + 8 * 3600000
                console.log("AWST")
            } else if (tz == "AEST") {
                TZStartTime = utcTime + 10 * 3600000
                console.log("AEST")
            }
            // tz = tz == "AEDT" ? currentTime = utcTime + 11 * 3600000 :
            //     tz == "ACDT" ? currentTime = utcTime + 10.5 * 3600000 :
            //     tz == "ACST" ? currentTime = utcTime + 9.5 * 3600000 :
            //     tz == "AWST" ? currentTime = utcTime + 8 * 3600000 :
            //     tz == "AEST" ? currentTime = utcTime + 10 * 3600000 : 8 * 3600000;
            console.log("current time is : ", TZStartTime)

            return {
                controlStream: function () {

                    console.log("start: ", start, "end : ", end)
                    let dvrConstraint = 180 * 60000
                    console.log("dvrConstraint is :", dvrConstraint)
                    const dvrStart = baseStationStartTime - 180 * 60000;
                    console.log("dvrStart is :", dvrStart)

                    //check if start and end being defined by the client
                    if (start !== 0 && end !== 0) {
                        start = start > dvrConstraint ? dvrConstraint :
                            start <= 0 ? dvrConstraint : start
                        end = end >= dvrConstraint ? 60000 :
                            end <= 0 ? end : end
                        console.log("After check start is : ", start / 60000, "end is: ", end / 60000)
                    }

                    let customUrl = baseUrl;

                    console.log("customUrl: ", customUrl)
                    return {
                        getURL: function () {
                            console.log("TZStartTime:: ", TZStartTime, "endTime:: ", baseStationStartTime);
                            //Check if DST and Base Sydney time difference is less then 10 seconds, then it is a live stream
                            if (baseStationStartTime - TZStartTime < 10000) {
                                console.log("Its a Sydney TZ and live stream and base stream has less then 10 sec difference")
                                //User defined custom start and end time
                                if (start > 0 && end > 0) {
                                    customUrl += "?start=" + (baseStationStartTime - start) / 1000 + "&end=" + (baseStationStartTime - end) / 1000
                                    console.log("Customer defined Base sydney stream")
                                } else {
                                    customUrl += "?start=" + TZStartTime / 1000
                                    console.log("No custom start end time defined in sydney")
                                }

                            } else {
                                //User defined custom start and end time
                                if (start > 0 && end > 0) {
                                    customUrl += "?start=" + (baseStationStartTime - start) / 1000 + "&end=" + (baseStationStartTime - end) / 1000
                                    console.log("Customer defined start and end in other Time zone")
                                } else {
                                    customUrl += "?start=" + TZStartTime / 1000 + "&end=" + baseStationStartTime / 1000
                                    console.log("No custom start end time defined in other TZ")
                                }
                            }
                            console.log("customUrl is : ", customUrl)
                            return {
                                stream: async function runStream() {
                                    const stream = await fetch(customUrl);
                                    console.log("customStream: ", stream)
                                }
                            }
                        }
                    }
                }
            }
        }
    }


}

console.log(main({
        tz: 'AEDT',
        start: 81,
        end: 21
    })
    .timeZone()
    .controlStream()
    .getURL()
    .stream());