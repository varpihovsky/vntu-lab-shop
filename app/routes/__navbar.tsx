import { AppBar, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { Link as RemixLink } from '@remix-run/react/dist/components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useTheme } from '@mui/system';
import { json, LoaderFunction } from '@remix-run/node';
import { getSession } from '~/session.server';

interface LoaderData {
	userPresent: boolean;
}

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'));
	return json<LoaderData>({ userPresent: session.get('user') != undefined });
};

export default function Navbar() {
	const theme = useTheme();
	const { userPresent } = useLoaderData() as LoaderData;
	return (
		<>
			<AppBar position='fixed'>
				<Toolbar>
					<Typography variant='h6' sx={{ marginRight: theme.spacing(2) }}>Магазин</Typography>
					<Link color='background.paper' component={RemixLink} to={'/'} sx={{ flexGrow: 1 }}>Головна</Link>
					<Button
						component={RemixLink}
						to={userPresent ? '/account' : '/sign-in'}
						variant='contained'
						color='secondary'
						sx={{ marginRight: theme.spacing(2) }}>
						{userPresent ? 'Аккаунт' : 'Вхід'}
					</Button>
					<IconButton component={RemixLink} to='/cart'>
						<ShoppingCartIcon sx={{ color: 'white' }} />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Outlet />
		</>
	);
}