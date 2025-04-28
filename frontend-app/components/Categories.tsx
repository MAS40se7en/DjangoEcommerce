'use client'

import apiService from "@/lib/utils";
import { useEffect } from "react"

const Categories = ({}) => {
    useEffect(() => {
        apiService.get('/api/category_list').then((response) => {
            console.log(response)
        });
    })
  return <div>Categories</div>
}

export default Categories