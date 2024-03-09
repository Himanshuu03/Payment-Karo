import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Header, SubHeading } from "../components/Headers";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import { toast } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();
    const [userData ,setUserData] = useState({
        fName:"",
        lName:"",
        email:"",
        password:""
    })
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
        const response = await axios.post("https://payment-karo.vercel.app/api/v1/user/signup", {
            fName:userData.fName,
            lName:userData.lName,
            email:userData.email,
            password:userData.password
        });
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard");
        toast.success("Login Successfully");
      } catch (error) {
        toast.success("Invalid Credential");
      }
      }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Header label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(event)=>{changeHandler(event)}} placeholder="John" label={"First Name"} name={"fName"}  />
        <InputBox onChange={(event)=>{changeHandler(event)}} placeholder="Doe" label={"Last Name"} name={"lName"} />
        <InputBox onChange={(event)=>{changeHandler(event)}} placeholder="JohnDoe@gmail.com" label={"Email"} name={"email"}/>
        <InputBox onChange={(event)=>{changeHandler(event)}} placeholder="a1b2c3" label={"Password"} name={"password"} />
        <div className="pt-4">
          <Button onClick={clickHandler} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}

export default Signup