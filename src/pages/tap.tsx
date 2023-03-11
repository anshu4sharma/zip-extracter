import React, { MouseEvent, useState } from 'react'
type Position = {
    screenX: number; screenY: number
}
const Tap = () => {
    const [position, setPosition] = useState<Position[]>([])
    const [poppedpoint, setPoppedPoint] = useState<Position[]>([])
    const handleTap = (e: MouseEvent) => {
        const { screenX, screenY } = e
        setPosition([...position, {
            screenX, screenY
        }])
    }
    const handleRedo = () => {
        let newPopped = [...poppedpoint]
        let popped = newPopped.pop()
        if (!popped) return;
        setPosition([...position, popped])
        setPoppedPoint(newPopped)
    }
    const handleUndo = () => {
        let previouData = [...position]
        let previousPoint = previouData.pop()
        if (!previousPoint) return;
        setPoppedPoint([...poppedpoint, previousPoint])
        setPosition(previouData)
    }
    return <React.Fragment>
        <div className='flex gap-4 m-4'>
            <button disabled={poppedpoint.length == 0} onClick={handleRedo} className='disabled:opacity-30 border border-red-700 p-2 text-red-700 rounded-md'>Redo</button>
            <button disabled={position.length == 0} onClick={handleUndo} className='disabled:opacity-30 border border-blue-700 p-2 text-blue-700 rounded-md'>Undo</button>
        </div>
        <div className='h-screen m-0 p-0' onClick={handleTap}>
            {
                position.map((pos, indx) => {
                    return <div className='absolute inline-block h-4 rounded-full w-4 bg-blue-800' style={{ top: pos.screenY - 120 + "px", left: pos.screenX - 5 + "px" }} key={indx}></div>
                })
            }
        </div>
    </React.Fragment>
}

export default Tap



// import React from 'react'
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// const Tictac = () => {

//     return (
//         <>
//             <div className="flex flex-col items-center justify-center h-screen">
//                 <div className="grid grid-cols-3 gap-4 bg-gray-200 p-4 rounded-lg">
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out">X</div>
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"></div>
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out">O</div>
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"></div>
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out">X</div>
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"></div>
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out">O</div>
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"></div>
//                     <div className="bg-white h-20 w-20 flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out">X</div>
//                 </div>
//             </div>
//         </>

//     )
// }

// export default Tictac