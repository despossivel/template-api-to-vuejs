'use strict';

import app from './src/server.js'

const PORT = process.env.PORT || 80;

app.listen(PORT, _ => console.log(`SERVER ON-LINE NA PORTA ${PORT}`));