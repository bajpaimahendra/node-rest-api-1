const checkValue = (req, res, next) => {
    let resp = req.params.id;
    if (resp == 18) {
        next();
    }
    else {
        return res.status(500).send({ message: 'User is not authentic' });
    }
}

module.exports = checkValue;