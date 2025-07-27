import './App.css'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'

function App() {
  const routeElements = useRouteElements()
  return (
    <div>
      {routeElements}
      <ToastContainer toastClassName='text-left' />
    </div>
  )
}

export default App
