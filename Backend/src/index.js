"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const axios = require("axios");
const PORT = 4000;
dotenv.config();
app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
//# sourceMappingURL=index.js.map