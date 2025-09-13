const app = require('./server');
const logger = require('./logger/logger');
const db = require('./model');

const port = process.env.PORT || 3000;

// db.sequelize.sync({ force: true }).then(() => {
//     app.listen(port, () => {
//         logger.info(`App listening at http://localhost:${port}`);
//     });
// }).catch(err => {
//     logger.error('Failed to sync database:', err);
//     process.exit(1);
// });

app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`);
});
