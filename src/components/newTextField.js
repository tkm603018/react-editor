import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'

export default ({defaultValue, onChange, ...restProps}) => {
  const init = (typeof defaultValue !== 'undefined') ? defaultValue : (restProps.default || "")
  const [value, setValue] = useState(init)
  const reset = () => setValue(init)
  useEffect(()=>{
    onChange && onChange(value)
  }, [value, onChange])
  const render = (
    <TextField {...restProps} value={value} onChange={e=>setValue(e.target.value)} />
  )
  return {value, render, reset}
}
