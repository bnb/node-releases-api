const fs = require("fs")


const writeAPI = async (data, version) => {
  let directory = './data/'
  let versionFilename = 'release-' + version + '.json'
  // let tempAllFilename = 'release-temp-all.json'
  // let allFilename = 'release-all.json'
  let versionPath = directory + versionFilename
  // let allPath = directory + allFilename
  // let tempAllPath = directory + tempAllFilename


  let stringified = data.toString()
  fs.writeFile(versionPath , stringified, "UTF-8", (err) => {
    if (err) throw err;
    console.log('[log] typeof stringified: ' + typeof stringified)
    console.log('[log] ' + versionFilename + ' has been written!');
  })
  
  // TODO: This can be un-commented when data is properly propagating in the releases files and isn't [object Object]
  
  // fs.appendFile(allPath, data, function(err) {
  //   if (err) throw err
  // })
}

module.exports = writeAPI