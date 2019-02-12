const glob = require('glob')
const path = require('path')
//找寻入口文件
const input_path = path.resolve(__dirname, '../src/views/*/index.js')
const entries = glob.sync(input_path)
// ........./src/views/Index/index.js
// console.log(entries)
let pages = {}
let templates = {}
entries.map(item=>{
  const split_name = item.split('/')
  pages[split_name[split_name.length - 2]] = item
  templates[split_name[split_name.length - 2]] = item.replace(/\.js$/,'.html')
})
exports.pages = pages
exports.templates = templates
/*
  console.log(pages)
  console.log(templates)
  { Index: 'F:/Demos/react-common-starter/src/views/Index/index.js',
    Test: 'F:/Demos/react-common-starter/src/views/Test/index.js' }
  { Index: 'F:/Demos/react-common-starter/src/views/Index/index.html',
    Test: 'F:/Demos/react-common-starter/src/views/Test/index.html' }
*/

exports.chunkPermutaions = data => {
  data = data.sort()
  const chunks = []
  for (let i = 0; i < data.length; i++) {
    const next = i + 1
    const base = data.slice(i, next)
    const others = data.slice(next)
    chunks.push(base)
    permut(base, others)
  }

  return chunks.map(item => {
    item.unshift('vendors')
    return item.join('~')
  })

  /**
   * Generate permutations
   * @param {Array} base 
   * @param {Array} others 
   */
  function permut(base, others) {
    for (let i = 0; i < others.length; i++) {
      const copy = base.slice()
      copy.push(others[i])
      chunks.push(copy)
      const rest = others.slice(i + 1)
      permut(copy, rest)
    }
  }
}