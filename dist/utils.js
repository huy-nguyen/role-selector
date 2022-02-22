function is(value, attrValue, caseSensitive) {
    if (value === null) {
        return false;
    }
    if (attrValue instanceof RegExp) {
        const valueAsString = value.toString();
        return !!valueAsString.match(attrValue);
    }
    if (caseSensitive === false &&
        typeof attrValue === 'string' &&
        typeof value === 'string') {
        return Object.is(value.toLowerCase(), attrValue.toLowerCase());
    }
    return Object.is(value, attrValue);
}
// Copied and changed from https://github.com/microsoft/playwright/blob/b0cd5b1420741ce79c8ed74cab6dd20101011c7c/packages/playwright-core/src/server/injected/selectorEvaluator.ts#L636-L643
function parentElementOrShadowHost(element) {
    if (element.parentElement) {
        return element.parentElement;
    }
    if (!element.parentNode) {
        return;
    }
    if (element.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
        element.parentNode.host) {
        return element.parentNode.host;
    }
    return undefined;
}
export { is, parentElementOrShadowHost };
