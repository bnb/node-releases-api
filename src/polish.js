let moment = require("moment")

const now = moment()

const polishData = (raw, version) => {
  let moments = {
    end: moment(raw.end), // Release Line End Date
    total: moment(raw.end).diff(raw.start) / 1000 / 60 / 60 / 24, // Difference between `start` and `end`
    daysIn: now.diff(raw.start) / 1000 / 60 / 60 / 24, // How many days have elapsed since `start`
    start: moment(raw.start), // Release Line Start Date
    lts: moment(raw.lts), // LTS start date
    maintenance: moment(raw.maintenance), // Maintenance start date
    eol: moment(raw.end), // EOL date
  }

  // Calculation data to make numbers more consumable
  let calculations = {
    total: Math.round(moments.total - 0.5),
    daysIn: Math.round(moments.daysIn - 0.5),
    daysLeft: Math.round((moments.total - moments.daysIn) - 0.5),
    percentage: Math.round(moments.daysIn / moments.total * 100 - 0.5)
  }

  // Logic for assigning release lines current status.
  if(now.isBefore(moments.start)) {
    var releaseLineStatus = "Pre-release"
  } else if (now.isBetween(moments.start, moments.lts)) {
    var releaseLineStatus = "Current"
  } else if(now.isBetween(moments.lts, moments.maintenance)) {
    var releaseLineStatus = "LTS"
  } else if(now.isBetween(moments.maintenance, moments.eol)) {
    var releaseLineStatus = "Maintenance"
  } else if(now.isSameOrAfter(moments.eol)) {
    var releaseLineStatus = "End of Life"
  }

  let finalData = {
    version: version, // Release Line
    codename: raw.codename ? raw.codename : "Not yet assigned!",
    total: calculations.total, // 
    daysIn: calculations.daysIn,
    daysLeft: calculations.daysLeft,
    percentage: calculations.percentage,
    status: releaseLineStatus
  }

  return finalData
}

module.exports = polishData