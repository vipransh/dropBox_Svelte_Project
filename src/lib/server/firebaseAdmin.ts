import { getAuth } from 'firebase-admin/auth';
import pkg from 'firebase-admin';
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from '$env/static/private';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FIREBASE_PROJECT_ID,
			clientEmail: FIREBASE_CLIENT_EMAIL,
			privateKey: FIREBASE_PRIVATE_KEY,
		})
	});
} catch (e) {
	const err = e as Error; 
	if (!/already exists/u.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

export const adminAuth = getAuth();