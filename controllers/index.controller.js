console.log('--- index controller included ---');

const index = (req, res, next) => {
    let myId = req.params.id;
    return res.json({ message: myId });
}

module.exports = index;