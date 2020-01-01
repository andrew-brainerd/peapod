import { path } from 'ramda';

export const getPathname = path(['location', 'pathname']);
