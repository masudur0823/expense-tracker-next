import React from 'react'

function Pagination({setPage, data}) {
  return (
    <div className='flex justify-end'>
        <button className='border-2 px-4 py-2 rounded-xl text-white bg-slate-400'>Prev</button>
        <button onClick={()=> setPage(data.slice(11,15))} className='border-2 px-4 py-2 rounded-xl text-white bg-slate-400'>Next</button>
    </div>
  )
}

export default Pagination