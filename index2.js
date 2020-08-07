const path = require('path')
const fs = require('fs').promises

const myPath = path.resolve(__dirname, 'example.txt')

function constructOutputPath (originalPath) {
  return path.resolve(
    path.dirname(originalPath),
    'output' + path.extname(originalPath)
  )
}

function writeOutput ({path, content}) {
  return fs.writeFile(path, content)
}

function handleContent (content) {
  return {
    path: constructOutputPath(myPath),
    content: String(content).toUpperCase()
  }
}

fs.readFile(myPath, {})
  .then(handleContent)
  .then(writeOutput)
  .then(() => console.log('done'))
  .catch(console.error)

/*
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
*/
