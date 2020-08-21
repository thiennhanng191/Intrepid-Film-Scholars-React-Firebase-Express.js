
const isEmpty = (string) => {
    //if (string) {}
    if (string.trim() === '') //eliminate white spaces
        return true;
    else
        return false;
}

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx))
        return true;
    else
        return false;
}

exports.validateSignupData = (data) => {
    let errors = {};

    //validate new user's email
    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty'
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address'
    }

    //validate new user's password and confirm password
    if (isEmpty(data.password)) {
        errors.password = 'Must not be empty'
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Confirm password must match'
    }

    //validate new user's handle
    if (isEmpty(data.handle)) {
        errors.handle = 'Must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false // no key -> no error -> data is valid
    }
}

exports.validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.reduceUserDetails = (data) => { //data would be replaced by a req.body when this func gets called
    let userDetails = {};
    console.log(data.bio, data.website);

    if (data.bio) { // check if bio is provided (i.e is not undefined) -- do the same for every field
        if (!isEmpty(data.bio.trim())) {
            userDetails.bio = data.bio;
        }
    }

    if (data.website) {
        if (!isEmpty(data.website)) {
            // https://website.com
            if (data.website.trim().substring(0, 4) !== 'http') { // when the provided link doesn't have http, add it to the url
                userDetails.website = `http://${data.website.trim()}`;
            } else {
                userDetails.website = data.website;
            }
        }
    }

    if (data.location) {
        if (!isEmpty(data.location.trim())) {
            userDetails.location = data.location;
        }
    }

    if (data.favoriteFilms) {
        if (!isEmpty(data.favoriteFilms.trim())) {
            userDetails.favoriteFilms = data.favoriteFilms;
        }
    }

    if (data.favoriteGenres) {
        if (!isEmpty(data.favoriteGenres.trim())) {
            userDetails.favoriteGenres = data.favoriteGenres;
        }
    }

    if (data.favoriteQuote) {
        if (!isEmpty(data.favoriteQuote.trim())) {
            userDetails.favoriteQuote = data.favoriteQuote;
        }
    }

    if (data.movieGenres) {
        if (data.movieGenres.length > 0) {
            userDetails.movieGenres = data.movieGenres;
        }
    }

    if (data.tvGenres) {
        if (data.tvGenres.length > 0) {
            userDetails.tvGenres = data.tvGenres;
        }
    }

    return userDetails;
}