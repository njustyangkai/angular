import { bootstrap } from 'angular2/platform/browser';
import { NG_VALIDATORS } from 'angular2/common';
import { Provider } from 'angular2/core';
let MyApp = null;
let myValidator = null;
// #docregion ng_validators
bootstrap(MyApp, [new Provider(NG_VALIDATORS, { useValue: myValidator, multi: true })]);
// #enddocregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtam5JSWlhRlcudG1wL2FuZ3VsYXIyL2V4YW1wbGVzL2NvcmUvZm9ybXMvdHMvbmdfdmFsaWRhdG9ycy9uZ192YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMkJBQTJCO09BQzVDLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCO09BQ3RDLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZTtBQUV0QyxJQUFJLEtBQUssR0FBYSxJQUFJLENBQUM7QUFDM0IsSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFDO0FBRTVCLDJCQUEyQjtBQUMzQixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEYsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtOR19WQUxJREFUT1JTfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmxldCBNeUFwcDogRnVuY3Rpb24gPSBudWxsO1xubGV0IG15VmFsaWRhdG9yOiBhbnkgPSBudWxsO1xuXG4vLyAjZG9jcmVnaW9uIG5nX3ZhbGlkYXRvcnNcbmJvb3RzdHJhcChNeUFwcCwgW25ldyBQcm92aWRlcihOR19WQUxJREFUT1JTLCB7dXNlVmFsdWU6IG15VmFsaWRhdG9yLCBtdWx0aTogdHJ1ZX0pXSk7XG4vLyAjZW5kZG9jcmVnaW9uXG4iXX0=