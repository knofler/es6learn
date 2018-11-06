const fetch = require('node-fetch')

function KIDS(
    baseUrl = 'https://abcradiolivehls-lh.akamaihd.net/i/abcextra_1@327281/master.m3u8'
) {
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

    console.log("Base URL: ", baseUrl);
    console.log("now in UNIX is : ", now.getTime())
    console.log("utcDate in UNIX is : ", utcTime)

    let TZStartTime = 0;

    return {
        baseUrl: baseUrl,
        timeZone: function (tz) {
            let userTZ = tz.toUpperCase();
            userTZ == "AEDT" ? TZStartTime = utcTime + 11 * 3600000 :
                userTZ == "ACDT" ? TZStartTime = utcTime + 10.5 * 3600000 :
                userTZ == "ACST" ? TZStartTime = utcTime + 9.5 * 3600000 :
                userTZ == "AWST" ? TZStartTime = utcTime + 8 * 3600000 :
                userTZ == "AEST" ? TZStartTime = utcTime + 10 * 3600000 : 0;

            console.log("Time Zone current time is : ", TZStartTime, "and TZ is: ", tz)

            return {
                TZStartTime: TZStartTime,
                controlStream: function (start = 0, end = 0) {
                    start = start * 60000;
                    end = end * 60000;
                    console.log("User Defined start: ", start, "User Defined end : ", end)
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

                    console.log("After time control applied, customeURL is: ", customUrl)
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
                            console.log("Time zone and time controlled applied, customeURL now is: ", customUrl)
                            return {
                                stream: async function runStream() {
                                    const stream = await fetch(customUrl);
                                    console.log("Stream OUTPUT::: ", stream)
                                }
                            }
                        }
                    }
                }
            }
        }
    }


}

KIDS().timeZone("ACDT")
    .controlStream(120, 105)
    .getURL()
    .stream();