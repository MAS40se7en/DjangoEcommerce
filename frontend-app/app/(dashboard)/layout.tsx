import Footer from "@/components/pageComponents/Footer"
import Navbar from "@/components/pageComponents/Navbar"

const layout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="flex flex-col min-h-screen gap-10">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
}

export default layout