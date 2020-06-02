import { Container } from 'inversify';
import { DataRepository, HTTPHandler } from '../infra/interfaces';
import AxiosHttpHandle from '../infra/http/AxiosHttpHandler';
import CreatePaymentRouter from '../presentation/routers/CreatePaymentRouter';
import GetPaymentsRouter from '../presentation/routers/GetPaymentsRouter';
import InjectionReferences from './inversify.references';
import InMemoryPaymentRepository from '../models/Payment/repositories/InMemoryPaymentRepository';
import PaymentUseCase from '../domain/PaymentUseCase';
import PostPaymentRouter from '../presentation/routers/PostPaymentRouter';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<DataRepository>(InjectionReferences.PaymentRepositoryRef).to(InMemoryPaymentRepository);

container.bind<PostPaymentRouter>(InjectionReferences.PostPaymentRouterRef).to(PostPaymentRouter);
container.bind<GetPaymentsRouter>(InjectionReferences.GetPaymentsRouterRef).to(GetPaymentsRouter);
container.bind<CreatePaymentRouter>(InjectionReferences.CreatePaymentRouterRef).to(CreatePaymentRouter);

container.bind<HTTPHandler>(InjectionReferences.HTTPHandlerRef).to(AxiosHttpHandle);
container.bind<PaymentUseCase>(InjectionReferences.PaymentUseCaseRef).to(PaymentUseCase);

export default container;
