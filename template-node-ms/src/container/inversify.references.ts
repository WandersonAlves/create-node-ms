const InjectionReferences = {
  // Domain / UseCases
  D_Entity_DCaseRef: Symbol.for('D_Entity_DCaseRef'),
  // Infra
  HTTPHandlerRef: Symbol.for('HTTPHandler'),
  DatabaseConnectionRef: Symbol.for('DatabaseConnection'),
  // D_Entity_D
  D_Entity_DRepositoryRef: Symbol.for('D_Entity_DRepositoryRef'),
  // Routers
  GetD_Entity_DRouterRef: Symbol.for('GetD_Entity_DRouterRef'),
  GetD_Entities_DRouterRef: Symbol.for('GetD_Entities_DRouterRef'),
  PostD_Entity_DRouterRef: Symbol.for('PostD_Entity_DRouterRef'),
  PutD_Entity_DRouterRef: Symbol.for('PutD_Entity_DRouterRef'),
  DeleteD_Entity_DRouterRef: Symbol.for('DeleteD_Entity_DRouterRef'),
};

export default InjectionReferences;
