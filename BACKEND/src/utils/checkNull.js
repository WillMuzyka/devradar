module.exports = (base, check) => {
    if (!check.techs) check.techs = base.techs
    if (!check.name) check.name = base.name
    if (!check.bio) check.bio = base.bio
    if (!check.avatar_url) check.avatar_url = base.avatar_url
    if (check.location.coordinates = [0, 0]) check.location = base.location
}