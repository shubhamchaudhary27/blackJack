exports.responseFlags = {
    PARAMETER_MISSING: 400,
    ACTION_COMPLETE: 200,
    BAD_REQUEST: 400,
    SESSION_EXPIRED: 401
};

exports.responseMessages = {
    INVALID_ACCESS_TOKEN: "Session expired. Please logout and login again",
    INVALID_AUTHORISATION: "YOU ARE NOT AUTHORISESD TO PERFORM THIS ACTION",
    INVALID_CREDENTIALS: "Wrong email or password",
    ACTION_COMPLETE: "Success",
    INCORRECT_PASSWORD: "Old password sent is not correct",
    INSUFFICIENT_INFORMATION: "Insufficient information is supllied",
    EMAIL_ALREADY_EXISTS: "Entered email already exits.",
    INVALID_GAME: "Game doesnot exist."
};


exports.deviceType = {
    ANDROID: 1,
    IOS: 2,
    PANNEL: 3
};

exports.loginStatus = {
    isLoggedIn: 1,
    isLoggedout: 0
};

exports.userType = {
    user: 1,
    dealer: 2
};

exports.gameConstants = {
    pack: 3,
    suits: ["spades", "diamonds", "clubs", "hearts"],
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
}





