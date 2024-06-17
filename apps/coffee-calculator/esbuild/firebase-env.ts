const myOrgEnvRegex = /^FIREBASE_/i;

const envVarPlugin = {
  name: 'firebase-env-plugin',
  setup(build: { initialOptions: any }) {
    const options = build.initialOptions;

    const envVars: { [key: string]: any } = {};
    for (const key in process.env) {
      if (myOrgEnvRegex.test(key)) {
        envVars[key] = process.env[key];
      }
    }

    options.define['FIREBASE_ENV'] = JSON.stringify(envVars);
  },
};

module.exports = envVarPlugin;
