const app = require('./app');

const PORT = process.env.PROCESS || 5000;
app.listen(PORT, () => {
  console.log(`app is running at http://localhost:${PORT}`);
});
