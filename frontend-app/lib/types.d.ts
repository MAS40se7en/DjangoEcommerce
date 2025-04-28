export type ProductProps = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    featured: boolean;
    category: string;
}

export type CategoryProps = {
    id: number;
    name: string;
    slug: string;
    category_image: string;
}