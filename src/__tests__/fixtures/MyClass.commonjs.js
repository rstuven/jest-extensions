module.exports = class NotDefaultClass {

  constructor(a, b, c) {
    this.init(a, b, c)
  }

  init() {
    return new Date
  }

  now() {
    return new Date
  }

  async getFromApi(date) {
    // asynchronously request external API
  }

  async getNowData() {
    return await this.getFromApi(this.now())
  }

}
