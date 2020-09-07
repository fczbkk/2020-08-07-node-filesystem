const path = require('path')
const fs = require('fs').promises

const myLogPath = path.resolve(__dirname, 'myLog.txt')

let logQueue = []
let isLoggerActive = false

function myLogger (content) {
  logQueue.push(content)
  writeToLog()
}

async function writeToLog () {
  if (!isLoggerActive) {
    isLoggerActive = true
    const currentLogQueue = [...logQueue]
    logQueue = []
    const content = await fs.readFile(myLogPath, { flags: 'a' })
    const contentLines = String(content).split('\n')
    const newContent = [...contentLines, ...currentLogQueue].slice(-10)
    console.log(newContent)
    await fs.writeFile(myLogPath, newContent.join('\n'))
    isLoggerActive = false
    if (logQueue.length > 0) {
      setTimeout(writeToLog, 0)
    }
  }
}

/*
myLogger('aaa')
myLogger('bbb')
myLogger('ccc')
myLogger('ddd')
myLogger('eee')
myLogger('fff')
myLogger('ggg')
myLogger('hhh')
myLogger('iii')
myLogger('jjj')
myLogger('kkk')
myLogger('lll')
*/

function startRandomCalls (fn, {delay = 100, probability = 0.1} = {}) {
  let id = 0
  setInterval(function () {
    const random = Math.random()
    if (random < probability) {
      fn({
        message: 'random call',
        id: ++id,
        timestamp: Date.now()
      })
    }
  }, delay)
}

startRandomCalls(({message, id, timestamp}) => {
  console.log('made random call', id, timestamp)
  writeToLog(message)
})
