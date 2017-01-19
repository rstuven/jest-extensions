module.exports = class NotDefaultClass {

  constructor(a, b, c) {
    console.log(this.now(a, b, c))
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
