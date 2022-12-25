import { Product } from '~/src/product';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface CartProduct {
	product: Product;
	count: number;
}

export interface Cart {
	products: CartProduct[];

	addProduct(product: Product): void;

	removeProduct(product: Product): void;

	setCount(product: Product, count: number): void;
}

const Context = createContext<Cart>({
	products: [],
	addProduct(product: Product) {
	},
	removeProduct(product: Product) {
	},
	setCount(product: Product, count: number) {
	},
});

export function CartProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<CartProduct[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem('products');
		if (stored) {
			setProducts(JSON.parse(stored));
		}
	}, []);

	return (
		<Context.Provider value={{
			products,
			addProduct(product: Product) {
				setProducts(prevState => {
					const n = [...prevState, { product, count: 1 }];
					localStorage.setItem('products', JSON.stringify(n));
					return n;
				});
			},
			removeProduct(product: Product) {
				setProducts(prevState => {
						const n = prevState.filter(
							productInCart => productInCart.product.id != product.id,
						);
						localStorage.setItem('products', JSON.stringify(n));
						return n;
					},
				);
			},
			setCount(product: Product, count: number) {
				setProducts(prevState => {
					const n = prevState.map(productInCart => {
						if (productInCart.product.id == product.id) {
							return { ...productInCart, count: count };
						}
						return productInCart;
					});
					localStorage.setItem('products', JSON.stringify(n));
					return n;
				});
			},
		}}>
			{children}
		</Context.Provider>
	);
}

export function useCart() {
	return useContext(Context);
}