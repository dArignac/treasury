// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// displays all relevant values, however, create a custom environment.dev.ts for local dev usage with the appropriate credentials in it
export const environment = {
  production: false,
  debugRouting: false,
  sentryDSN: '', // sentry DNS, leave empty to not use sentry
  firebase: {
    // your firebase settings, see overview of your firebase app in the firebase console
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  },
  themoviedb: {
    // your themoviedb.org API key, see https://www.themoviedb.org/settings/api
    apiKey: ''
  }
};
