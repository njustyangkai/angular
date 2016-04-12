import { Type } from 'angular2/src/facade/lang';
import { LifecycleHooks } from './interfaces';
export function hasLifecycleHook(lcInterface, token) {
    if (!(token instanceof Type))
        return false;
    var proto = token.prototype;
    switch (lcInterface) {
        case LifecycleHooks.AfterContentInit:
            return !!proto.ngAfterContentInit;
        case LifecycleHooks.AfterContentChecked:
            return !!proto.ngAfterContentChecked;
        case LifecycleHooks.AfterViewInit:
            return !!proto.ngAfterViewInit;
        case LifecycleHooks.AfterViewChecked:
            return !!proto.ngAfterViewChecked;
        case LifecycleHooks.OnChanges:
            return !!proto.ngOnChanges;
        case LifecycleHooks.DoCheck:
            return !!proto.ngDoCheck;
        case LifecycleHooks.OnDestroy:
            return !!proto.ngOnDestroy;
        case LifecycleHooks.OnInit:
            return !!proto.ngOnInit;
        default:
            return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX2xpZmVjeWNsZV9yZWZsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWpuSUlpYUZXLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZGlyZWN0aXZlX2xpZmVjeWNsZV9yZWZsZWN0b3IudHMiXSwibmFtZXMiOlsiaGFzTGlmZWN5Y2xlSG9vayJdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSwwQkFBMEI7T0FDdEMsRUFBQyxjQUFjLEVBQUMsTUFBTSxjQUFjO0FBRTNDLGlDQUFpQyxXQUEyQixFQUFFLEtBQUs7SUFDakVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLFlBQVlBLElBQUlBLENBQUNBLENBQUNBO1FBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO0lBRTNDQSxJQUFJQSxLQUFLQSxHQUFTQSxLQUFNQSxDQUFDQSxTQUFTQSxDQUFDQTtJQUVuQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDcEJBLEtBQUtBLGNBQWNBLENBQUNBLGdCQUFnQkE7WUFDbENBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFDcENBLEtBQUtBLGNBQWNBLENBQUNBLG1CQUFtQkE7WUFDckNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLHFCQUFxQkEsQ0FBQ0E7UUFDdkNBLEtBQUtBLGNBQWNBLENBQUNBLGFBQWFBO1lBQy9CQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxlQUFlQSxDQUFDQTtRQUNqQ0EsS0FBS0EsY0FBY0EsQ0FBQ0EsZ0JBQWdCQTtZQUNsQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUNwQ0EsS0FBS0EsY0FBY0EsQ0FBQ0EsU0FBU0E7WUFDM0JBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLENBQUNBO1FBQzdCQSxLQUFLQSxjQUFjQSxDQUFDQSxPQUFPQTtZQUN6QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDM0JBLEtBQUtBLGNBQWNBLENBQUNBLFNBQVNBO1lBQzNCQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUM3QkEsS0FBS0EsY0FBY0EsQ0FBQ0EsTUFBTUE7WUFDeEJBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBO1FBQzFCQTtZQUNFQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7QUFDSEEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpZmVjeWNsZUhvb2tzfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzTGlmZWN5Y2xlSG9vayhsY0ludGVyZmFjZTogTGlmZWN5Y2xlSG9va3MsIHRva2VuKTogYm9vbGVhbiB7XG4gIGlmICghKHRva2VuIGluc3RhbmNlb2YgVHlwZSkpIHJldHVybiBmYWxzZTtcblxuICB2YXIgcHJvdG8gPSAoPGFueT50b2tlbikucHJvdG90eXBlO1xuXG4gIHN3aXRjaCAobGNJbnRlcmZhY2UpIHtcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLkFmdGVyQ29udGVudEluaXQ6XG4gICAgICByZXR1cm4gISFwcm90by5uZ0FmdGVyQ29udGVudEluaXQ7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5BZnRlckNvbnRlbnRDaGVja2VkOlxuICAgICAgcmV0dXJuICEhcHJvdG8ubmdBZnRlckNvbnRlbnRDaGVja2VkO1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuQWZ0ZXJWaWV3SW5pdDpcbiAgICAgIHJldHVybiAhIXByb3RvLm5nQWZ0ZXJWaWV3SW5pdDtcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLkFmdGVyVmlld0NoZWNrZWQ6XG4gICAgICByZXR1cm4gISFwcm90by5uZ0FmdGVyVmlld0NoZWNrZWQ7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5PbkNoYW5nZXM6XG4gICAgICByZXR1cm4gISFwcm90by5uZ09uQ2hhbmdlcztcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLkRvQ2hlY2s6XG4gICAgICByZXR1cm4gISFwcm90by5uZ0RvQ2hlY2s7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5PbkRlc3Ryb3k6XG4gICAgICByZXR1cm4gISFwcm90by5uZ09uRGVzdHJveTtcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLk9uSW5pdDpcbiAgICAgIHJldHVybiAhIXByb3RvLm5nT25Jbml0O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==