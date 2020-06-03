import { Container } from 'inversify';
import { DataRepository } from '../entities/interfaces';
import { HTTPHandler, DatabaseConnection } from '../infra/interfaces';
import AxiosHttpHandle from '../infra/http/AxiosHttpHandler';
import GetPaymentRouter from '../presentation/express-server/routers/GetPaymentRouter';
import GetPaymentsRouter from '../presentation/express-server/routers/GetPaymentsRouter';
import InjectionReferences from './inversify.references';
import InMemoryPaymentRepository from '../entities/payment/repositories/InMemoryPaymentRepository';
import MongooseConnection from '../infra/db/mongoose/MongooseConnection';
import MongoosePaymentRepository from '../entities/payment/repositories/MongoosePaymentRepository';
import PaymentUseCase from '../domain/PaymentUseCase';

const container = new Container({ defaultScope: 'Singleton' });

// Entity
container.bind<DataRepository>(InjectionReferences.PaymentRepositoryRef).to(InMemoryPaymentRepository);

// Routes
container.bind<GetPaymentsRouter>(InjectionReferences.GetPaymentsRouterRef).to(GetPaymentsRouter);
container.bind<GetPaymentRouter>(InjectionReferences.GetPaymentRouterRef).to(GetPaymentRouter);

// Infra
container.bind<HTTPHandler>(InjectionReferences.HTTPHandlerRef).to(AxiosHttpHandle);
container.bind<DatabaseConnection>(InjectionReferences.DatabaseConnectionRef).to(MongooseConnection);

// Domain
container.bind<PaymentUseCase>(InjectionReferences.PaymentUseCaseRef).to(PaymentUseCase);

export default container;
