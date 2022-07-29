import { memo } from 'react'

import './OperationButton.css'

const OperationButton = ({ operation, dispatch }) => {
    return (
        <button className="operation-button" onClick={() => dispatch({type: 'choose-operation', payload: {operation}})}>{operation}</button>
    )
}

export default memo(OperationButton)