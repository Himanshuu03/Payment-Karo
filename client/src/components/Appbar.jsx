import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const Appbar = ({name}) => {
    const navigate = useNavigate();
    const clickHandler=async()=>{
        navigate("/update?name="+name);
    }
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Payment Karo
        </div>
        <div className="flex" onClick={clickHandler}>
            <div className="flex flex-col justify-center h-full mr-4">
                {name}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {name.toUpperCase()[0]}
                </div>
            </div>
        </div>
    </div>
}

export default Appbar;