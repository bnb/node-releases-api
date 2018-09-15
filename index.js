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

// let buildRelease = function() {
//   let releaseData = fetch('https://raw.githubusercontent.com/nodejs/Release/master/schedule.json')
//   .then(res => res.json())
//   .then(json => {

    // const data = Object.keys(json).filter(v => {
    //   let release = json[v]

    //   if(moment(release.start).isBefore() && moment(release.end).isAfter()) return true
    //   return false
//     }).map(v => {
//       let raw = json[v]
    
      // let rawMomentData = {
      //   end: moment(raw.end), // Release Line End Date
      //   total: moment(raw.end).diff(raw.start) / 1000 / 60 / 60 / 24, // Difference between `start` and `end`
      //   daysIn: now.diff(raw.start) / 1000 / 60 / 60 / 24, // How many days have elapsed since `start`
      //   start: moment(raw.start), // Release Line Start Date
      //   lts: moment(raw.lts), // LTS start date
      //   maintenance: moment(raw.maintenance), // Maintenance start date
      //   eol: moment(raw.end), // EOL date
      // }

      // // Calculation data to make numbers more consumable
      // let calculatingData = {
      //   total: Math.round(rawMomentData.total - 0.5),
      //   daysIn: Math.round(rawMomentData.daysIn - 0.5),
      //   daysLeft: Math.round((rawMomentData.total - rawMomentData.daysIn) - 0.5),
      //   percentage: Math.round(rawMomentData.daysIn / rawMomentData.total * 100 - 0.5)
      // }
      
      // // Logic for assigning release lines current status.
      // if(now.isBefore(rawMomentData.start)) {
      //   var releaseLineStatus = "Pre-release"
      // } else if (now.isBetween(rawMomentData.start, rawMomentData.lts)) {
      //   var releaseLineStatus = "Current"
      // } else if(now.isBetween(rawMomentData.lts, rawMomentData.maintenance)) {
      //   var releaseLineStatus = "LTS"
      // } else if(now.isBetween(rawMomentData.maintenance, rawMomentData.eol)) {
      //   var releaseLineStatus = "Maintenance"
      // } else if(now.isSameOrAfter(rawMomentData.eol)) {
      //   var releaseLineStatus = "End of Life"
      // }

      // Assigning final data
      // let finalData = {
      //   version: v, // Release Line
      //   codename: raw.codename ? raw.codename : "Not yet assigned!",
      //   total: calculatingData.total, // 
      //   daysIn: calculatingData.daysIn,
      //   daysLeft: calculatingData.daysLeft,
      //   percentage: calculatingData.percentage,
      //   status: releaseLineStatus
      // }
//       return finalData
//     })  
//     return JSON.stringify(data, null, 2)
//   })
//   .then(
//     // Write the file
//     data =>
   
    // fs.writeFile('./data/' + "release.json", data, (err) => {
    //   if (err) throw err;
    //   console.log('releases.json has been written!');
    // })
//   )
//   .catch()
// } 

// buildRelease()

// module.exports = buildRelease