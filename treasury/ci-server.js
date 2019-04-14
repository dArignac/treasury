let express = require('express');
let app = express();

app.use(express.static('dist'));
app.listen(4444, () => console.log('running on port 4444'));
