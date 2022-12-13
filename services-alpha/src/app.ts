import express from "express";
import { json } from "body-parser";
import { currentUserMiddleware, errorMiddleware, unhandledRouteMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";

import { roomRoutes } from "./routes/room-routes";
import { roomTypeTagRouter } from "./routes/roomtype-tag-routes";
import { restaurentTagRouter } from "./routes/restaurent-tag-routes";
import { resturentRouter } from "./routes/restaurent-routes";

const app = express();

app.use(json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));

// decode and set the current user result to response
app.use(currentUserMiddleware);

app.use("/api/services/rooms", roomRoutes);
app.use("/api/services/roomtags", roomTypeTagRouter);
app.use("/api/services/restaurents", resturentRouter);
app.use("/api/services/restaurenttags", restaurentTagRouter);

app.use(unhandledRouteMiddleware);

app.use(errorMiddleware);

export { app };