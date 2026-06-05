import express from "express";

import cors from "cors";

import bookRoutes
from "./routes/bookRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    express.static("src/public")
);

app.use(
    "/api/books",
    bookRoutes
);

export default app;