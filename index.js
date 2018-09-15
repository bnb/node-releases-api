let fetch = require("node-fetch")
let moment = require("moment")

let polishData = require("./src/polish")
let write = require("./src/write")

const releases = async () => {
console.log("[log] fetching JSON")
// Get the remote JSON
  const response = await fetch('https://raw.githubusercontent.com/nodejs/Release/master/schedule.json')
  const json = await response.json()

  for(let version in json) {
    let release = json[version]
    if(moment(release.start).isBefore() && moment(release.end).isAfter()) {
      let raw = json[version]
      write(polishData(raw, version), version)
    }
  }
}

releases()