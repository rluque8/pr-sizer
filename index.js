require('dotenv').config();
const { Toolkit } = require('actions-toolkit');

Toolkit.run(async tools => {
  // TODO: Action logic here
  tools.log.info('PR-Sizer Action being executed...'),
  {
    event: [
      'pull_request.opened',
      'pull_request.edited',
      'pull_request.synchronize',
    ],
    secrets: ['GITHUB_TOKEN'],
  }
})
