import { Form, useActionData, useTransition } from '@remix-run/react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ActionFunction, json, redirect } from '@remix-run/node';
import { commitSession, getSession } from '~/session.server';
import { query } from '~/mysql.server';
import { escape } from 'mysql';
import { User } from '~/src/user';
import { comparePasswords } from '~/crypto.server';

interface ActionData {
	errors: ('email' | 'password')[];
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');

	const errors: ('email' | 'password')[] = [];
	if (!email || typeof email != 'string') {
		errors.push('email');
	}
	if (!password || typeof password != 'string') {
		errors.push('password');
	}

	if (errors.length > 0) {
		return json<ActionData>({ errors: errors });
	}

	const session = await getSession(request.headers.get('Cookie'));
	const { error, results, fields } = await query(`
      SELECT *
      FROM users
      WHERE email = ${escape(email)};
	`);
	console.log(error);
	console.log(results);
	const user: User | undefined = results[0];

	if (error || !user) {
		return json<ActionData>({ errors: ['email'] });
	}

	const equal = comparePasswords(user.password, password as string);

	if (!equal) {
		return json<ActionData>({ errors: ['email', 'password'] });
	}

	session.set('user', user);
	return redirect('/', {
		headers: { 'Set-Cookie': await commitSession(session) },
	});
};

export default function SignIn() {
	const transition = useTransition();
	const actionData = useActionData<ActionData>();

	return (
		<Form method='post'>
			<TextField
				margin='normal'
				required
				fullWidth
				error={actionData?.errors.includes('email') == true}
				label='Електронна пошта'
				name='email'
				autoFocus
				type='email'
			/>
			<TextField
				margin='normal'
				required
				fullWidth
				error={actionData?.errors.includes('password') == true}
				label='Пароль'
				type='password'
				name='password'
			/>
			<LoadingButton type='submit' fullWidth variant='contained' sx={{ mt: 2 }}
										 loading={Boolean(transition.submission)}>
				Увійти
			</LoadingButton>
		</Form>
	);
}