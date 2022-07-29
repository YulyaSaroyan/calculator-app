import React, { useReducer } from 'react' 

import CalculatorOutput from './Components/CalculatorOutput/CalculatorOutput'
import OperationButton from './Components/OperationButton/OperationButton'
import DigitButton from './Components/DigitButton/DigitButton'

import './App.css'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'add-digit':
      if(payload.digit === '0' && state.currentOperand === '0') return state
      if(state.currentOperand && payload.digit === '.' && state.currentOperand.includes('.')) return state

      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        overwrite: false
      }
      
    case 'clear':
      return {}
  
    case 'choose-operation':
      if(state.previousOperand === undefined) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: undefined
        }
      }

      if(state.currentOperand === undefined) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      return {
        ...state,
        previousOperand: calculate(state),
        operation: payload.operation,
        currentOperand: undefined
      }

    case 'evaluate':
      if(state.currentOperand === undefined && state.previousOperand && state.operation) {
        return state
      }   

      if (state.currentOperand === undefined) return state

      return {
        ...state,
        previousOperand: undefined,
        operation: undefined,
        currentOperand: calculate(state),
        overwrite: true
      }

    case 'delete-digit':
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    default:
      return state
  }
}

const calculate = ({ currentOperand, previousOperand, operation }) => {
  let previous = parseFloat(previousOperand)
  let current = parseFloat(currentOperand)

  if (isNaN(previous) || isNaN(current)) return ''

  let calculation = ''

  switch (operation) {
    case '+':
      calculation = previous + current
      break;
    case '-':
      calculation = previous - current
      break;
    case '*':
      calculation = previous * current
      break;
    case '/':
      calculation = previous / current
      break;
    default:
      break;
  }

  return calculation.toString()
}

const integerFormatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})

const formatOperand = operand => {
  if(operand == null) return

  const [integer, decimal] = operand.split('.')

  if(decimal == null) return integerFormatter.format(integer)

  return `${integerFormatter.format(integer)}.${decimal}`
} 

const App = () => {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <>
      <h1>Hello friend, welcome to a custom made calculator app</h1>
      <div className="calculator">
        <CalculatorOutput currentOperand={currentOperand} previousOperand={previousOperand} operation={operation} formatOperand={formatOperand}/>
        <button className="AC" onClick={() => dispatch({type: 'clear'})}>AC</button>
        <button className="DEL" onClick={() => dispatch({type: 'delete-digit'})}>DEL</button>
        <OperationButton operation="/" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <OperationButton operation="*" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className="equals" onClick={() => dispatch({type: 'evaluate'})}>=</button>
      </div>
    </>
  )
}

export default App
