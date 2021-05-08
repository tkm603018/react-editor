import {useState} from 'react'

export default (props) => {
  const max = props.max || 1000
  const [values, setValues] = useState(props.default || [])
  const pushValue = val => {
    setValues(_state=>([..._state, val].slice(0, max)))
  }
  const removeValues = cond => setValues(_state=>_state.filter((x,i)=>!cond(x,i)))
  const clearValues = () => setValues([])
  const hasValues = () => values && values.length > 0
  const accessors = {values, pushValue, removeValues, clearValues, hasValues, setValues}
  // const ListComponent = useCallback(props.List.bind(undefined, {...props.listProps, ...accessors}), [])
  // const SelectorComponent = useCallback(props.Selector.bind(undefined, {...props.selectorProps, ...accessors}), [values])

  // return {...accessors, ListComponent, SelectorComponent}
  return accessors
}
