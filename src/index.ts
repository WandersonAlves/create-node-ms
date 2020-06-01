import 'reflect-metadata';
import server from './presentation/server';

server.listen(8080, () => {
  console.log('Server started at 8080');
});