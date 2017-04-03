const host = process.env.MONGODB_HOST || 'localhost';
const port = process.env.MONGODB_PORT || '27017';
const dbName = process.env.MONGODB_DATABASE || 'e2e';

export default require('pow-mongodb-fixtures').connect(dbName, {
  host,
  port
});
