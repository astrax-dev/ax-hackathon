// #genai
import LazyThreeBackground from './components/LazyThreeBackground'
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterFlow from './components/RegisterFlow'
import Sponsors from './components/Sponsors'

export default function App() {
  return (
    <>
      <LazyThreeBackground />
      <div className="min-h-screen relative z-10 flex flex-col">
        <Header />
        <main className="flex-1 pt-10 pb-24 lg:pt-10">
          <RegisterFlow />
          <Sponsors />
        </main>
        <Footer />
      </div>
    </>
  )
}
