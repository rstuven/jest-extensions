const {toHaveBeenCalledTimes} = require('jest-matchers/build/spyMatchers')

module.exports = (expect) => {

  expect.extend({

    toBeCalledTimes(received, times) {
      return toHaveBeenCalledTimes(received, times)
    },

    toBeCalledOnce(received) {
      return toHaveBeenCalledTimes(received, 1)
    },

  })

}
