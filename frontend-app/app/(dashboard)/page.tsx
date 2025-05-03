import FeaturedProductsList from "@/components/pageComponents/FeaturedProductsList"
import Header from "@/components/pageComponents/Header"
import ProductsLists from "@/components/pageComponents/ProductsLists"

const page = ({}) => {
  return <div>
    <Header />
    <FeaturedProductsList />
    <ProductsLists />
  </div>
}

export default page