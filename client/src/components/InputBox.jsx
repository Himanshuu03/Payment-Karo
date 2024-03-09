// eslint-disable-next-line react/prop-types
function InputBox({label,placeholder,onChange,name,value}) {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'>
            {label}
        </div>
        <input onChange={onChange} value={value} placeholder={placeholder} name={name} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
  )
}

export default InputBox