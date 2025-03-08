import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import { EventsPage } from './pages/EventsPage'
import { EventPage } from './pages/EventPage'
import { BookignPage } from './pages/BookignPage'

export const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <EventsPage></EventsPage>
        }></Route>

        <Route path='/event/:id' element={
          <>
            <EventPage></EventPage>
          </>
        }></Route>

        <Route path='/bookings' element={
          <BookignPage></BookignPage>
        }></Route>

        <Route path='*' element={
          <h1>Page No found</h1>
        }></Route>

      </Routes>
    </BrowserRouter>
  )
}
