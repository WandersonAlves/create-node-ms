import 'reflect-metadata';
import { AddressInfo } from 'net';
import { logger } from '@shared/Logger';
import server from '@server/index';

const SERVICE_PORT = 3000;

const serve = server.listen(SERVICE_PORT, () => {
  const { address, port } = serve.address() as AddressInfo;

  logger.info(`Server started on ${address}:${port}`);
});
