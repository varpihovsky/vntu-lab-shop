import { Product } from '~/src/product';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useCart } from '~/src/cart';
import { useMemo } from 'react';

export interface ProductItemProps {
	product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
	const { products, addProduct, removeProduct } = useCart();
	const presentInCart = useMemo(() => products.find(
			productInCart => productInCart.product.id == product.id,
		) != undefined,
		[products],
	);

	return (
		<Grid item xs={3}>
			<Card sx={{ width: '100%' }}>
				<CardMedia
					sx={{ aspectRatio: '1 / 1', width: '100%' }}
					image={product.cover}
					title={product.name} />
				<CardContent>
					<Typography variant='h5' sx={{
						overflow: 'clip',
						textOverflow: 'ellipsis',
						lineHeight: '1.2em',
						maxHeight: '2.4em',
					}}>
						{product.name}
					</Typography>
				</CardContent>
				<CardActions>
					{presentInCart ?
						<Button variant='text' onClick={() => removeProduct(product)}>
							Вилучити з кошику
						</Button> :
						<Button variant='text' onClick={() => addProduct(product)}>
							Додати до кошику
						</Button>
					}
				</CardActions>
			</Card>
		</Grid>
	);
}