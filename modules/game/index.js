const validator = require('./validator');
const routeHandler = require('./routeHandler');

app.post('/game', validator.startGame, routeHandler.startGame);
app.put('/game', validator.endGame, routeHandler.endGame);
app.get('/game/card', validator.getNewCard, routeHandler.getNewCard);

