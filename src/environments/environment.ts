// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCi0bJ4_uCadzBtBAcVvgStrakcdnokj8c',
    authDomain: 'gw-atl.firebaseapp.com',
    databaseURL: 'https://gw-atl.firebaseio.com',
    projectId: 'gw-atl',
    storageBucket: '',
    messagingSenderId: '898194337795'
  }
};
