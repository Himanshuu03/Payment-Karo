/* eslint-disable react/prop-types */
const Balance = ({ value }) => {
    value = value.toFixed(2);
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}

export default Balance;

