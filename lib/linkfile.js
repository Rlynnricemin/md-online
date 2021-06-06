const { resolve } = require('path')
const spawn = require('child_process').spawn

const { runCommand } = require('../utils/common')
runCommand('ln', ['-s', `${process.env.currentdir}/`, `${resolve('./')}/temp/`])


const renderFile = (tempdir, url) => {
  return tempdir[url + ':'].map((f) => {
    if (/\.md$/.test(f)) {
      return {
        filename: f,
        path: `${url}/${f}`.replace(process.env.currentdir, '')
      }
    } else if (tempdir[`${url}/${f}:`]) {
      return {
        dirname: f,
        children: renderFile(tempdir, `${url}/${f}`).filter((content) => content !== '')
      }
    } else {
      return ''
    }
  })
}

if (!process.env.list) return

runCommand('ls', ['-R', `${process.env.currentdir}`], {stdio: 'pipe'}).then((res) => {
  if (res) {
    const baseurl = process.env.currentdir
    const arr = res.split('\n').join(',').split(',,')
    let tempdir = {}
    
    arr.forEach((element, index) => {
      let tbaseurl = index === 0 ? (baseurl + ':') : element.split(',')[0]
      element.split(',').forEach((e, index) => {
        if (!tempdir[tbaseurl]) {
          tempdir[tbaseurl] = []
        }
        if (index > 0) tempdir[tbaseurl].push(e)
      })
    });

    const dirjson = JSON.stringify(renderFile(tempdir, baseurl)).replace(/\"/g, '\\"').replace(/\{/g, '\\{').replace(/\}/g, '\\}')
    runCommand('echo', [dirjson, '>>', `${process.env.uuid}.json`])
  }
})

