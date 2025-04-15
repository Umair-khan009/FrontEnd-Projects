import React from 'react'
import Sidebar from './Components/Sidebar'
import Weather from './Components/Weather'
import TodayHighlight from './Components/TodayHighlight'
import Forcast from './Components/Forcast'
import Other from './Components/Other'
import Search from './Components/Search'


const App = () => {
  return (
    <main className='h-screen w-full bg-slate-950 overflow-hidden grid grid-cols-[80px_40%_1fr] grid-rows-[50px_auto_1fr] gap-4 p-2'>
     <Sidebar />
     <Search />
     <Weather />
     <TodayHighlight />
     <Other />
     <Forcast />

    </main>
  )
}

export default App