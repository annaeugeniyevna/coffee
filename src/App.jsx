import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'

const App = () => {

  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <Categories/>
      </main>
    </>
  )
}

export default App;