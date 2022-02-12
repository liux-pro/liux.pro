// https://www.cnblogs.com/c-hao/p/3656914.html
// compositeKey('ctrl+alt+w', function (e) { console.log(e) })
function compositeKey (k, callback) {
  k = k || ''
  callback = callback || function () {
  }

  const ks = k.split('+')
  if (ks.length < 2) {
    return
  }

  document.addEventListener('keydown', function (e) {
    const ctrl = e.ctrlKey
    const shift = e.shiftKey
    const alt = e.altKey
    const keyIdent = e.key
    const az = /\w/

    if (!(ctrl || shift || alt)) {
      return
    }

    if (!az.test(keyIdent)) {
      return
    }

    if (ctrl && (!ks.includes('ctrl'))) {
      return
    }

    if (shift && (!ks.includes('shift'))) {
      return
    }

    if (alt && (!ks.includes('alt'))) {
      return
    }

    if (keyIdent.toLowerCase() === ks[ks.length - 1]) {
      callback(e)
    }
  })
}
export { compositeKey }
