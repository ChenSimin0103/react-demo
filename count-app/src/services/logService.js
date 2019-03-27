import Raven from 'raven-js';

// 暂时先不使用 raven
function init() {
  // Raven.config('https://e8571a531040408e81a5f5c2600ae22b@sentry.io/1424272', {
  //   release: '1-0-0',
  //   environment: 'development-test',
  // }).install();
}

function log(error) {
  console.log(error)
  // Raven.captureException(error);
}

export default { init, log };
