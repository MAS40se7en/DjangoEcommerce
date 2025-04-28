'use client';

import { CategoryProps } from "@/lib/types";
import apiService from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryDetails = ({}) => {
    const params = useParams();
    const slug = params.id as string;
    const [category, setCategory] = useState<CategoryProps>();
    
    useEffect(() => {
        apiService.get(`/api/category/${slug}`).then((response) => {
            console.log(response)

            setCategory(response)
        });
    }, [])
  return <div>CategoryDetails</div>
}

export default CategoryDetails