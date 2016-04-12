'use strict';var core_1 = require('angular2/core');
var platform_location_1 = require('angular2/src/router/location/platform_location');
var platform_location_2 = require('./platform_location');
var router_providers_common_1 = require('angular2/src/router/router_providers_common');
exports.WORKER_APP_ROUTER = [
    router_providers_common_1.ROUTER_PROVIDERS_COMMON,
    new core_1.Provider(platform_location_1.PlatformLocation, { useClass: platform_location_2.WebWorkerPlatformLocation }),
    new core_1.Provider(core_1.APP_INITIALIZER, {
        useFactory: function (platformLocation, zone) { return function () {
            return initRouter(platformLocation, zone);
        }; },
        multi: true,
        deps: [platform_location_1.PlatformLocation, core_1.NgZone]
    })
];
function initRouter(platformLocation, zone) {
    return zone.run(function () { return platformLocation.init(); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtOGgxRG54S0UudG1wL2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvcm91dGVyX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6WyJpbml0Um91dGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxxQkFBZ0UsZUFBZSxDQUFDLENBQUE7QUFDaEYsa0NBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFDaEYsa0NBQXdDLHFCQUFxQixDQUFDLENBQUE7QUFDOUQsd0NBQXNDLDZDQUE2QyxDQUFDLENBQUE7QUFFekUseUJBQWlCLEdBQUc7SUFDN0IsaURBQXVCO0lBQ3ZCLElBQUksZUFBUSxDQUFDLG9DQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLDZDQUF5QixFQUFDLENBQUM7SUFDckUsSUFBSSxlQUFRLENBQUMsc0JBQWUsRUFDZjtRQUNFLFVBQVUsRUFBRSxVQUFDLGdCQUEyQyxFQUFFLElBQVksSUFBSyxPQUFBO21CQUMzRCxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO1FBQWxDLENBQWtDLEVBRHlCLENBQ3pCO1FBQ2xELEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsb0NBQWdCLEVBQUUsYUFBTSxDQUFDO0tBQ2pDLENBQUM7Q0FDaEIsQ0FBQztBQUVGLG9CQUFvQixnQkFBMkMsRUFBRSxJQUFZO0lBQzNFQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxjQUFRQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQzdEQSxDQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwbGljYXRpb25SZWYsIFByb3ZpZGVyLCBOZ1pvbmUsIEFQUF9JTklUSUFMSVpFUn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7Uk9VVEVSX1BST1ZJREVSU19DT01NT059IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVyc19jb21tb24nO1xuXG5leHBvcnQgdmFyIFdPUktFUl9BUFBfUk9VVEVSID0gW1xuICBST1VURVJfUFJPVklERVJTX0NPTU1PTixcbiAgbmV3IFByb3ZpZGVyKFBsYXRmb3JtTG9jYXRpb24sIHt1c2VDbGFzczogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbn0pLFxuICBuZXcgUHJvdmlkZXIoQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiAocGxhdGZvcm1Mb2NhdGlvbjogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiwgem9uZTogTmdab25lKSA9PiAoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJvdXRlcihwbGF0Zm9ybUxvY2F0aW9uLCB6b25lKSxcbiAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgICAgICAgIGRlcHM6IFtQbGF0Zm9ybUxvY2F0aW9uLCBOZ1pvbmVdXG4gICAgICAgICAgICAgICB9KVxuXTtcblxuZnVuY3Rpb24gaW5pdFJvdXRlcihwbGF0Zm9ybUxvY2F0aW9uOiBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uLCB6b25lOiBOZ1pvbmUpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIHpvbmUucnVuKCgpID0+IHsgcmV0dXJuIHBsYXRmb3JtTG9jYXRpb24uaW5pdCgpOyB9KTtcbn1cbiJdfQ==