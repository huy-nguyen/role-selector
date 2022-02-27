import { configure, queryAllByLabelText } from '@testing-library/dom';

configure({
  computedStyleSupportsPseudoElements: true,
});

// These are the canonical tag names of HTML elements that can be the target of
// a label per https://html.spec.whatwg.org/multipage/forms.html#category-label
const labelableTagNames = new Set([
  'BUTTON',
  'INPUT',
  'METER',
  'OUTPUT',
  'PROGRESS',
  'SELECT',
  'TEXTAREA',
]);

function queryAll(root: Element | Document, selector: string) {
  const rootElement =
    root instanceof Document ? root.documentElement : (root as HTMLElement);

  const unfilteredElems = queryAllByLabelText(rootElement, selector, {
    exact: false,
  });

  // Only return labelable elements:
  const filteredElems = unfilteredElems.filter((elem) =>
    labelableTagNames.has(elem.tagName)
  );

  return filteredElems;
}

function query(root: Element, selector: string) {
  return queryAll(root, selector)[0] || null;
}

export default {
  query,
  queryAll,
};
