const InjectionReferences = {
  // Domain / UseCases
  EntityCaseRef: Symbol.for('EntityCaseRef'),
  // Infra
  HTTPHandlerRef: Symbol.for('HTTPHandler'),
  DatabaseConnectionRef: Symbol.for('DatabaseConnection'),
  // Entity
  EntityRepositoryRef: Symbol.for('EntityRepositoryRef'),
  // Routers
  GetEntityRouterRef: Symbol.for('GetEntityRouterRef'),
  GetEntitiesRouterRef: Symbol.for('GetEntitiesRouterRef'),
  PostEntityRouterRef: Symbol.for('PostEntityRouterRef'),
  PutEntityRouterRef: Symbol.for('PutEntityRouterRef'),
  DeleteEntityRouterRef: Symbol.for('DeleteEntityRouterRef'),
};

export default InjectionReferences;
