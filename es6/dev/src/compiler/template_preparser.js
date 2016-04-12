import { isBlank } from 'angular2/src/facade/lang';
import { splitNsName } from './html_tags';
const NG_CONTENT_SELECT_ATTR = 'select';
const NG_CONTENT_ELEMENT = 'ng-content';
const LINK_ELEMENT = 'link';
const LINK_STYLE_REL_ATTR = 'rel';
const LINK_STYLE_HREF_ATTR = 'href';
const LINK_STYLE_REL_VALUE = 'stylesheet';
const STYLE_ELEMENT = 'style';
const SCRIPT_ELEMENT = 'script';
const NG_NON_BINDABLE_ATTR = 'ngNonBindable';
const NG_PROJECT_AS = 'ngProjectAs';
export function preparseElement(ast) {
    var selectAttr = null;
    var hrefAttr = null;
    var relAttr = null;
    var nonBindable = false;
    var projectAs = null;
    ast.attrs.forEach(attr => {
        let lcAttrName = attr.name.toLowerCase();
        if (lcAttrName == NG_CONTENT_SELECT_ATTR) {
            selectAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
            hrefAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_REL_ATTR) {
            relAttr = attr.value;
        }
        else if (attr.name == NG_NON_BINDABLE_ATTR) {
            nonBindable = true;
        }
        else if (attr.name == NG_PROJECT_AS) {
            if (attr.value.length > 0) {
                projectAs = attr.value;
            }
        }
    });
    selectAttr = normalizeNgContentSelect(selectAttr);
    var nodeName = ast.name.toLowerCase();
    var type = PreparsedElementType.OTHER;
    if (splitNsName(nodeName)[1] == NG_CONTENT_ELEMENT) {
        type = PreparsedElementType.NG_CONTENT;
    }
    else if (nodeName == STYLE_ELEMENT) {
        type = PreparsedElementType.STYLE;
    }
    else if (nodeName == SCRIPT_ELEMENT) {
        type = PreparsedElementType.SCRIPT;
    }
    else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
        type = PreparsedElementType.STYLESHEET;
    }
    return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs);
}
export var PreparsedElementType;
(function (PreparsedElementType) {
    PreparsedElementType[PreparsedElementType["NG_CONTENT"] = 0] = "NG_CONTENT";
    PreparsedElementType[PreparsedElementType["STYLE"] = 1] = "STYLE";
    PreparsedElementType[PreparsedElementType["STYLESHEET"] = 2] = "STYLESHEET";
    PreparsedElementType[PreparsedElementType["SCRIPT"] = 3] = "SCRIPT";
    PreparsedElementType[PreparsedElementType["OTHER"] = 4] = "OTHER";
})(PreparsedElementType || (PreparsedElementType = {}));
export class PreparsedElement {
    constructor(type, selectAttr, hrefAttr, nonBindable, projectAs) {
        this.type = type;
        this.selectAttr = selectAttr;
        this.hrefAttr = hrefAttr;
        this.nonBindable = nonBindable;
        this.projectAs = projectAs;
    }
}
function normalizeNgContentSelect(selectAttr) {
    if (isBlank(selectAttr) || selectAttr.length === 0) {
        return '*';
    }
    return selectAttr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcHJlcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1qbklJaWFGVy50bXAvYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3ByZXBhcnNlci50cyJdLCJuYW1lcyI6WyJwcmVwYXJzZUVsZW1lbnQiLCJQcmVwYXJzZWRFbGVtZW50VHlwZSIsIlByZXBhcnNlZEVsZW1lbnQiLCJQcmVwYXJzZWRFbGVtZW50LmNvbnN0cnVjdG9yIiwibm9ybWFsaXplTmdDb250ZW50U2VsZWN0Il0sIm1hcHBpbmdzIjoiT0FDTyxFQUFDLE9BQU8sRUFBWSxNQUFNLDBCQUEwQjtPQUNwRCxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWE7QUFFdkMsTUFBTSxzQkFBc0IsR0FBRyxRQUFRLENBQUM7QUFDeEMsTUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUM7QUFDeEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDO0FBQzVCLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDO0FBQ3BDLE1BQU0sb0JBQW9CLEdBQUcsWUFBWSxDQUFDO0FBQzFDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQztBQUM5QixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUM7QUFDaEMsTUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUM7QUFDN0MsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBRXBDLGdDQUFnQyxHQUFtQjtJQUNqREEsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDdEJBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3BCQSxJQUFJQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUNuQkEsSUFBSUEsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7SUFDeEJBLElBQUlBLFNBQVNBLEdBQVdBLElBQUlBLENBQUNBO0lBQzdC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RUFBS0EsQ0FBQUE7SUFDTEEsMkVBQVVBLENBQUFBO0lBQ1ZBLG1FQUFNQSxDQUFBQTtJQUNOQSxpRUFBS0EsQ0FBQUE7QUFDUEEsQ0FBQ0EsRUFOVyxvQkFBb0IsS0FBcEIsb0JBQW9CLFFBTS9CO0FBRUQ7SUFDRUMsWUFBbUJBLElBQTBCQSxFQUFTQSxVQUFrQkEsRUFBU0EsUUFBZ0JBLEVBQzlFQSxXQUFvQkEsRUFBU0EsU0FBaUJBO1FBRDlDQyxTQUFJQSxHQUFKQSxJQUFJQSxDQUFzQkE7UUFBU0EsZUFBVUEsR0FBVkEsVUFBVUEsQ0FBUUE7UUFBU0EsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBUUE7UUFDOUVBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFTQTtRQUFTQSxjQUFTQSxHQUFUQSxTQUFTQSxDQUFRQTtJQUFHQSxDQUFDQTtBQUN2RUQsQ0FBQ0E7QUFHRCxrQ0FBa0MsVUFBa0I7SUFDbERFLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ25EQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNiQSxDQUFDQTtJQUNEQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtBQUNwQkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0bWxFbGVtZW50QXN0fSBmcm9tICcuL2h0bWxfYXN0JztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtzcGxpdE5zTmFtZX0gZnJvbSAnLi9odG1sX3RhZ3MnO1xuXG5jb25zdCBOR19DT05URU5UX1NFTEVDVF9BVFRSID0gJ3NlbGVjdCc7XG5jb25zdCBOR19DT05URU5UX0VMRU1FTlQgPSAnbmctY29udGVudCc7XG5jb25zdCBMSU5LX0VMRU1FTlQgPSAnbGluayc7XG5jb25zdCBMSU5LX1NUWUxFX1JFTF9BVFRSID0gJ3JlbCc7XG5jb25zdCBMSU5LX1NUWUxFX0hSRUZfQVRUUiA9ICdocmVmJztcbmNvbnN0IExJTktfU1RZTEVfUkVMX1ZBTFVFID0gJ3N0eWxlc2hlZXQnO1xuY29uc3QgU1RZTEVfRUxFTUVOVCA9ICdzdHlsZSc7XG5jb25zdCBTQ1JJUFRfRUxFTUVOVCA9ICdzY3JpcHQnO1xuY29uc3QgTkdfTk9OX0JJTkRBQkxFX0FUVFIgPSAnbmdOb25CaW5kYWJsZSc7XG5jb25zdCBOR19QUk9KRUNUX0FTID0gJ25nUHJvamVjdEFzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcnNlRWxlbWVudChhc3Q6IEh0bWxFbGVtZW50QXN0KTogUHJlcGFyc2VkRWxlbWVudCB7XG4gIHZhciBzZWxlY3RBdHRyID0gbnVsbDtcbiAgdmFyIGhyZWZBdHRyID0gbnVsbDtcbiAgdmFyIHJlbEF0dHIgPSBudWxsO1xuICB2YXIgbm9uQmluZGFibGUgPSBmYWxzZTtcbiAgdmFyIHByb2plY3RBczogc3RyaW5nID0gbnVsbDtcbiAgYXN0LmF0dHJzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgbGV0IGxjQXR0ck5hbWUgPSBhdHRyLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobGNBdHRyTmFtZSA9PSBOR19DT05URU5UX1NFTEVDVF9BVFRSKSB7XG4gICAgICBzZWxlY3RBdHRyID0gYXR0ci52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGxjQXR0ck5hbWUgPT0gTElOS19TVFlMRV9IUkVGX0FUVFIpIHtcbiAgICAgIGhyZWZBdHRyID0gYXR0ci52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGxjQXR0ck5hbWUgPT0gTElOS19TVFlMRV9SRUxfQVRUUikge1xuICAgICAgcmVsQXR0ciA9IGF0dHIudmFsdWU7XG4gICAgfSBlbHNlIGlmIChhdHRyLm5hbWUgPT0gTkdfTk9OX0JJTkRBQkxFX0FUVFIpIHtcbiAgICAgIG5vbkJpbmRhYmxlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGF0dHIubmFtZSA9PSBOR19QUk9KRUNUX0FTKSB7XG4gICAgICBpZiAoYXR0ci52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHByb2plY3RBcyA9IGF0dHIudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgc2VsZWN0QXR0ciA9IG5vcm1hbGl6ZU5nQ29udGVudFNlbGVjdChzZWxlY3RBdHRyKTtcbiAgdmFyIG5vZGVOYW1lID0gYXN0Lm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgdmFyIHR5cGUgPSBQcmVwYXJzZWRFbGVtZW50VHlwZS5PVEhFUjtcbiAgaWYgKHNwbGl0TnNOYW1lKG5vZGVOYW1lKVsxXSA9PSBOR19DT05URU5UX0VMRU1FTlQpIHtcbiAgICB0eXBlID0gUHJlcGFyc2VkRWxlbWVudFR5cGUuTkdfQ09OVEVOVDtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBTVFlMRV9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNUWUxFO1xuICB9IGVsc2UgaWYgKG5vZGVOYW1lID09IFNDUklQVF9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNDUklQVDtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBMSU5LX0VMRU1FTlQgJiYgcmVsQXR0ciA9PSBMSU5LX1NUWUxFX1JFTF9WQUxVRSkge1xuICAgIHR5cGUgPSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRVNIRUVUO1xuICB9XG4gIHJldHVybiBuZXcgUHJlcGFyc2VkRWxlbWVudCh0eXBlLCBzZWxlY3RBdHRyLCBocmVmQXR0ciwgbm9uQmluZGFibGUsIHByb2plY3RBcyk7XG59XG5cbmV4cG9ydCBlbnVtIFByZXBhcnNlZEVsZW1lbnRUeXBlIHtcbiAgTkdfQ09OVEVOVCxcbiAgU1RZTEUsXG4gIFNUWUxFU0hFRVQsXG4gIFNDUklQVCxcbiAgT1RIRVJcbn1cblxuZXhwb3J0IGNsYXNzIFByZXBhcnNlZEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogUHJlcGFyc2VkRWxlbWVudFR5cGUsIHB1YmxpYyBzZWxlY3RBdHRyOiBzdHJpbmcsIHB1YmxpYyBocmVmQXR0cjogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgbm9uQmluZGFibGU6IGJvb2xlYW4sIHB1YmxpYyBwcm9qZWN0QXM6IHN0cmluZykge31cbn1cblxuXG5mdW5jdGlvbiBub3JtYWxpemVOZ0NvbnRlbnRTZWxlY3Qoc2VsZWN0QXR0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGlzQmxhbmsoc2VsZWN0QXR0cikgfHwgc2VsZWN0QXR0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJyonO1xuICB9XG4gIHJldHVybiBzZWxlY3RBdHRyO1xufVxuIl19