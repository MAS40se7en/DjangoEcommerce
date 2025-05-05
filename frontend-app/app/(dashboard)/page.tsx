import FeaturedProductsList from "@/components/pageComponents/FeaturedProductsList"
import Header from "@/components/pageComponents/Header"
import ProductsLists from "@/components/pageComponents/ProductsLists"
import ProfileData from "@/components/ProfileData"

const page = ({}) => {
  return <div>
    <Header />
    <ProfileData />
    <FeaturedProductsList />
    <ProductsLists />
  </div>
}

export default page