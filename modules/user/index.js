const validator = require('./validator');
const routeHandler = require('./routeHandler');

app.post('/user/signup', validator.signup, routeHandler.signup);
app.post('/user/login',   validator.login, routeHandler.login);
app.get('/user/history',   validator.history, routeHandler.history);

