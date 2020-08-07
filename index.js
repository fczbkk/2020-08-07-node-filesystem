const path = require('path')
const fs = require('fs')

const myPath = path.resolve(__dirname, 'example.txt')

// console.log('myPath', myPath)
// console.log('directory', path.dirname(myPath))
// console.log('basename', path.basename(myPath))
// console.log('extname', path.extname(myPath))

fs.readFile(myPath, {}, function (error, content) {
  if (error) {
    console.error(error)
  } else {
    const newContent = String(content).toUpperCase()

    const outputPath = path.resolve(
      path.dirname(myPath),
      'output' + path.extname(myPath)
    )
    fs.writeFile(outputPath, newContent, {}, function (error) {
      if (error) {
        console.error(error)
      } else {
        console.log('DONE')
      }
    })
  }
})
