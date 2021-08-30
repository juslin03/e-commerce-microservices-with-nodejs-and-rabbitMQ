const jwt = require('jsonwebtoken');

async function isAuthenticated(req, res, next) {
    const token = await req.headers['authorization'].split(' ')[1];

    if(!token) {
        res.json({ data: { token: 'Token not found' } });
    }else{
        jwt.verify(token, 'eyalogroup', (err, user) => {
            if(err) return res.json({data: {errors: err}});
            req.user = user;
        })
        await next();
    }
}

module.exports = isAuthenticated;