module.exports = {
    apps: [
      {
        name: 'my-react-app',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'development',
          PORT: 3000
        }
      }
    ]
  };
  