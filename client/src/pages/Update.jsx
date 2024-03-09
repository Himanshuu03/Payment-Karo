import { useNavigate, useSearchParams } from "react-router-dom";
import InputBox from "../components/InputBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Update() {
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [balance,setBalance] = useState(0);
  const [info,setInfo] = useState({
    fName:"",
    lName:"",
    password:""
  })
  useEffect(()=>{
    const checkBalance = async() =>{
      const authToken = "Bearer "+localStorage.getItem("token");
      try {
        const res = await axios.get(`https://payment-karo.vercel.app/api/v1/bank/getBalance`,{
          headers :{
              authorization : authToken
          }
        })
        setBalance(res.data.balance.toFixed(2));
        const userInfo = await axios.get(`https://payment-karo.vercel.app/api/v1/user/${res.data.id}`);
        const {fName,lName,password} = userInfo.data.user;
        setInfo({
          fName:fName,
          lName:lName,
          password:password
        })
      } catch (error) {
        toast.error("Login !!!");
        navigate("/signin");
      }
    }
    checkBalance();
  },[])
  function changeHandler(event){
    setInfo((prevState)=>{
      return{
        ...prevState,
        [event.target.name] : event.target.value
      }
    })
  }
  async function clickHandler(){
    const authToken = "Bearer "+localStorage.getItem("token");
    try {   
      await axios.put("https://payment-karo.vercel.app/api/v1/user/", {
        fName:info.fName,
        lName:info.lName,
        password:info.password
      },
      {
        headers :{
          authorization:authToken,
        }
      }
      );
      navigate("/dashboard")
      toast.success("Update Successfully")
    } catch (error) {
      navigate("/dashboard")
      toast.error("Try Again Later");
    }
  }
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">User Information</h2>
            <h4 className="text-xl font-bold text-center">Balance : {balance}</h4>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                    Update Information
                </label>
              </div>
              <InputBox label={"First Name"} onChange={(event)=>{changeHandler(event)}} value={info.fName} name={"fName"}/>
              <InputBox label={"Last Name"} onChange={(event)=>{changeHandler(event)}} value={info.lName} name={"lName"}/>
              <InputBox label={"Password"} onChange={(event)=>{changeHandler(event)}} value={info.password} name={"password"}/>
              <button
              onClick={clickHandler}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Update Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update