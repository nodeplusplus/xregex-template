import Joi from "joi";
import { LoggerType, LoggerLevel } from "@nodeplusplus/xregex-logger";

export const middlewares = Joi.array().items(
  Joi.object({
    id: Joi.string().required().required(),
    priority: Joi.number().required(),
    options: Joi.object().optional().unknown(true),
  })
);

export const connection = Joi.object({
  uri: Joi.string().uri().required(),
  database: Joi.string().required(),
  collection: Joi.string(),
  clientOpts: Joi.object().optional().unknown(true),
}).required();

export const validators = Joi.object({
  CONNECTIONS: Joi.object({
    FILE: Joi.object({
      uri: Joi.string().required(),
    }),
    REDIS: connection,
    MONGODB: connection,
    RABBITMQ: Joi.object({
      uri: Joi.string().uri().required(),
      clientOpts: Joi.object().optional().unknown(true),
    }),
  }).required(),
  logger: Joi.object({
    type: Joi.string()

      .required()
      .allow(Object.values(LoggerType)),
    options: Joi.object({
      level: Joi.string().allow(Object.values(LoggerLevel)),
      name: Joi.string(),
    }),
  }).required(),
}).unknown(true);
