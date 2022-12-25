import { Container } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import { query } from '~/mysql.server';
import { Product } from '~/src/product';
import { ProductList } from '~/components/product-list';

interface LoaderData {
	products: Product[];
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
	const { results } = await query('SELECT * FROM goods;');
	return { products: results };
};

export default function Index() {
	const { products } = useLoaderData() as LoaderData;
	return (
		<Container maxWidth='xl'>
			<ProductList products={products} />
		</Container>
	);
}
