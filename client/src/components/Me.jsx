import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Me() {
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const check = async () => {
      if (!token) {
        navigate("/signin");
      } else {
        try {
            const response = await axios.get("https://payment-karo.vercel.app/api/v1/user/", {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            if(response.status === 200){
                navigate("/dashboard");
            }
        } catch (error) {
            navigate("/signin");
        }
      }
    };
    check();
  });
  return;
}

export default Me;
