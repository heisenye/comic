module.exports = {
  apps: [
    {
      name: 'backend',
      script: './index.ts',
      interpreter: './node_modules/.bin/ts-node',
      exec_mode: 'cluster',
      watch: true
    }
  ]
}