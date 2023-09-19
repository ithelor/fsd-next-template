export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discount: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface GetProductsResponse {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
}
