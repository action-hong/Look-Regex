const list = [
  {
    id: 'goRegex101',
    title: 'Go Regex 101',
    url: (regex) => {
      return `https://regex101.com/?regex=${encodeURIComponent(regex.source)}&flag=${encodeURIComponent(regex.flags)}`
    }
  },
  {
    id: 'gegulex',
    title: 'Gegulex',
    url: (regex) => {
      return `https://jex.im/regulex/#!flags=${encodeURIComponent(regex.flags)}&re=${encodeURIComponent(regex.source)}`
    }
  },
  {
    id: 'regexper',
    title: 'REGEXPER',
    url: (regex) => {
      return `https://regexper.com/#${encodeURIComponent(regex.source)}`
    }
  }
]

list.forEach(item => {
  chrome.contextMenus.create({
    id: item.id,
    title: item.title,
    contexts: ['selection'],
  })
})

// https://developer.chrome.com/docs/extensions/reference/contextMenus/#event-onClicked
chrome.contextMenus.onClicked.addListener((info) => {
  const item = list.find(item => item.id === info.menuItemId)
  if (item) {
    const regex = new RegExp(info.selectionText)
    chrome.tabs.create({
      url: item.url(regex)
    })
  }
})