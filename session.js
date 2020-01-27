

const isLogged = (req, type) => {
    if(type == "user") {
        if(typeof(req.cookies.jwttoken) == "undefined") {
            return false;
        } else {
            return true;
        }
    } else if (type == "admin") {
        if(typeof(req.cookies.admintoken) == "undefined") {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = {isLogged: isLogged};