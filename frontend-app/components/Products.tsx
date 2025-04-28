'use client'

import { ProductProps } from "@/lib/types";
import apiService from "@/lib/utils";
import { useEffect, useState } from "react";

const Products = ({}) => {
    useEffect(() => {
        apiService.get('/api/product_list').then((response) => {
            console.log(response)
        });
    }, []);
    
  return <div>Products</div>
}

export default Products