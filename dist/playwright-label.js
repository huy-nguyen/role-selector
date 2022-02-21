import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const selectorScript = {
    path: require.resolve('../label-eval'),
};
export { selectorScript };
