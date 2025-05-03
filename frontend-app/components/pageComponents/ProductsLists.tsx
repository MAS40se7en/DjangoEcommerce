'use client';

import { ProductProps } from "@/lib/types";
import apiService from "@/lib/utils";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

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
                <div key={product.id} className="min-w-[15rem] min-h-[20rem] shadow-lg rounded-lg flex flex-col gap-4 relative justify-between py-4 max-h-[31rem]">
                    <div>
                        <div className="relative">
                            <button className="absolute top-3 right-3 text-white font-semibold p-1">
                                <Icon icon="material-symbols:favorite-outline-rounded" width="24" height="24" />
                                {/* 
                                    if product is favorited
                                    <Icon icon="material-symbols:favorite-rounded" width="24" height="24" />
                                */}
                            </button>
                            <img src={product.image} alt={product.name} className="w-full min-h-[12rem] rounded-t-lg max-w-[16rem]" />
                        </div>
                        <h1 className="px-3 text-lg font-semibold">{product.name}
                        </h1>
                    </div>
                    <div className="mx-3 font-semibold rounded-lg px-2 py-2 flex flex-col gap-2 justify-between">
                        <div className="flex flex-row justify-between">
                            <p className="text-sm font-light">Product Price</p>
                            <p>${product.price}</p>
                        </div>
                        <hr />
                        <div className=" bg-black/85 text-white hover:bg-black/90 active:bg-black flex flex-row gap-4 justify-center items-center py-2 rounded-lg">
                            <Icon icon="material-symbols:shopping-cart-rounded" width="24" height="24" />
                            <p>Add to Cart</p>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    </div>
}

export default ProductsLists