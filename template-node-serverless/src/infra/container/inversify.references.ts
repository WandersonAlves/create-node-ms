const InjectionReferences = {
  // Domain / UseCases
  GenerateRandomNumberCase: Symbol.for('GenerateRandomNumberCase'),
  // Infra
  HTTPHandlerRef: Symbol.for('HTTPHandler'),
  // Routers
  CreateHublogRouterRef: Symbol.for('CreateHublogRouterRef'),
};

export default InjectionReferences;
