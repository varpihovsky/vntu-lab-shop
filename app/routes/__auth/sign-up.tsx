import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { ActionFunction, json, redirect } from '@remix-run/node';
import { commitSession, getSession } from '~/session.server';
import { query } from '~/mysql.server';
import { escape } from 'mysql';
import { User } from '~/src/user';
import { createHashedPassword } from '~/crypto.server';

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
	const hashedPassword = createHashedPassword(password as string);
	const { error, results, fields } = await query(`
      INSERT INTO users(email, password)
      VALUES (${escape(email)}, '${hashedPassword}');
	`);
	const user: User | undefined = error == null ? {
		id: results.insertId, email: email as string, password: hashedPassword,
	} : undefined;

	if (error || !user) {
		return json<ActionData>({ errors: ['email'] });
	}

	session.set('user', user);
	return redirect('/', {
		headers: { 'Set-Cookie': await commitSession(session) },
	});
};

export default function SignUp() {
	const actionData = useActionData<ActionData>();
	const transition = useTransition();

	return (
		<Form method='post'>
			<TextField
				margin='normal'
				error={actionData?.errors.includes('email') == true}
				required
				fullWidth
				label='Електронна пошта'
				name='email'
				autoFocus
				type='email'
			/>
			<TextField
				margin='normal'
				error={actionData?.errors.includes('password') == true}
				required
				fullWidth
				label='Пароль'
				type='password'
				name='password'
			/>
			<LoadingButton type='submit' fullWidth variant='contained' sx={{ mt: 2 }}
										 loading={Boolean(transition.submission)}>
				Зареєструватись
			</LoadingButton>
		</Form>
	);
}