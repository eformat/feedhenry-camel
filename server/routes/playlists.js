var playlists = [
    {music: 'reggae', title: 'Reggae', id: 1},
    {music: 'tango', title: 'Chill', id: 2},
    {music: 'dubs', title: 'Dubstep', id: 3},
    {music: 'rock', title: 'Indie', id: 4},
    {music: 'heavy', title: 'Rap', id: 5},
    {music: 'slow', title: 'Cowbell', id: 6}
];

exports.findAll = function (req, res, next) {
    res.send(playlists);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(playlists[id]);
};
