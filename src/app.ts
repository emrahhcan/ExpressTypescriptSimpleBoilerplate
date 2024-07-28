import express, { NextFunction, Request, Response } from 'express';
import os from 'os';

import { isDatabaseConnected } from '../libs/config/db.config';
import { ApiAccessMiddleware } from '../libs/common/middleware/api-access.middleware';
import {
  FAIL_RESPONSE_STR,
  SUCCESS_RESPONSE_STR,
} from '../libs/common/constant/response.constant';
import DomainController from './domain/domain.controller';

const app = express();
const apiAccessMiddleware = new ApiAccessMiddleware();

app.use((req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (data: any): Response {
    const formattedData = {
      message: res.statusCode < 400 ? SUCCESS_RESPONSE_STR : FAIL_RESPONSE_STR,
      path: req.originalUrl,
      statusCode: res.statusCode,
      content: data,
    };
    return originalJson.call(res, formattedData);
  };

  next();
});

app.get('/v1', (_req: Request, res: Response) => {
  return res.status(200).json('Sample API Version 1');
});
app.get(
  '/v1/health',
  apiAccessMiddleware.validateSomeApiKey,
  (_req: Request, res: Response) => {
    const databaseHealthy = isDatabaseConnected();
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const loadAverage = os.loadavg();
    const cpus = os.cpus();
    const cpuUsage = cpus.map((cpu, index) => ({
      core: index,
      model: cpu.model,
      speed: cpu.speed,
      times: cpu.times,
    }));

    const healthStatus = {
      status: databaseHealthy ? 'Healthy' : 'Unhealthy',
      uptime: `${Math.floor(uptime / 60)} minutes ${Math.floor(uptime % 60)} seconds`,
      memoryUsage: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external,
      },
      loadAverage: loadAverage,
      cpuUsage: cpuUsage,
      database: databaseHealthy ? 'Healthy' : 'Unhealthy',
    };

    const statusCode = databaseHealthy ? 200 : 503;

    return res.status(statusCode).json(healthStatus);
  }
);

app.use('/v1/domain', DomainController);

app.use((_req: Request, res: Response) => {
  return res.status(404).json('404 - Not Found');
});

export default app;
