import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const [balance,setBalance] = useState(0);
  const [name,setName] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const checkBalance = async() =>{
      const authToken = "Bearer "+localStorage.getItem("token");
        axios.get(`https://payment-karo.vercel.app/api/v1/bank/getBalance`,{
            headers :{
                authorization : authToken
            }
        } ).then((res)=>{
          setBalance(res.data.balance)
          setName(res.data.name)
        }).catch(()=>{
          toast.error("Login !!!");
          navigate("/signin");
        })
      }
    checkBalance();
  },[])
    return <div>
        <Appbar name={name}/>
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}

export default Dashboard;

