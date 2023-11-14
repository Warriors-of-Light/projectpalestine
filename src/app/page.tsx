// Home page

// local
import { Background, Header, Hero, Loader } from '@/components/modules'

export default function Home() {
  //await new Promise(resolve => setTimeout(resolve, 300000))
  return (
    <main className="main">
      <Background />
      <Header />
      <Hero />
    </main>
  )
}
