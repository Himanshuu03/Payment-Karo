import { useEffect, useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import { Header,SubHeading } from "../components/Headers"
import InputBox from "../components/InputBox"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';

function Signin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userData ,setUserData] = useState({
    email:"",
    password:""
})
  useEffect(()=>{
    const check = async () => {
      if (!token) {
        navigate("/signin");
      } else {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/user/", {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            if(response.status === 200){
                navigate("/dashboard");
            }
        } catch (error) {
          toast.error("Login !!!");
            navigate("/signin");
        }
      }
    };
    check();
  },[])
  function changeHandler(event){
    setUserData((prevState)=>{
        console.log(userData);
        return{
            ...prevState,
            [event.target.name]:event.target.value
        }
    })
}
async function clickHandler(){
  try {   
    const response = await axios.post("http://localhost:8080/api/v1/user/signin", {
        email:userData.email,
        password:userData.password
    });
    localStorage.setItem("token", response.data.token)
    navigate("/dashboard")
    toast.success("Login Successfully")
  } catch (error) {
    toast.error("Invalid Credential");
  }
}
  return (
    <div className="bg-slate-300 h-screen flex justify-center" >
        <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Header label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="JohnDoe@gmail.com" label={"Email"} name={"fName"} onChange={(event)=>{changeHandler(event)}}/>
        <InputBox placeholder="a1b2c3" label={"Password"} name={"password"} onChange={(event)=>{changeHandler(event)}}/>
        <div className="pt-4">
          <Button label={"Sign in"} onClick={clickHandler}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
    </div>
  )
}

export default Signin