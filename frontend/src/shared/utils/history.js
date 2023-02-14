import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

export const redirecTo = path => browserHistory.push(path);

export default browserHistory;