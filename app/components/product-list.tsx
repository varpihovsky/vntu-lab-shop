import { Product } from '~/src/product';
import { Grid } from '@mui/material';
import { ProductItem } from '~/components/product-item';

export interface ProductListProps {
	products: Product[];
}

export function ProductList({ products }: ProductListProps) {
	return (
		<Grid container spacing={3}>
			{products.map(product => (
				<ProductItem key={product.id} product={product} />
			))}
		</Grid>
	);
}