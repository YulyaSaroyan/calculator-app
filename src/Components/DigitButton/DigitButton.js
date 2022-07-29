import { memo } from 'react'

import './DigitButton.css'

const DigitButton = ({ digit, dispatch }) => {
    return (
        <button className="digit-button" onClick={() => dispatch({type: 'add-digit', payload: {digit}})}>{digit}</button>
    )
}

export default memo(DigitButton)