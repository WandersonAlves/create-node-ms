const InjectionReferences = {
  // Domain
  PaymentUseCaseRef: Symbol.for('PaymentUseCase'),
  // Infra
  HTTPHandlerRef: Symbol.for('HTTPHandler'),
  DatabaseConnectionRef: Symbol.for('DatabaseConnection'),
  // Entity
  PaymentRepositoryRef: Symbol.for('PaymentRepository'),
  // Presentation
  GetPaymentRouterRef: Symbol.for('GetPaymentRouterRef'),
  GetPaymentsRouterRef: Symbol.for('GetPaymentsRouter'),
};

export default InjectionReferences;
