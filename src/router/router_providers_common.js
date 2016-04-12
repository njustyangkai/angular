'use strict';var location_strategy_1 = require('angular2/src/router/location/location_strategy');
var path_location_strategy_1 = require('angular2/src/router/location/path_location_strategy');
var router_1 = require('angular2/src/router/router');
var route_registry_1 = require('angular2/src/router/route_registry');
var location_1 = require('angular2/src/router/location/location');
var lang_1 = require('angular2/src/facade/lang');
var core_1 = require('angular2/core');
var exceptions_1 = require('angular2/src/facade/exceptions');
/**
 * The Platform agnostic ROUTER PROVIDERS
 */
exports.ROUTER_PROVIDERS_COMMON = lang_1.CONST_EXPR([
    route_registry_1.RouteRegistry,
    lang_1.CONST_EXPR(new core_1.Provider(location_strategy_1.LocationStrategy, { useClass: path_location_strategy_1.PathLocationStrategy })),
    location_1.Location,
    lang_1.CONST_EXPR(new core_1.Provider(router_1.Router, {
        useFactory: routerFactory,
        deps: lang_1.CONST_EXPR([route_registry_1.RouteRegistry, location_1.Location, route_registry_1.ROUTER_PRIMARY_COMPONENT, core_1.ApplicationRef])
    })),
    lang_1.CONST_EXPR(new core_1.Provider(route_registry_1.ROUTER_PRIMARY_COMPONENT, { useFactory: routerPrimaryComponentFactory, deps: lang_1.CONST_EXPR([core_1.ApplicationRef]) }))
]);
function routerFactory(registry, location, primaryComponent, appRef) {
    var rootRouter = new router_1.RootRouter(registry, location, primaryComponent);
    appRef.registerDisposeListener(function () { return rootRouter.dispose(); });
    return rootRouter;
}
function routerPrimaryComponentFactory(app) {
    if (app.componentTypes.length == 0) {
        throw new exceptions_1.BaseException("Bootstrap at least one component before injecting Router.");
    }
    return app.componentTypes[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVyc19jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLThoMURueEtFLnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnNfY29tbW9uLnRzIl0sIm5hbWVzIjpbInJvdXRlckZhY3RvcnkiLCJyb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeSJdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFDaEYsdUNBQW1DLHFEQUFxRCxDQUFDLENBQUE7QUFDekYsdUJBQWlDLDRCQUE0QixDQUFDLENBQUE7QUFDOUQsK0JBQXNELG9DQUFvQyxDQUFDLENBQUE7QUFDM0YseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QscUJBQStCLDBCQUEwQixDQUFDLENBQUE7QUFDMUQscUJBQW9ELGVBQWUsQ0FBQyxDQUFBO0FBQ3BFLDJCQUE0QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTdEOztHQUVHO0FBQ1UsK0JBQXVCLEdBQVUsaUJBQVUsQ0FBQztJQUN2RCw4QkFBYTtJQUNiLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQUMsb0NBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNkNBQW9CLEVBQUMsQ0FBQyxDQUFDO0lBQzVFLG1CQUFRO0lBQ1IsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FDbkIsZUFBTSxFQUNOO1FBQ0UsVUFBVSxFQUFFLGFBQWE7UUFDekIsSUFBSSxFQUFFLGlCQUFVLENBQUMsQ0FBQyw4QkFBYSxFQUFFLG1CQUFRLEVBQUUseUNBQXdCLEVBQUUscUJBQWMsQ0FBQyxDQUFDO0tBQ3RGLENBQUMsQ0FBQztJQUNQLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQ25CLHlDQUF3QixFQUN4QixFQUFDLFVBQVUsRUFBRSw2QkFBNkIsRUFBRSxJQUFJLEVBQUUsaUJBQVUsQ0FBQyxDQUFDLHFCQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztDQUN0RixDQUFDLENBQUM7QUFFSCx1QkFBdUIsUUFBdUIsRUFBRSxRQUFrQixFQUFFLGdCQUFzQixFQUNuRSxNQUFzQjtJQUMzQ0EsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsbUJBQVVBLENBQUNBLFFBQVFBLEVBQUVBLFFBQVFBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7SUFDdEVBLE1BQU1BLENBQUNBLHVCQUF1QkEsQ0FBQ0EsY0FBTUEsT0FBQUEsVUFBVUEsQ0FBQ0EsT0FBT0EsRUFBRUEsRUFBcEJBLENBQW9CQSxDQUFDQSxDQUFDQTtJQUMzREEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7QUFDcEJBLENBQUNBO0FBRUQsdUNBQXVDLEdBQW1CO0lBQ3hEQyxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxjQUFjQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuQ0EsTUFBTUEsSUFBSUEsMEJBQWFBLENBQUNBLDJEQUEyREEsQ0FBQ0EsQ0FBQ0E7SUFDdkZBLENBQUNBO0lBQ0RBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQy9CQSxDQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9sb2NhdGlvbi9sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge1BhdGhMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL3BhdGhfbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtSb3V0ZXIsIFJvb3RSb3V0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVyJztcbmltcG9ydCB7Um91dGVSZWdpc3RyeSwgUk9VVEVSX1BSSU1BUllfQ09NUE9ORU5UfSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlX3JlZ2lzdHJ5JztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vbG9jYXRpb24nO1xuaW1wb3J0IHtDT05TVF9FWFBSLCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgT3BhcXVlVG9rZW4sIFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuLyoqXG4gKiBUaGUgUGxhdGZvcm0gYWdub3N0aWMgUk9VVEVSIFBST1ZJREVSU1xuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX1BST1ZJREVSU19DT01NT046IGFueVtdID0gQ09OU1RfRVhQUihbXG4gIFJvdXRlUmVnaXN0cnksXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogUGF0aExvY2F0aW9uU3RyYXRlZ3l9KSksXG4gIExvY2F0aW9uLFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihcbiAgICAgIFJvdXRlcixcbiAgICAgIHtcbiAgICAgICAgdXNlRmFjdG9yeTogcm91dGVyRmFjdG9yeSxcbiAgICAgICAgZGVwczogQ09OU1RfRVhQUihbUm91dGVSZWdpc3RyeSwgTG9jYXRpb24sIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVCwgQXBwbGljYXRpb25SZWZdKVxuICAgICAgfSkpLFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihcbiAgICAgIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVCxcbiAgICAgIHt1c2VGYWN0b3J5OiByb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeSwgZGVwczogQ09OU1RfRVhQUihbQXBwbGljYXRpb25SZWZdKX0pKVxuXSk7XG5cbmZ1bmN0aW9uIHJvdXRlckZhY3RvcnkocmVnaXN0cnk6IFJvdXRlUmVnaXN0cnksIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpbWFyeUNvbXBvbmVudDogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgYXBwUmVmOiBBcHBsaWNhdGlvblJlZik6IFJvb3RSb3V0ZXIge1xuICB2YXIgcm9vdFJvdXRlciA9IG5ldyBSb290Um91dGVyKHJlZ2lzdHJ5LCBsb2NhdGlvbiwgcHJpbWFyeUNvbXBvbmVudCk7XG4gIGFwcFJlZi5yZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcigoKSA9PiByb290Um91dGVyLmRpc3Bvc2UoKSk7XG4gIHJldHVybiByb290Um91dGVyO1xufVxuXG5mdW5jdGlvbiByb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeShhcHA6IEFwcGxpY2F0aW9uUmVmKTogVHlwZSB7XG4gIGlmIChhcHAuY29tcG9uZW50VHlwZXMubGVuZ3RoID09IDApIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkJvb3RzdHJhcCBhdCBsZWFzdCBvbmUgY29tcG9uZW50IGJlZm9yZSBpbmplY3RpbmcgUm91dGVyLlwiKTtcbiAgfVxuICByZXR1cm4gYXBwLmNvbXBvbmVudFR5cGVzWzBdO1xufVxuIl19