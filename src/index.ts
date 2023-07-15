import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { port } from "./config";
import * as morgan from "morgan";
import { Routes } from "./routes";
import { validationResult } from "express-validator";
import errorHandler from "./middlewares/errorHandler";

/**
 * Initialize the AppDataSource to establish a connection with the PostgreSQL database
 */
AppDataSource.initialize()
  .then(async () => {
    const app = express();

    // Use the morgan middleware for logging
    app.use(morgan("tiny"));

    // Parse incoming requests with JSON payloads
    app.use(bodyParser.json());

    // Register all routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        ...route.validation,
        async (req: Request, res: Response, next: Function) => {
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }

            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            res.json(result);
          } catch (err) {
            next(err);
          }
        }
      );
    });

    // Use the custom error handler middleware
    app.use(errorHandler);

    // Start the server
    app.listen(port, () => {
      console.log(`Express server has started on port ${port}.`);
    });
  })
  .catch((error) => console.log(error));
