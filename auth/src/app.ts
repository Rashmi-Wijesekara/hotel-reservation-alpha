import express from "express";
import { json } from "body-parser";
import { unhandledRouteMiddleware, errorMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";

import { userRouter } from "./routes/user-routes";

const app = express();

app.use(json());

app.use(cookieSession({
    signed: false,
    secure: false
}));

// user router
app.use("/api/users", userRouter);

// unhandled router
app.use(unhandledRouteMiddleware);

// error middleware
app.use(errorMiddleware);

export { app };