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