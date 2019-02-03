// replace all template files with the proper values coming from ci environment
let fs = require('fs');

let files = [
  {
    'source': 'src/environments/environment.ts',
    'target': 'src/environments/environment.ci.ts',
  },
  {
    'source': 'cypress.tmpl.json',
    'target': 'cypress.env.json',
    'wrap': '%',
  },
  {
    'source': 'serviceAccount.tmpl.json',
    'target': 'serviceAccount.json',
  }
];
let replacements = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'THEMOVIEDB_API_KEY',
  'TEST_UID',
  'FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID',
  'FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_CONTENT',
  'FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL',
  'FIREBASE_SERVICE_ACCOUNT_CLIENT_ID',
  'FIREBASE_SERVICE_ACCOUNT_AUTH_URI',
  'FIREBASE_SERVICE_ACCOUNT_TOKEN_URI',
  'FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL',
  'FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL',
];

console.log('Starting to replace template files...');

files.forEach(value => {
  console.log('handling file: ' + value.source);

  fs.readFile(value.source, 'utf8', (err, data) => {
    if (err) {
      console.error('failed to load ' + value.source);
    }

    if (data !== undefined) {
      let targetContent = data;

      replacements.forEach(replacement => {
        targetContent = targetContent.replace(
          new RegExp(!!value.wrap ? value.wrap + replacement + value.wrap : replacement),
          process.env[replacement]
        );
      });

      fs.writeFile(value.target, targetContent, 'utf8', err => {
        if (err) {
          console.error('writing file ' + value.target + ' failed');
        }
      });
    } else {
      console.error('unable to read file ' + value.source);
    }
  });
});
