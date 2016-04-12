import { global } from 'angular2/src/facade/lang';
import { AngularTools } from './common_tools';
var context = global;
/**
 * Enabled Angular 2 debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 */
export function enableDebugTools(ref) {
    context.ng = new AngularTools(ref);
}
/**
 * Disables Angular 2 tools.
 */
export function disableDebugTools() {
    delete context.ng;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWpuSUlpYUZXLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90b29scy90b29scy50cyJdLCJuYW1lcyI6WyJlbmFibGVEZWJ1Z1Rvb2xzIiwiZGlzYWJsZURlYnVnVG9vbHMiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sMEJBQTBCO09BRXhDLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCO0FBRTNDLElBQUksT0FBTyxHQUFRLE1BQU0sQ0FBQztBQUUxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsaUNBQWlDLEdBQWlCO0lBQ2hEQSxPQUFPQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtBQUNyQ0EsQ0FBQ0E7QUFFRDs7R0FFRztBQUNIO0lBQ0VDLE9BQU9BLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBO0FBQ3BCQSxDQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFsfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtDb21wb25lbnRSZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9keW5hbWljX2NvbXBvbmVudF9sb2FkZXInO1xuaW1wb3J0IHtBbmd1bGFyVG9vbHN9IGZyb20gJy4vY29tbW9uX3Rvb2xzJztcblxudmFyIGNvbnRleHQgPSA8YW55Pmdsb2JhbDtcblxuLyoqXG4gKiBFbmFibGVkIEFuZ3VsYXIgMiBkZWJ1ZyB0b29scyB0aGF0IGFyZSBhY2Nlc3NpYmxlIHZpYSB5b3VyIGJyb3dzZXInc1xuICogZGV2ZWxvcGVyIGNvbnNvbGUuXG4gKlxuICogVXNhZ2U6XG4gKlxuICogMS4gT3BlbiBkZXZlbG9wZXIgY29uc29sZSAoZS5nLiBpbiBDaHJvbWUgQ3RybCArIFNoaWZ0ICsgailcbiAqIDEuIFR5cGUgYG5nLmAgKHVzdWFsbHkgdGhlIGNvbnNvbGUgd2lsbCBzaG93IGF1dG8tY29tcGxldGUgc3VnZ2VzdGlvbilcbiAqIDEuIFRyeSB0aGUgY2hhbmdlIGRldGVjdGlvbiBwcm9maWxlciBgbmcucHJvZmlsZXIudGltZUNoYW5nZURldGVjdGlvbigpYFxuICogICAgdGhlbiBoaXQgRW50ZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVEZWJ1Z1Rvb2xzKHJlZjogQ29tcG9uZW50UmVmKTogdm9pZCB7XG4gIGNvbnRleHQubmcgPSBuZXcgQW5ndWxhclRvb2xzKHJlZik7XG59XG5cbi8qKlxuICogRGlzYWJsZXMgQW5ndWxhciAyIHRvb2xzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZURlYnVnVG9vbHMoKTogdm9pZCB7XG4gIGRlbGV0ZSBjb250ZXh0Lm5nO1xufVxuIl19