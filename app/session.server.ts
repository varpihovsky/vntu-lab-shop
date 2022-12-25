import { createFileSessionStorage } from '@remix-run/node';

const { getSession, commitSession, destroySession } = createFileSessionStorage({
	cookie: {
		name: '__session',
		sameSite: 'lax',
		secure: true,
		httpOnly: true,
	},
	dir: 'sessions',
});

export { getSession, commitSession, destroySession };