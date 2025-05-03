'use client';

import { ProductProps } from "@/lib/types";
import apiService from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const FeaturedProductsList = ({}) => {
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        apiService.get('/api/featured_products/').then((response) => {
            console.log(response)
            setProducts(response.data)
        });
    }, [setProducts]);

    return <div className="flex flex-col gap-6">
        <div className="px-3 pt-6">
            <h2 className="font-bold text-4xl">Featured Products</h2>
        </div>
        <div className="flex flex-row gap-5 px-10 overflow-auto pb-5">
            {products.map((product) => (
                <div key={product.id} className="min-w-[15rem] min-h-[20rem] shadow-lg rounded-lg flex flex-col gap-4 relative">
                    <img src={product.image} alt={product.name} className="w-full flex flex-col gap-3 min-h-[12rem] border-2 rounded-t-lg" />
                    <h1 className="px-3 text-lg font-semibold">{product.name}
                    </h1>
                    <div className="mx-3 bg-black/85 text-white font-semibold rounded-lg px-2 py-2 flex flex-row justify-between hover:bg-black/90 active:bg-black absolute bottom-3 right-0 left-0">
                        <p>${product.price}</p>
                        <Icon icon="material-symbols:shopping-cart-rounded" width="24" height="24" />
                    </div>
                    
                </div>
            ))}
        </div>
    </div>
}

export default FeaturedProductsList