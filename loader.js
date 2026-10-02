/* Likwiid Direct embed loader.
   Usage on any site:
     <div id="likwiid-direct"></div>
     <script src="https://YOUR-DEMO-ORIGIN/loader.js" data-slug="quinta-likwiid" defer></script>
   Optional attributes: data-target (CSS selector, default #likwiid-direct),
   data-lang, data-theme ("light" or "dark").
   The widget runs inside an iframe so it can never conflict with the host
   page's styles or scripts, and auto-sizes itself via postMessage. */
;(function () {
  var script = document.currentScript
  if (!script) {
    var scripts = document.getElementsByTagName('script')
    script = scripts[scripts.length - 1]
  }
  var slug = script.getAttribute('data-slug') || 'quinta-likwiid'
  var lang = script.getAttribute('data-lang') || ''
  var theme = script.getAttribute('data-theme') || ''
  var targetSel = script.getAttribute('data-target') || '#likwiid-direct'

  var base = script.src.replace(/loader\.js(\?.*)?$/, '')
  var url = base + '?embed=1&slug=' + encodeURIComponent(slug)
  if (lang) url += '&lang=' + encodeURIComponent(lang)
  if (theme) url += '&theme=' + encodeURIComponent(theme)

  function mount() {
    var target = document.querySelector(targetSel)
    if (!target) return
    var frame = document.createElement('iframe')
    frame.src = url
    frame.title = 'Likwiid Direct booking'
    frame.style.width = '100%'
    frame.style.border = '0'
    frame.style.display = 'block'
    frame.style.minHeight = '640px'
    frame.style.borderRadius = '16px'
    frame.setAttribute('loading', 'lazy')
    frame.setAttribute('allow', '')
    target.appendChild(frame)

    window.addEventListener('message', function (event) {
      var origin = new URL(base, window.location.href).origin
      if (event.origin !== origin) return
      var data = event.data
      if (data && data.type === 'lkd:height' && typeof data.height === 'number') {
        frame.style.height = Math.max(480, Math.ceil(data.height)) + 'px'
        frame.style.minHeight = '0'
      }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount)
  } else {
    mount()
  }
})()
