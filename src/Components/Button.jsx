import React from 'react'

const Button = ({
	childern,
	type = 'button',
	bgColor = 'bg-gray-500',
	textColor = 'text-white',
	className = '',
	...props



}) => {
  return (
	<button
		className={`px-w py-4 ${bgColor} ${textColor} ${className}`}
		type={type}
		{...props}
	>{childern}</button>
  )
}

export default Button