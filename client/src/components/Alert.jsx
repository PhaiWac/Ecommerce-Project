import React from 'react'

function Alert({text , value}) {
  return (
    <>
        <div className="m-3">
            <p className={ !value ? "hidden" : "alert alert-error bg-red-200 rounded-md "}>
                {text}
            </p>
        </div>
    </>
  )
}

export default Alert