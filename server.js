const connectToDB = require('./db.js');

process.on('uncaughtException', err => {
  console.log('Shutting down app...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./index');

const PORT = process.env.PORT || 5000;

connectToDB();

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}.`);
});

process.on('unhandledRejection', err => {
  console.log('Shutting down app...');
  console.log(err.name, err.message);
  process.exit(1);
});

