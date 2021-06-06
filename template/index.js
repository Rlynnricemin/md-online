(function(){
  const path = process.env.dir.split('/').slice(-1)[0]
  const el_list = document.getElementById('list')
  const el_content = document.getElementById('content')
  let currenthash = window.location.hash.slice(1)
  document.title = currenthash.split('/').slice(-1)
  let firstfile = '' || process.env.file.replace(/\.md$/, '')

  const getContent = (type) => {
    import(`../temp/${path}/${type}.md`).then((res) => {
      el_content.innerHTML = res.default
    })
  }

  const getLocalCotent = () => {
    if (!document.location.hash.slice(2)) return
    getContent(document.location.hash.slice(2))
  }

  const changeHash = (url) => {
    window.location.hash = '#' + url
    document.title = url.split('/').slice(-1)
  }

  const setListItemOn = () => {
    if (currenthash) el_list.querySelector(`[data-path="${currenthash}.md"]`).removeAttribute('class', 'on')
    if (!window.location.hash) return
    currenthash = window.location.hash.slice(1)
    if (el_list.querySelector(`[data-path="${currenthash}.md"]`)) el_list.querySelector(`[data-path="${currenthash}.md"]`).setAttribute('class', 'on')
  }
  
  const generateList = (data) => {
    let ul = ''
    data.forEach(element => {
      if (element.filename) {
        ul += `<li data-path="${element.path}">${element.filename}`
        if (!firstfile) firstfile = element.path
      }
      if (element.dirname) ul += `<li class="dir">${element.dirname}`
      if (element.children) {
        ul += `<ul>`
        ul += generateList(element.children)
        ul += `</ul>`
      }
      ul += `</li>`
    });
    return ul
  }

  process.env.uuid ? import(`../${process.env.uuid}.json`).then((res) => {
    let ul = '<ul class="con-list">' + generateList(res.default) + '</ul>'
    el_list.innerHTML = ul
    el_list.style.display = ''
    if (!currenthash && firstfile) {
      currenthash = firstfile.replace(/.md$/, '')
      changeHash(currenthash)
    }
    setListItemOn()
    el_list.onclick = (e) => {
      const path = e.target.getAttribute('data-path')
      if (path) {
        changeHash(path.replace(/.md$/, ''))
      }
    }
  }) : el_list.remove()


  if (firstfile) {
    changeHash(`/${firstfile}`)
  }

  getLocalCotent()

  window.onhashchange = () => {
    getLocalCotent()
    setListItemOn()
  }
}())