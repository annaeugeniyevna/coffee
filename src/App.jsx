import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import SpecialCoffee from "./components/SpecialCoffee"

const App = () => {

  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <Categories/>
        <SpecialCoffee/>
      </main>
    </>
  )
}

export default App;