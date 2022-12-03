import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import Navar from './components/Navar'
import Looading from './components/Looading'
import { Container } from 'react-bootstrap'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import ProtectedRoutes from './components/ProtectedRoutes'
import Car from './components/Car'
import SignUp from './pages/SignUp'

function App() {

  const isLoading = useSelector(state => state.loading);

  return (
    <div className="App">
      <HashRouter>
        <Navar />
        {isLoading && <Looading/>}
        <Container className='my-5'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<SignUp />} />

            <Route element={<ProtectedRoutes />} > 
              <Route element={<Car />} />
              <Route path='/purchases' element={<Purchases />} />
            </Route>

          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
