import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Calender from './Pages/Calender';

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/calendar' element={<Calender/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App