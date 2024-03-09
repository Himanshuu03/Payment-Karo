import { Route ,Routes} from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Send from "./pages/Send"
import Me from "./components/Me"
import Update from "./pages/Update"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Me/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/send" element={<Send/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
    </div>
  )
}

export default App