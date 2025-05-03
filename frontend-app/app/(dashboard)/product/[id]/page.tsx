import ProductDetails from "@/components/ProductDetails"
import { ProductProps } from "@/lib/types";
import { useParams } from "next/navigation"
import { useState } from "react";

const page = () => {
    
  return <div>
    <ProductDetails />
  </div>
}

export default page