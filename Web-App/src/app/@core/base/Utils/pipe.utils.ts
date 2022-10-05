export const removeNullFileds = (obj: any) => {
  Object.keys(obj).forEach(key => {
    if(obj[key] === '' || obj[key] === null || obj[key] === undefined){
      delete obj[key];
    }
  })

  return obj
}
