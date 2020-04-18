import { compose, path, prop } from 'ramda';

export const getLocation = path(['router', 'location']);

export const getPathname = compose(prop('pathname'), getLocation);

export const getQuery = compose(prop('query'), getLocation);

export const getPodId = compose(pathname => (pathname || '').split('/')[2], getPathname);
