import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

export const redirectTo = path => browserHistory.push(path);

export default browserHistory;