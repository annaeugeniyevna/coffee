import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import SpecialCoffee from "./components/SpecialCoffee"
import SpecialDessert from "./components/SpecialDessert"
import CoffeeBeans from "./components/CoffeeBeans"

const App = () => {

  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <Categories/>
        <SpecialCoffee/>
        <SpecialDessert/>
        <CoffeeBeans/>
      </main>
    </>
  )
}

export default App;