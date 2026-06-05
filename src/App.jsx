// import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import SpecialCoffee from "./components/SpecialCoffee"
import SpecialDessert from "./components/SpecialDessert"
import CoffeeBeans from "./components/CoffeeBeans"
import Testimonials from "./components/Testimonials"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"

const App = () => {

  return (
    <>
      {/* <Navbar/> */}
      <main>
        <Hero/>
        <Categories/>
        <SpecialCoffee/>
        <SpecialDessert/>
        <CoffeeBeans/>
        <Testimonials/>
        <Newsletter/>
      </main>
      <Footer/>
    </>
  )
}

export default App;