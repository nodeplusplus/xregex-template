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
  connections: Joi.object({
    file: Joi.object({
      uri: Joi.string().required(),
    }),
    redis: connection,
    mongodb: connection,
    rabbitmq: Joi.object({
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
