import { CartProduct, useCart } from '~/src/cart';
import { Stack, styled, TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

export interface CartProductItemProps {
	product: CartProduct;
}

const Image = styled('img')(() => ({
	aspectRatio: '1 / 1',
	width: '100px',
}));

export function CartProductItem({ product }: CartProductItemProps) {
	const { setCount, removeProduct } = useCart();

	function onCountChange(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value > 0) {
			setCount(product.product, value);
		} else if (value == 0) {
			removeProduct(product.product);
		}
	}

	return (
		<Stack direction='row' spacing={3} alignItems='center'>
			<Image src={product.product.cover} />
			<Typography sx={{ flexGrow: 1 }}>{product.product.name}</Typography>
			<TextField
				label='Кількість'
				value={product.count}
				type='number'
				onChange={onCountChange} />
		</Stack>
	);
}