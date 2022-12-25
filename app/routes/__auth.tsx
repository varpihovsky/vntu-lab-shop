import { Link as RemixLink, Outlet, useLocation } from '@remix-run/react';
import { Box, Link, Paper, styled, Typography, useTheme } from '@mui/material';

const Container = styled(Box)(() => ({
	minWidth: '100vw',
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
}));

export default function Auth() {
	const location = useLocation();
	const theme = useTheme();

	return (
		<Container>
			<Paper sx={{
				padding: theme.spacing(3),
				boxShadow: theme.shadows[5],
				display: 'flex',
				flexDirection: 'column',
			}}>
				<Typography variant='h3' textAlign='center'>
					{location.pathname.includes('sign-in') ? 'Вхід' : 'Реєстрація'}
				</Typography>
				<Outlet />
				{location.pathname.includes('sign-in') && (
					<Link
						component={RemixLink}
						to='/sign-up'
						prefetch='intent'
						alignSelf='end'
						sx={{ marginTop: theme.spacing(1.2) }}>
						Зареєструватись
					</Link>
				)}
			</Paper>
		</Container>
	);
}