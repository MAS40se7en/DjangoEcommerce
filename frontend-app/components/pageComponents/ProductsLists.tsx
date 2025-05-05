'use client';

import { ProductProps } from "@/lib/types";
import apiService from "@/lib/utils";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ListedProduct from "./ListedProduct";

const ProductsLists = ({ }) => {
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        apiService.get('/api/home_products').then((response) => {
            console.log(response)
            setProducts(response.data)
        });
    }, [setProducts]);

    return <div className="flex flex-col gap-6 mt-6">
        <div className="px-3 pt-6">
            <h2 className="font-bold text-4xl">More Products</h2>
        </div>
        <div className="flex flex-row gap-5 px-10 overflow-auto pb-5">
            {products.map((product) => (
                <ListedProduct product={product} />
            ))}
        </div>
    </div>
}

export default ProductsLists