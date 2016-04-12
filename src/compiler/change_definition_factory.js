'use strict';var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var template_ast_1 = require('./template_ast');
var interfaces_1 = require('angular2/src/core/linker/interfaces');
function createChangeDetectorDefinitions(componentType, componentStrategy, genConfig, parsedTemplate) {
    var pvVisitors = [];
    var visitor = new ProtoViewVisitor(null, pvVisitors, componentStrategy);
    template_ast_1.templateVisitAll(visitor, parsedTemplate);
    return createChangeDefinitions(pvVisitors, componentType, genConfig);
}
exports.createChangeDetectorDefinitions = createChangeDetectorDefinitions;
var ProtoViewVisitor = (function () {
    function ProtoViewVisitor(parent, allVisitors, strategy) {
        this.parent = parent;
        this.allVisitors = allVisitors;
        this.strategy = strategy;
        this.nodeCount = 0;
        this.boundElementCount = 0;
        this.variableNames = [];
        this.bindingRecords = [];
        this.eventRecords = [];
        this.directiveRecords = [];
        this.viewIndex = allVisitors.length;
        allVisitors.push(this);
    }
    ProtoViewVisitor.prototype.visitEmbeddedTemplate = function (ast, context) {
        this.nodeCount++;
        this.boundElementCount++;
        template_ast_1.templateVisitAll(this, ast.outputs);
        for (var i = 0; i < ast.directives.length; i++) {
            ast.directives[i].visit(this, i);
        }
        var childVisitor = new ProtoViewVisitor(this, this.allVisitors, change_detection_1.ChangeDetectionStrategy.Default);
        // Attention: variables present on an embedded template count towards
        // the embedded template and not the template anchor!
        template_ast_1.templateVisitAll(childVisitor, ast.vars);
        template_ast_1.templateVisitAll(childVisitor, ast.children);
        return null;
    };
    ProtoViewVisitor.prototype.visitElement = function (ast, context) {
        this.nodeCount++;
        if (ast.isBound()) {
            this.boundElementCount++;
        }
        template_ast_1.templateVisitAll(this, ast.inputs, null);
        template_ast_1.templateVisitAll(this, ast.outputs);
        template_ast_1.templateVisitAll(this, ast.exportAsVars);
        for (var i = 0; i < ast.directives.length; i++) {
            ast.directives[i].visit(this, i);
        }
        template_ast_1.templateVisitAll(this, ast.children);
        return null;
    };
    ProtoViewVisitor.prototype.visitNgContent = function (ast, context) { return null; };
    ProtoViewVisitor.prototype.visitVariable = function (ast, context) {
        this.variableNames.push(ast.name);
        return null;
    };
    ProtoViewVisitor.prototype.visitEvent = function (ast, directiveRecord) {
        var bindingRecord = lang_1.isPresent(directiveRecord) ?
            change_detection_1.BindingRecord.createForHostEvent(ast.handler, ast.fullName, directiveRecord) :
            change_detection_1.BindingRecord.createForEvent(ast.handler, ast.fullName, this.boundElementCount - 1);
        this.eventRecords.push(bindingRecord);
        return null;
    };
    ProtoViewVisitor.prototype.visitElementProperty = function (ast, directiveRecord) {
        var boundElementIndex = this.boundElementCount - 1;
        var dirIndex = lang_1.isPresent(directiveRecord) ? directiveRecord.directiveIndex : null;
        var bindingRecord;
        if (ast.type === template_ast_1.PropertyBindingType.Property) {
            bindingRecord =
                lang_1.isPresent(dirIndex) ?
                    change_detection_1.BindingRecord.createForHostProperty(dirIndex, ast.value, ast.name) :
                    change_detection_1.BindingRecord.createForElementProperty(ast.value, boundElementIndex, ast.name);
        }
        else if (ast.type === template_ast_1.PropertyBindingType.Attribute) {
            bindingRecord =
                lang_1.isPresent(dirIndex) ?
                    change_detection_1.BindingRecord.createForHostAttribute(dirIndex, ast.value, ast.name) :
                    change_detection_1.BindingRecord.createForElementAttribute(ast.value, boundElementIndex, ast.name);
        }
        else if (ast.type === template_ast_1.PropertyBindingType.Class) {
            bindingRecord =
                lang_1.isPresent(dirIndex) ?
                    change_detection_1.BindingRecord.createForHostClass(dirIndex, ast.value, ast.name) :
                    change_detection_1.BindingRecord.createForElementClass(ast.value, boundElementIndex, ast.name);
        }
        else if (ast.type === template_ast_1.PropertyBindingType.Style) {
            bindingRecord =
                lang_1.isPresent(dirIndex) ?
                    change_detection_1.BindingRecord.createForHostStyle(dirIndex, ast.value, ast.name, ast.unit) :
                    change_detection_1.BindingRecord.createForElementStyle(ast.value, boundElementIndex, ast.name, ast.unit);
        }
        this.bindingRecords.push(bindingRecord);
        return null;
    };
    ProtoViewVisitor.prototype.visitAttr = function (ast, context) { return null; };
    ProtoViewVisitor.prototype.visitBoundText = function (ast, context) {
        var nodeIndex = this.nodeCount++;
        this.bindingRecords.push(change_detection_1.BindingRecord.createForTextNode(ast.value, nodeIndex));
        return null;
    };
    ProtoViewVisitor.prototype.visitText = function (ast, context) {
        this.nodeCount++;
        return null;
    };
    ProtoViewVisitor.prototype.visitDirective = function (ast, directiveIndexAsNumber) {
        var directiveIndex = new change_detection_1.DirectiveIndex(this.boundElementCount - 1, directiveIndexAsNumber);
        var directiveMetadata = ast.directive;
        var outputsArray = [];
        collection_1.StringMapWrapper.forEach(ast.directive.outputs, function (eventName, dirProperty) { return outputsArray.push([dirProperty, eventName]); });
        var directiveRecord = new change_detection_1.DirectiveRecord({
            directiveIndex: directiveIndex,
            callAfterContentInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterContentInit) !== -1,
            callAfterContentChecked: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterContentChecked) !== -1,
            callAfterViewInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterViewInit) !== -1,
            callAfterViewChecked: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterViewChecked) !== -1,
            callOnChanges: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnChanges) !== -1,
            callDoCheck: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.DoCheck) !== -1,
            callOnInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnInit) !== -1,
            callOnDestroy: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnDestroy) !== -1,
            changeDetection: directiveMetadata.changeDetection,
            outputs: outputsArray
        });
        this.directiveRecords.push(directiveRecord);
        template_ast_1.templateVisitAll(this, ast.inputs, directiveRecord);
        var bindingRecords = this.bindingRecords;
        if (directiveRecord.callOnChanges) {
            bindingRecords.push(change_detection_1.BindingRecord.createDirectiveOnChanges(directiveRecord));
        }
        if (directiveRecord.callOnInit) {
            bindingRecords.push(change_detection_1.BindingRecord.createDirectiveOnInit(directiveRecord));
        }
        if (directiveRecord.callDoCheck) {
            bindingRecords.push(change_detection_1.BindingRecord.createDirectiveDoCheck(directiveRecord));
        }
        template_ast_1.templateVisitAll(this, ast.hostProperties, directiveRecord);
        template_ast_1.templateVisitAll(this, ast.hostEvents, directiveRecord);
        template_ast_1.templateVisitAll(this, ast.exportAsVars);
        return null;
    };
    ProtoViewVisitor.prototype.visitDirectiveProperty = function (ast, directiveRecord) {
        // TODO: these setters should eventually be created by change detection, to make
        // it monomorphic!
        var setter = reflection_1.reflector.setter(ast.directiveName);
        this.bindingRecords.push(change_detection_1.BindingRecord.createForDirective(ast.value, ast.directiveName, setter, directiveRecord));
        return null;
    };
    return ProtoViewVisitor;
})();
function createChangeDefinitions(pvVisitors, componentType, genConfig) {
    var pvVariableNames = _collectNestedProtoViewsVariableNames(pvVisitors);
    return pvVisitors.map(function (pvVisitor) {
        var id = componentType.name + "_" + pvVisitor.viewIndex;
        return new change_detection_1.ChangeDetectorDefinition(id, pvVisitor.strategy, pvVariableNames[pvVisitor.viewIndex], pvVisitor.bindingRecords, pvVisitor.eventRecords, pvVisitor.directiveRecords, genConfig);
    });
}
function _collectNestedProtoViewsVariableNames(pvVisitors) {
    var nestedPvVariableNames = collection_1.ListWrapper.createFixedSize(pvVisitors.length);
    pvVisitors.forEach(function (pv) {
        var parentVariableNames = lang_1.isPresent(pv.parent) ? nestedPvVariableNames[pv.parent.viewIndex] : [];
        nestedPvVariableNames[pv.viewIndex] = parentVariableNames.concat(pv.variableNames);
    });
    return nestedPvVariableNames;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RlZmluaXRpb25fZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtOGgxRG54S0UudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9jaGFuZ2VfZGVmaW5pdGlvbl9mYWN0b3J5LnRzIl0sIm5hbWVzIjpbImNyZWF0ZUNoYW5nZURldGVjdG9yRGVmaW5pdGlvbnMiLCJQcm90b1ZpZXdWaXNpdG9yIiwiUHJvdG9WaWV3VmlzaXRvci5jb25zdHJ1Y3RvciIsIlByb3RvVmlld1Zpc2l0b3IudmlzaXRFbWJlZGRlZFRlbXBsYXRlIiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdEVsZW1lbnQiLCJQcm90b1ZpZXdWaXNpdG9yLnZpc2l0TmdDb250ZW50IiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdFZhcmlhYmxlIiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdEV2ZW50IiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdEVsZW1lbnRQcm9wZXJ0eSIsIlByb3RvVmlld1Zpc2l0b3IudmlzaXRBdHRyIiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdEJvdW5kVGV4dCIsIlByb3RvVmlld1Zpc2l0b3IudmlzaXRUZXh0IiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdERpcmVjdGl2ZSIsIlByb3RvVmlld1Zpc2l0b3IudmlzaXREaXJlY3RpdmVQcm9wZXJ0eSIsImNyZWF0ZUNoYW5nZURlZmluaXRpb25zIiwiX2NvbGxlY3ROZXN0ZWRQcm90b1ZpZXdzVmFyaWFibGVOYW1lcyJdLCJtYXBwaW5ncyI6IkFBQUEsMkJBQTRDLGdDQUFnQyxDQUFDLENBQUE7QUFDN0UscUJBQWlDLDBCQUEwQixDQUFDLENBQUE7QUFDNUQsMkJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFFbEUsaUNBUU8scURBQXFELENBQUMsQ0FBQTtBQUc3RCw2QkFnQk8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QiwyQkFBNkIscUNBQXFDLENB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QUlBLFNBQVNBLENBQUNBLFNBQVdBLENBQUNBO1FBQ3hEQSxNQUFNQSxDQUFDQSxJQUFJQSwyQ0FBd0JBLENBQy9CQSxFQUFFQSxFQUFFQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxlQUFlQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxjQUFjQSxFQUN0RkEsU0FBU0EsQ0FBQ0EsWUFBWUEsRUFBRUEsU0FBU0EsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUVyRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDTEEsQ0FBQ0E7QUFFRCwrQ0FBK0MsVUFBOEI7SUFDM0VDLElBQUlBLHFCQUFxQkEsR0FBZUEsd0JBQVdBLENBQUNBLGVBQWVBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO0lBQ3ZGQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFDQSxFQUFFQTtRQUNwQkEsSUFBSUEsbUJBQW1CQSxHQUNuQkEsZ0JBQVNBLENBQUNBLEVBQUVBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLHFCQUFxQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDM0VBLHFCQUFxQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsbUJBQW1CQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtJQUNyRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDSEEsTUFBTUEsQ0FBQ0EscUJBQXFCQSxDQUFDQTtBQUMvQkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlSW5kZXgsXG4gIEJpbmRpbmdSZWNvcmQsXG4gIERpcmVjdGl2ZVJlY29yZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yRGVmaW5pdGlvbixcbiAgQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcsXG4gIEFTVFdpdGhTb3VyY2Vcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcblxuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIENvbXBpbGVUeXBlTWV0YWRhdGF9IGZyb20gJy4vZGlyZWN0aXZlX21ldGFkYXRhJztcbmltcG9ydCB7XG4gIFRlbXBsYXRlQXN0LFxuICBFbGVtZW50QXN0LFxuICBCb3VuZFRleHRBc3QsXG4gIFByb3BlcnR5QmluZGluZ1R5cGUsXG4gIERpcmVjdGl2ZUFzdCxcbiAgVGVtcGxhdGVBc3RWaXNpdG9yLFxuICB0ZW1wbGF0ZVZpc2l0QWxsLFxuICBOZ0NvbnRlbnRBc3QsXG4gIEVtYmVkZGVkVGVtcGxhdGVBc3QsXG4gIFZhcmlhYmxlQXN0LFxuICBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCxcbiAgQm91bmRFdmVudEFzdCxcbiAgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCxcbiAgQXR0ckFzdCxcbiAgVGV4dEFzdFxufSBmcm9tICcuL3RlbXBsYXRlX2FzdCc7XG5pbXBvcnQge0xpZmVjeWNsZUhvb2tzfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaGFuZ2VEZXRlY3RvckRlZmluaXRpb25zKFxuICAgIGNvbXBvbmVudFR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsIGNvbXBvbmVudFN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBnZW5Db25maWc6IENoYW5nZURldGVjdG9yR2VuQ29uZmlnLCBwYXJzZWRUZW1wbGF0ZTogVGVtcGxhdGVBc3RbXSk6IENoYW5nZURldGVjdG9yRGVmaW5pdGlvbltdIHtcbiAgdmFyIHB2VmlzaXRvcnMgPSBbXTtcbiAgdmFyIHZpc2l0b3IgPSBuZXcgUHJvdG9WaWV3VmlzaXRvcihudWxsLCBwdlZpc2l0b3JzLCBjb21wb25lbnRTdHJhdGVneSk7XG4gIHRlbXBsYXRlVmlzaXRBbGwodmlzaXRvciwgcGFyc2VkVGVtcGxhdGUpO1xuICByZXR1cm4gY3JlYXRlQ2hhbmdlRGVmaW5pdGlvbnMocHZWaXNpdG9ycywgY29tcG9uZW50VHlwZSwgZ2VuQ29uZmlnKTtcbn1cblxuY2xhc3MgUHJvdG9WaWV3VmlzaXRvciBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0VmlzaXRvciB7XG4gIHZpZXdJbmRleDogbnVtYmVyO1xuICBub2RlQ291bnQ6IG51bWJlciA9IDA7XG4gIGJvdW5kRWxlbWVudENvdW50OiBudW1iZXIgPSAwO1xuICB2YXJpYWJsZU5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICBiaW5kaW5nUmVjb3JkczogQmluZGluZ1JlY29yZFtdID0gW107XG4gIGV2ZW50UmVjb3JkczogQmluZGluZ1JlY29yZFtdID0gW107XG4gIGRpcmVjdGl2ZVJlY29yZHM6IERpcmVjdGl2ZVJlY29yZFtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhcmVudDogUHJvdG9WaWV3VmlzaXRvciwgcHVibGljIGFsbFZpc2l0b3JzOiBQcm90b1ZpZXdWaXNpdG9yW10sXG4gICAgICAgICAgICAgIHB1YmxpYyBzdHJhdGVneTogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpIHtcbiAgICB0aGlzLnZpZXdJbmRleCA9IGFsbFZpc2l0b3JzLmxlbmd0aDtcbiAgICBhbGxWaXNpdG9ycy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogRW1iZWRkZWRUZW1wbGF0ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLm5vZGVDb3VudCsrO1xuICAgIHRoaXMuYm91bmRFbGVtZW50Q291bnQrKztcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5vdXRwdXRzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzdC5kaXJlY3RpdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhc3QuZGlyZWN0aXZlc1tpXS52aXNpdCh0aGlzLCBpKTtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGRWaXNpdG9yID1cbiAgICAgICAgbmV3IFByb3RvVmlld1Zpc2l0b3IodGhpcywgdGhpcy5hbGxWaXNpdG9ycywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCk7XG4gICAgLy8gQXR0ZW50aW9uOiB2YXJpYWJsZXMgcHJlc2VudCBvbiBhbiBlbWJlZGRlZCB0ZW1wbGF0ZSBjb3VudCB0b3dhcmRzXG4gICAgLy8gdGhlIGVtYmVkZGVkIHRlbXBsYXRlIGFuZCBub3QgdGhlIHRlbXBsYXRlIGFuY2hvciFcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKGNoaWxkVmlzaXRvciwgYXN0LnZhcnMpO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwoY2hpbGRWaXNpdG9yLCBhc3QuY2hpbGRyZW4pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLm5vZGVDb3VudCsrO1xuICAgIGlmIChhc3QuaXNCb3VuZCgpKSB7XG4gICAgICB0aGlzLmJvdW5kRWxlbWVudENvdW50Kys7XG4gICAgfVxuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmlucHV0cywgbnVsbCk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3Qub3V0cHV0cyk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuZXhwb3J0QXNWYXJzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzdC5kaXJlY3RpdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhc3QuZGlyZWN0aXZlc1tpXS52aXNpdCh0aGlzLCBpKTtcbiAgICB9XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuY2hpbGRyZW4pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXROZ0NvbnRlbnQoYXN0OiBOZ0NvbnRlbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXRWYXJpYWJsZShhc3Q6IFZhcmlhYmxlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmFyaWFibGVOYW1lcy5wdXNoKGFzdC5uYW1lKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0RXZlbnQoYXN0OiBCb3VuZEV2ZW50QXN0LCBkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IGFueSB7XG4gICAgdmFyIGJpbmRpbmdSZWNvcmQgPVxuICAgICAgICBpc1ByZXNlbnQoZGlyZWN0aXZlUmVjb3JkKSA/XG4gICAgICAgICAgICBCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckhvc3RFdmVudChhc3QuaGFuZGxlciwgYXN0LmZ1bGxOYW1lLCBkaXJlY3RpdmVSZWNvcmQpIDpcbiAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRXZlbnQoYXN0LmhhbmRsZXIsIGFzdC5mdWxsTmFtZSwgdGhpcy5ib3VuZEVsZW1lbnRDb3VudCAtIDEpO1xuICAgIHRoaXMuZXZlbnRSZWNvcmRzLnB1c2goYmluZGluZ1JlY29yZCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEVsZW1lbnRQcm9wZXJ0eShhc3Q6IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LCBkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IGFueSB7XG4gICAgdmFyIGJvdW5kRWxlbWVudEluZGV4ID0gdGhpcy5ib3VuZEVsZW1lbnRDb3VudCAtIDE7XG4gICAgdmFyIGRpckluZGV4ID0gaXNQcmVzZW50KGRpcmVjdGl2ZVJlY29yZCkgPyBkaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXggOiBudWxsO1xuICAgIHZhciBiaW5kaW5nUmVjb3JkO1xuICAgIGlmIChhc3QudHlwZSA9PT0gUHJvcGVydHlCaW5kaW5nVHlwZS5Qcm9wZXJ0eSkge1xuICAgICAgYmluZGluZ1JlY29yZCA9XG4gICAgICAgICAgaXNQcmVzZW50KGRpckluZGV4KSA/XG4gICAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdFByb3BlcnR5KGRpckluZGV4LCBhc3QudmFsdWUsIGFzdC5uYW1lKSA6XG4gICAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudFByb3BlcnR5KGFzdC52YWx1ZSwgYm91bmRFbGVtZW50SW5kZXgsIGFzdC5uYW1lKTtcbiAgICB9IGVsc2UgaWYgKGFzdC50eXBlID09PSBQcm9wZXJ0eUJpbmRpbmdUeXBlLkF0dHJpYnV0ZSkge1xuICAgICAgYmluZGluZ1JlY29yZCA9XG4gICAgICAgICAgaXNQcmVzZW50KGRpckluZGV4KSA/XG4gICAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdEF0dHJpYnV0ZShkaXJJbmRleCwgYXN0LnZhbHVlLCBhc3QubmFtZSkgOlxuICAgICAgICAgICAgICBCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckVsZW1lbnRBdHRyaWJ1dGUoYXN0LnZhbHVlLCBib3VuZEVsZW1lbnRJbmRleCwgYXN0Lm5hbWUpO1xuICAgIH0gZWxzZSBpZiAoYXN0LnR5cGUgPT09IFByb3BlcnR5QmluZGluZ1R5cGUuQ2xhc3MpIHtcbiAgICAgIGJpbmRpbmdSZWNvcmQgPVxuICAgICAgICAgIGlzUHJlc2VudChkaXJJbmRleCkgP1xuICAgICAgICAgICAgICBCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckhvc3RDbGFzcyhkaXJJbmRleCwgYXN0LnZhbHVlLCBhc3QubmFtZSkgOlxuICAgICAgICAgICAgICBCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckVsZW1lbnRDbGFzcyhhc3QudmFsdWUsIGJvdW5kRWxlbWVudEluZGV4LCBhc3QubmFtZSk7XG4gICAgfSBlbHNlIGlmIChhc3QudHlwZSA9PT0gUHJvcGVydHlCaW5kaW5nVHlwZS5TdHlsZSkge1xuICAgICAgYmluZGluZ1JlY29yZCA9XG4gICAgICAgICAgaXNQcmVzZW50KGRpckluZGV4KSA/XG4gICAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdFN0eWxlKGRpckluZGV4LCBhc3QudmFsdWUsIGFzdC5uYW1lLCBhc3QudW5pdCkgOlxuICAgICAgICAgICAgICBCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckVsZW1lbnRTdHlsZShhc3QudmFsdWUsIGJvdW5kRWxlbWVudEluZGV4LCBhc3QubmFtZSwgYXN0LnVuaXQpO1xuICAgIH1cbiAgICB0aGlzLmJpbmRpbmdSZWNvcmRzLnB1c2goYmluZGluZ1JlY29yZCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRBdHRyKGFzdDogQXR0ckFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRCb3VuZFRleHQoYXN0OiBCb3VuZFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdmFyIG5vZGVJbmRleCA9IHRoaXMubm9kZUNvdW50Kys7XG4gICAgdGhpcy5iaW5kaW5nUmVjb3Jkcy5wdXNoKEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yVGV4dE5vZGUoYXN0LnZhbHVlLCBub2RlSW5kZXgpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFRleHQoYXN0OiBUZXh0QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMubm9kZUNvdW50Kys7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXREaXJlY3RpdmUoYXN0OiBEaXJlY3RpdmVBc3QsIGRpcmVjdGl2ZUluZGV4QXNOdW1iZXI6IG51bWJlcik6IGFueSB7XG4gICAgdmFyIGRpcmVjdGl2ZUluZGV4ID0gbmV3IERpcmVjdGl2ZUluZGV4KHRoaXMuYm91bmRFbGVtZW50Q291bnQgLSAxLCBkaXJlY3RpdmVJbmRleEFzTnVtYmVyKTtcbiAgICB2YXIgZGlyZWN0aXZlTWV0YWRhdGEgPSBhc3QuZGlyZWN0aXZlO1xuICAgIHZhciBvdXRwdXRzQXJyYXkgPSBbXTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goXG4gICAgICAgIGFzdC5kaXJlY3RpdmUub3V0cHV0cyxcbiAgICAgICAgKGV2ZW50TmFtZTogc3RyaW5nLCBkaXJQcm9wZXJ0eTogc3RyaW5nKSA9PiBvdXRwdXRzQXJyYXkucHVzaChbZGlyUHJvcGVydHksIGV2ZW50TmFtZV0pKTtcbiAgICB2YXIgZGlyZWN0aXZlUmVjb3JkID0gbmV3IERpcmVjdGl2ZVJlY29yZCh7XG4gICAgICBkaXJlY3RpdmVJbmRleDogZGlyZWN0aXZlSW5kZXgsXG4gICAgICBjYWxsQWZ0ZXJDb250ZW50SW5pdDpcbiAgICAgICAgICBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLkFmdGVyQ29udGVudEluaXQpICE9PSAtMSxcbiAgICAgIGNhbGxBZnRlckNvbnRlbnRDaGVja2VkOlxuICAgICAgICAgIGRpcmVjdGl2ZU1ldGFkYXRhLmxpZmVjeWNsZUhvb2tzLmluZGV4T2YoTGlmZWN5Y2xlSG9va3MuQWZ0ZXJDb250ZW50Q2hlY2tlZCkgIT09IC0xLFxuICAgICAgY2FsbEFmdGVyVmlld0luaXQ6XG4gICAgICAgICAgZGlyZWN0aXZlTWV0YWRhdGEubGlmZWN5Y2xlSG9va3MuaW5kZXhPZihMaWZlY3ljbGVIb29rcy5BZnRlclZpZXdJbml0KSAhPT0gLTEsXG4gICAgICBjYWxsQWZ0ZXJWaWV3Q2hlY2tlZDpcbiAgICAgICAgICBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLkFmdGVyVmlld0NoZWNrZWQpICE9PSAtMSxcbiAgICAgIGNhbGxPbkNoYW5nZXM6IGRpcmVjdGl2ZU1ldGFkYXRhLmxpZmVjeWNsZUhvb2tzLmluZGV4T2YoTGlmZWN5Y2xlSG9va3MuT25DaGFuZ2VzKSAhPT0gLTEsXG4gICAgICBjYWxsRG9DaGVjazogZGlyZWN0aXZlTWV0YWRhdGEubGlmZWN5Y2xlSG9va3MuaW5kZXhPZihMaWZlY3ljbGVIb29rcy5Eb0NoZWNrKSAhPT0gLTEsXG4gICAgICBjYWxsT25Jbml0OiBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLk9uSW5pdCkgIT09IC0xLFxuICAgICAgY2FsbE9uRGVzdHJveTogZGlyZWN0aXZlTWV0YWRhdGEubGlmZWN5Y2xlSG9va3MuaW5kZXhPZihMaWZlY3ljbGVIb29rcy5PbkRlc3Ryb3kpICE9PSAtMSxcbiAgICAgIGNoYW5nZURldGVjdGlvbjogZGlyZWN0aXZlTWV0YWRhdGEuY2hhbmdlRGV0ZWN0aW9uLFxuICAgICAgb3V0cHV0czogb3V0cHV0c0FycmF5XG4gICAgfSk7XG4gICAgdGhpcy5kaXJlY3RpdmVSZWNvcmRzLnB1c2goZGlyZWN0aXZlUmVjb3JkKTtcblxuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmlucHV0cywgZGlyZWN0aXZlUmVjb3JkKTtcbiAgICB2YXIgYmluZGluZ1JlY29yZHMgPSB0aGlzLmJpbmRpbmdSZWNvcmRzO1xuICAgIGlmIChkaXJlY3RpdmVSZWNvcmQuY2FsbE9uQ2hhbmdlcykge1xuICAgICAgYmluZGluZ1JlY29yZHMucHVzaChCaW5kaW5nUmVjb3JkLmNyZWF0ZURpcmVjdGl2ZU9uQ2hhbmdlcyhkaXJlY3RpdmVSZWNvcmQpKTtcbiAgICB9XG4gICAgaWYgKGRpcmVjdGl2ZVJlY29yZC5jYWxsT25Jbml0KSB7XG4gICAgICBiaW5kaW5nUmVjb3Jkcy5wdXNoKEJpbmRpbmdSZWNvcmQuY3JlYXRlRGlyZWN0aXZlT25Jbml0KGRpcmVjdGl2ZVJlY29yZCkpO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aXZlUmVjb3JkLmNhbGxEb0NoZWNrKSB7XG4gICAgICBiaW5kaW5nUmVjb3Jkcy5wdXNoKEJpbmRpbmdSZWNvcmQuY3JlYXRlRGlyZWN0aXZlRG9DaGVjayhkaXJlY3RpdmVSZWNvcmQpKTtcbiAgICB9XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuaG9zdFByb3BlcnRpZXMsIGRpcmVjdGl2ZVJlY29yZCk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuaG9zdEV2ZW50cywgZGlyZWN0aXZlUmVjb3JkKTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5leHBvcnRBc1ZhcnMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RGlyZWN0aXZlUHJvcGVydHkoYXN0OiBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LCBkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IGFueSB7XG4gICAgLy8gVE9ETzogdGhlc2Ugc2V0dGVycyBzaG91bGQgZXZlbnR1YWxseSBiZSBjcmVhdGVkIGJ5IGNoYW5nZSBkZXRlY3Rpb24sIHRvIG1ha2VcbiAgICAvLyBpdCBtb25vbW9ycGhpYyFcbiAgICB2YXIgc2V0dGVyID0gcmVmbGVjdG9yLnNldHRlcihhc3QuZGlyZWN0aXZlTmFtZSk7XG4gICAgdGhpcy5iaW5kaW5nUmVjb3Jkcy5wdXNoKFxuICAgICAgICBCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckRpcmVjdGl2ZShhc3QudmFsdWUsIGFzdC5kaXJlY3RpdmVOYW1lLCBzZXR0ZXIsIGRpcmVjdGl2ZVJlY29yZCkpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlQ2hhbmdlRGVmaW5pdGlvbnMocHZWaXNpdG9yczogUHJvdG9WaWV3VmlzaXRvcltdLCBjb21wb25lbnRUeXBlOiBDb21waWxlVHlwZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuQ29uZmlnOiBDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZyk6IENoYW5nZURldGVjdG9yRGVmaW5pdGlvbltdIHtcbiAgdmFyIHB2VmFyaWFibGVOYW1lcyA9IF9jb2xsZWN0TmVzdGVkUHJvdG9WaWV3c1ZhcmlhYmxlTmFtZXMocHZWaXNpdG9ycyk7XG4gIHJldHVybiBwdlZpc2l0b3JzLm1hcChwdlZpc2l0b3IgPT4ge1xuICAgIHZhciBpZCA9IGAke2NvbXBvbmVudFR5cGUubmFtZX1fJHtwdlZpc2l0b3Iudmlld0luZGV4fWA7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24oXG4gICAgICAgIGlkLCBwdlZpc2l0b3Iuc3RyYXRlZ3ksIHB2VmFyaWFibGVOYW1lc1twdlZpc2l0b3Iudmlld0luZGV4XSwgcHZWaXNpdG9yLmJpbmRpbmdSZWNvcmRzLFxuICAgICAgICBwdlZpc2l0b3IuZXZlbnRSZWNvcmRzLCBwdlZpc2l0b3IuZGlyZWN0aXZlUmVjb3JkcywgZ2VuQ29uZmlnKTtcblxuICB9KTtcbn1cblxuZnVuY3Rpb24gX2NvbGxlY3ROZXN0ZWRQcm90b1ZpZXdzVmFyaWFibGVOYW1lcyhwdlZpc2l0b3JzOiBQcm90b1ZpZXdWaXNpdG9yW10pOiBzdHJpbmdbXVtdIHtcbiAgdmFyIG5lc3RlZFB2VmFyaWFibGVOYW1lczogc3RyaW5nW11bXSA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShwdlZpc2l0b3JzLmxlbmd0aCk7XG4gIHB2VmlzaXRvcnMuZm9yRWFjaCgocHYpID0+IHtcbiAgICB2YXIgcGFyZW50VmFyaWFibGVOYW1lczogc3RyaW5nW10gPVxuICAgICAgICBpc1ByZXNlbnQocHYucGFyZW50KSA/IG5lc3RlZFB2VmFyaWFibGVOYW1lc1twdi5wYXJlbnQudmlld0luZGV4XSA6IFtdO1xuICAgIG5lc3RlZFB2VmFyaWFibGVOYW1lc1twdi52aWV3SW5kZXhdID0gcGFyZW50VmFyaWFibGVOYW1lcy5jb25jYXQocHYudmFyaWFibGVOYW1lcyk7XG4gIH0pO1xuICByZXR1cm4gbmVzdGVkUHZWYXJpYWJsZU5hbWVzO1xufVxuIl19