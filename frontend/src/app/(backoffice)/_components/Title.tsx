import React from 'react'

interface TitleProps {
    pageName: string;
    description: string;
}

const Title = ({pageName, description} : TitleProps) => {
  return (
    <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{pageName}</h1>
        <p className="text-gray-500">{description}</p>
    </div>
  )
}

export default Title