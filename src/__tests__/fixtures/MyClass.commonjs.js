module.exports = class NotDefaultClass {

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
