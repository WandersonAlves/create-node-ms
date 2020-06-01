const InjectionReferences = {
  // Domain
  PaymentUseCaseRef: Symbol.for('PaymentUseCase'),
  // Infra
  HTTPHandlerRef: Symbol.for('HTTPHandler'),
  PaymentRepositoryRef: Symbol.for('PaymentRepository'),
  // Presentation
  PostPaymentRouterRef: Symbol.for('PostPaymentRouter'),
  GetPaymentsRouterRef: Symbol.for('GetPaymentsRouter'),
  CreatePaymentRouterRef: Symbol.for('CreatePaymentRouterRef'),
};

export default InjectionReferences;
