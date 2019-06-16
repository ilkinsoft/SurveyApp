var jsonwebtoken = require('jsonwebtoken');

const mySecret = 'HiIamSecret';

class JwtTokenHelper {

    generate(user) {
        let token = jsonwebtoken.sign(user, mySecret);
        return token;
    }

    verify(token) {
        let user = jsonwebtoken.verify(token, mySecret);
        return user;
    }

}

module.exports = new JwtTokenHelper();


