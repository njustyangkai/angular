export { WORKER_SCRIPT, WORKER_RENDER_PLATFORM, initializeGenericWorkerRenderer, WORKER_RENDER_APPLICATION_COMMON } from 'angular2/src/platform/worker_render_common';
export { WORKER_RENDER_APPLICATION, WebWorkerInstance } from 'angular2/src/platform/worker_render';
export { ClientMessageBroker, ClientMessageBrokerFactory, FnArg, UiArguments } from '../src/web_workers/shared/client_message_broker';
export { ReceivedMessage, ServiceMessageBroker, ServiceMessageBrokerFactory } from '../src/web_workers/shared/service_message_broker';
export { PRIMITIVE } from '../src/web_workers/shared/serializer';
export * from '../src/web_workers/shared/message_bus';
import { WORKER_RENDER_APPLICATION } from 'angular2/src/platform/worker_render';
/**
 * @deprecated Use WORKER_RENDER_APPLICATION
 */
export const WORKER_RENDER_APP = WORKER_RENDER_APPLICATION;
export { WORKER_RENDER_ROUTER } from 'angular2/src/web_workers/ui/router_providers';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtam5JSWlhRlcudG1wL2FuZ3VsYXIyL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FDRSxhQUFhLEVBQ2Isc0JBQXNCLEVBQ3RCLCtCQUErQixFQUMvQixnQ0FBZ0MsUUFDM0IsNENBQTRDLENBQUM7QUFDcEQsU0FBUSx5QkFBeUIsRUFBRSxpQkFBaUIsUUFBTyxxQ0FBcUMsQ0FBQztBQUNqRyxTQUNFLG1CQUFtQixFQUNuQiwwQkFBMEIsRUFDMUIsS0FBSyxFQUNMLFdBQVcsUUFDTixpREFBaUQsQ0FBQztBQUN6RCxTQUNFLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsMkJBQTJCLFFBQ3RCLGtEQUFrRCxDQUFDO0FBQzFELFNBQVEsU0FBUyxRQUFPLHNDQUFzQyxDQUFDO0FBQy9ELGNBQWMsdUNBQXVDLENBQUM7T0FDL0MsRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHFDQUFxQztBQUU3RTs7R0FFRztBQUNILGFBQWEsaUJBQWlCLEdBQUcseUJBQXlCLENBQUM7QUFDM0QsU0FBUSxvQkFBb0IsUUFBTyw4Q0FBOEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7XG4gIFdPUktFUl9TQ1JJUFQsXG4gIFdPUktFUl9SRU5ERVJfUExBVEZPUk0sXG4gIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIsXG4gIFdPUktFUl9SRU5ERVJfQVBQTElDQVRJT05fQ09NTU9OXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyX2NvbW1vbic7XG5leHBvcnQge1dPUktFUl9SRU5ERVJfQVBQTElDQVRJT04sIFdlYldvcmtlckluc3RhbmNlfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlcic7XG5leHBvcnQge1xuICBDbGllbnRNZXNzYWdlQnJva2VyLFxuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgRm5BcmcsXG4gIFVpQXJndW1lbnRzXG59IGZyb20gJy4uL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmV4cG9ydCB7XG4gIFJlY2VpdmVkTWVzc2FnZSxcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXIsXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeVxufSBmcm9tICcuLi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuZXhwb3J0IHtQUklNSVRJVkV9IGZyb20gJy4uL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5leHBvcnQgKiBmcm9tICcuLi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7V09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXInO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX0FQUCA9IFdPUktFUl9SRU5ERVJfQVBQTElDQVRJT047XG5leHBvcnQge1dPUktFUl9SRU5ERVJfUk9VVEVSfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcm91dGVyX3Byb3ZpZGVycyc7XG4iXX0=