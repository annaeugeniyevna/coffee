import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import SpecialCoffee from "./components/SpecialCoffee"
import SpecialDessert from "./components/SpecialDessert"

const App = () => {

  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <Categories/>
        <SpecialCoffee/>
        <SpecialDessert/>
      </main>
    </>
  )
}

export default App;