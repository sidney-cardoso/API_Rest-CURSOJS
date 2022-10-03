import app from './app';

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}!`);
});
