const InjectionReferences = {
  // Domain / UseCases
  GetD_Entities_DCaseRef: Symbol.for('GetD_Entities_DCaseRef'),
  CreateD_Entity_DCaseRef: Symbol.for('CreateD_Entity_DCaseRef'),
  // Infra
  HTTPHandlerRef: Symbol.for('HTTPHandler'),
  DatabaseConnectionRef: Symbol.for('DatabaseConnection'),
  // D_Entity_D
  D_Entity_DRepositoryRef: Symbol.for('D_Entity_DRepositoryRef'),
  // Routers
  GetD_Entities_DRouterRef: Symbol.for('GetD_Entities_DRouterRef'),
  CreateD_Entity_DRouterRef: Symbol.for('CreateD_Entity_DRouterRef'),
};

export default InjectionReferences;
