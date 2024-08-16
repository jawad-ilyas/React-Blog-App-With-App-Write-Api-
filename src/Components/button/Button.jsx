import React from 'react'

function Button({ children, type = 'button', bgColor = "bg-blue-400", textColor = "white", className = " ", ...props }) {
    return (
        <button className={`${className} ${bgColor} ${textColor} px-4 py-2 rounded-lg`} {...props}>{children}</button>
    )
}

export default Button