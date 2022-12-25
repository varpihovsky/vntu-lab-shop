import { Container, styled, Typography } from '@mui/material';
import { useCart } from '~/src/cart';
import { useMemo } from 'react';
import { CartProductItem } from '~/components/cart-product';

const StyledContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
}));

export default function Cart() {
	const { products } = useCart();

	const sum = useMemo(() => {
		if (products.length == 0) {
			return 0;
		}

		return products
			.map(product => product.product.price * product.count)
			.reduce((p, c) => p + c);
	}, [products]);

	if (products.length == 0) {
		return (
			<Container maxWidth='xl'>
				<Typography>Кошик пустий</Typography>
			</Container>
		);
	}

	return (
		<StyledContainer maxWidth='xl'>
			{products.map(product => (
				<CartProductItem key={product.product.id} product={product} />
			))}
			<Typography>Сума: {sum}</Typography>
		</StyledContainer>
	);
}