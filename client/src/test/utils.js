const delay = (time) => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export { delay }
