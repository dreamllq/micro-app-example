function flat(obj) {
  var newObj = {}
  function format(o, pre) {
      for (let key in o) {
          if (typeof o[key] === 'object') {
              if (!pre) {
                  format(o[key], key)
              }else {
                  if (Array.isArray(o)) {
                      format(o[key], pre + '[' + key + ']')
                  }else {
                      format(o[key], pre + '.' + key)
                  }
              }
          }else {
              if (!pre) {
                  newObj[key] = o[key]
              }else {
                  if (Array.isArray(o)) {
                      newObj[pre + '[' + key + ']'] = o[key]
                  }else {
                      newObj[pre + '.' + key] = o[key]
                  }
              }
          }
      }
  }
  format(obj, null)
  return newObj
}
export default flat;