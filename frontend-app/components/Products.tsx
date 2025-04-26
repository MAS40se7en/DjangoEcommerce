'use client'

import { ProductProps } from "@/lib/types";
import apiService from "@/lib/utils";
import { useEffect, useState } from "react";

const Products = ({}) => {
    const [products, setProducts] = useState<ProductProps[]>([]);

    const getProducts = async () => {
        const url = '/api/product_list/';

        const tmpProducts = await apiService.get(url);
        setProducts(tmpProducts.data);
    }

    useEffect(() => {
        getProducts();
    }, []);
    
  return <div>Products</div>
}

export default Products