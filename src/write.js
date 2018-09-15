const fs = require("fs")


const writeAPI = async (data, version) => {
  let directory = './data/'
  let versionFilename = 'release-' + version + '.json'
  let tempAllFilename = 'release-temp-all.json'
  let allFilename = 'release-all.json'
  let versionPath = directory + versionFilename
  let allPath = directory + allFilename
  let tempAllPath = directory + tempAllFilename


  let stringified = JSON.stringify(data)
  fs.writeFile(versionPath , stringified, "UTF-8", (err) => {
    if (err) throw err;
    console.log('[log] typeof stringified: ' + typeof stringified)
    console.log('[log] ' + versionFilename + ' has been written!');
  })
    
  fs.appendFile(allPath, stringified, function(err) {
    if (err) throw err
  })
}

module.exports = writeAPI