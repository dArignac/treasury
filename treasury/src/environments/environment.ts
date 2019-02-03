// displays all relevant values, however, create a custom environment.dev.ts for local dev usage with the appropriate credentials in it
export const environment = {
  production: true,
  debugRouting: false,
  sentryDSN: '', // sentry DNS, leave empty to not use sentry
  firebase: {
    // your firebase settings, see overview of your firebase app in the firebase console
    apiKey: 'FIREBASE_API_KEY',
    authDomain: 'FIREBASE_AUTH_DOMAIN',
    databaseURL: 'FIREBASE_DATABASE_URL',
    projectId: 'FIREBASE_PROJECT_ID',
    storageBucket: 'FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID'
  },
  themoviedb: {
    // your themoviedb.org API key, see https://www.themoviedb.org/settings/api
    apiKey: 'THEMOVIEDB_API_KEY',
    imageBaseURL: 'https://image.tmdb.org/t/p/'
  },
  // if you set enableImprint to true, ensure to copy the imprint template imprint.component.tmpl
  // in src/app/imprint/imprint.component.html to imprint.component.html and adjust the content!
  enableImprint: false
};
