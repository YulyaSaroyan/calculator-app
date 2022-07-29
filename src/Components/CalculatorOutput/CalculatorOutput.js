import './CalculatorOutput.css'

const CalculatorOutput = ({ currentOperand, previousOperand, operation, formatOperand }) => {
    return (
        <div className="calculator-output">
          <div className="previous-operand">{formatOperand(previousOperand)} {previousOperand && operation}</div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
    )
}

export default CalculatorOutput