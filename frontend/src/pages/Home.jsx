import Banner from '../components/Banner'
import Header from '../components/Header'
import SpecialityHeader from '../components/SpecialityHeader'
import TopDoctors from '../components/TopDoctors'
export default function Home() {
  return (
    <div className=''>
      <Header/>
      <SpecialityHeader/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}
