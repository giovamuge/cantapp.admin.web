// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: 'AIzaSyAvY92afgZ7gtRvlZSaodFrgG0ORZRozFw',
		authDomain: 'mgc-cantapp.firebaseapp.com',
		databaseURL: 'https://mgc-cantapp.firebaseio.com',
		projectId: 'mgc-cantapp',
		storageBucket: 'mgc-cantapp.appspot.com',
		messagingSenderId: '44505885939',
		appId: '1:44505885939:web:86ad78b7062564f47ddb86'
	},
	algolia_indexs: {
		songs: 'dev_SONGS'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
