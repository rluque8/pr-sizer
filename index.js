require('dotenv').config();
const { Toolkit } = require('actions-toolkit');
const { run } = require('./src/run');

Toolkit.run(
  async tools => {
    tools.log.info('PR-Sizer Action being executed...');
    await run(tools);
    tools.exit.success('PR-Sizer Action executed successfully!');
  },
  {
    event: [
      'pull_request.opened',
      'pull_request.edited',
      'pull_request.synchronize',
    ],
    secrets: ['GITHUB_TOKEN'],
  }
);
