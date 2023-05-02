import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import ListPosts  from './components/ListPosts'


function App() {

  return (
    <div className="App">
      <MyNavBar />
      <ListPosts  />

    </div>
  )
}

export default App
