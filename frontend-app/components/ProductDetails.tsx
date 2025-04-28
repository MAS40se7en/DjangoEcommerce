'use client';

import { ProductProps } from "@/lib/types";
import apiService from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const params = useParams();
    const slug = params.id as string;
    const [product, setProduct] = useState<ProductProps>();
    
    useEffect(() => {
        apiService.get(`/api/product/${slug}`).then((response) => {
            console.log(response)

            setProduct(response)
        });
    }, [])
  return <div>{product?.name}</div>
}

export default ProductDetails