import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import { Home, Shop, About, Contact } from "./pages/exports.pages"


function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index path="/home" element={<Home/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
      </Route>
    </Routes>
  )
}

export default App
