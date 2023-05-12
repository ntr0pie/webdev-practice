const express = require('express');
const app = express();
const port = process.env.PROCESS || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
})
app.listen(port, () => {
    console.log(`[Server] Listening to port ${port}`);
})