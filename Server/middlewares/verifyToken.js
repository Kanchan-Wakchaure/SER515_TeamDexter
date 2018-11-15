var jwt = require('jsonwebtoken');

module.exports = {
    verifyToken : (req, res,next )=> {
        var token_arr = req.headers['x-access-token'];
        //var token = token_arr[1]
        if (!token_arr) return res.status(401).send({ auth: false, message: 'You are not authorized to use this service' });
        //console.log(token_arr)
        var token = token_arr.split(" ")[1]
        //console.log("token ",token)
        jwt.verify(token, "MY_SECRET", function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate user.' });
            req.userid = decoded._id
            next()
            //res.status(200).send(decoded);
        });
    }
}