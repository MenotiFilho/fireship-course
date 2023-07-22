import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';

const firebaseConfig = {
	apiKey: 'AIzaSyD7hHDtCzhfw7KRXYHCWG_1UQ5n-m9cesA',
	authDomain: 'fireship-project-88861.firebaseapp.com',
	projectId: 'fireship-project-88861',
	storageBucket: 'fireship-project-88861.appspot.com',
	messagingSenderId: '152416716128',
	appId: '1:152416716128:web:d8499c90f68a418fbd0a05',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe,
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});
		return () => unsubscribe();
	});
	return {
		subscribe,
	};
}

export const user = userStore();
