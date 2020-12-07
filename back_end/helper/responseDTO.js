class ResponseDTO {
  constructor(data = null, statusCode = 200, timeStamp = Date.now(), error = [], message = []) {
    this.data = data;
    this.statusCode = statusCode;
    this.timeStamp = timeStamp;
    this.error = error;
    this.message = message;
    return this;
  }

  setStatusCode(code) {
    this.statusCode = code;
    return this;
  }

  pushError(err) {
    this.error.push(err);
    return this;
  }

  pushMessage(msg) {
    this.message.push(msg);
    return this;
  }
}

module.exports = ResponseDTO;