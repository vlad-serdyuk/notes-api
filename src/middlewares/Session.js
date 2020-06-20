class Session {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  getToken() {
    return this.request.cookies['jwt'] || '';
  }

  setToken(token) {
    if (!token) {
      return;
    }

    const cookieOptions = {
      httpOnly: true,
      // use secure flag in production to send only via encrypted connections
      // secure: true,
      // domain: 'example.com', //set your domain
    };
    
    this.response.cookie('jwt', token, cookieOptions);
  }

  removeToken() {
    this.response.clearCookie('jwt');
  }
}

const sessionMiddleware = function(request, response, next) {  
  request.session = new Session(request, response);
  next();
}

module.exports = sessionMiddleware;