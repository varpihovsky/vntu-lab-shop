import { Typography } from '@mui/material';
import { json, LoaderFunction, redirect } from '@remix-run/node';
import { getSession } from '~/session.server';
import { useLoaderData } from '@remix-run/react';

interface LoaderData {
	email: string;
}

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'));
	const user = session.get('user');
	console.log(user);
	if (!user) {
		return redirect('/');
	}
	return json<LoaderData>({ email: user.email });
};

export default function Account() {
	const { email } = useLoaderData() as LoaderData;
	return (
		<Typography>Вітаємо, {email}</Typography>
	);
}