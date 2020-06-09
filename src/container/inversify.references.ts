const InjectionReferences = {
  // Domain / UseCases
  AuthenticationCaseRef: Symbol.for('AuthenticationCaseRef'),
  PlacesCaseRef: Symbol.for('PlacesCaseRef'),
  ProfileCaseRef: Symbol.for('ProfileCaseRef'),
  // Infra
  HTTPHandlerRef: Symbol.for('HTTPHandler'),
  DatabaseConnectionRef: Symbol.for('DatabaseConnection'),
  // Entity
  PlaceEvaluationRepositoryRef: Symbol.for('PlaceEvaluationRepositoryRef'),
  UserRepositoryRef: Symbol.for('UserRepository'),
  PlaceRepositoryRef: Symbol.for('PlaceRepository'),
  RatingRepositoryRef: Symbol.for('RatingRepository'),
  // Routers
  CreateUserRouterRef: Symbol.for('CreateUserRouterRef'),
  AuthenticateUserRouterRef: Symbol.for('AuthenticateUserRouterRef'),
  LogoutUserRouterRef: Symbol.for('LogoutUserRouterRef'),
  EvaluatePlaceRouterRef: Symbol.for('EvaluatePlaceRouterRef'),
  CreatePlaceRouterRef: Symbol.for('CreatePlaceRouterRef'),
  GetPlacesRouterRef: Symbol.for('GetPlacesRouterRef'),
  GetPlacesWithCommentsRouterRef: Symbol.for('GetPlacesWithCommentsRouterRef'),
  GetUserProfileRouterRef: Symbol.for('GetUserProfileRouterRef'),
  UpdateUserProfileRouterRef: Symbol.for('UpdateUserProfileRouterRef'),
};

export default InjectionReferences;
