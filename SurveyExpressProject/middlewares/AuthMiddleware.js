const jwt = require('../jwtHelper/jwtTokenHelper')

class AuthenticateMiddleware {
    authenticate(req, res, next) {

        //console.log('req.url ' + req);

        console.log('req.url ' + req.url);

        if (req.url === '/users/login'
            || req.url === '/users/register' || req.url.includes( '/surveys/viewDetails') || req.url.includes( '/completeSurvey')
            ) {
            next();
            return;
        } else {
            const authHeader = req.headers.authorization

            console.log("authHeader: "+authHeader)

            if (!authHeader) {
                return res.status(403).json({
                    status: 403,
                    message: 'FORBIDDEN'
                })
            } else {
                const splitted = authHeader.split(' ');
                if (splitted.length < 2) {
                    return res.status(403).json({
                        status: 403,
                        message: 'FORBIDDEN'
                    })
                }
                const token = splitted[1];
                var user = jwt.verify(token);
                req.user=user;
                console.log(user);
                if (!user) {
                    return res.status(403).json({
                        status: 403,
                        message: 'FORBIDDEN'
                    })
                }

/*                if (req.url === '/api/users' || req.url === '/api/users/') {
                    if (!user.role || user.role != 'admin') {
                        return res.status(403).json({
                            status: 403,
                            message: 'FORBIDDEN'
                        })
                    }
                }*/

                next();
            }
        }
    }
}

module.exports = new AuthenticateMiddleware();


