import React, {useEffect} from 'react'
const canvasSketch = require('canvas-sketch')

interface SketchProps {
    context: CanvasRenderingContext2D
    width: number
    height: number
}

const CreativeCSketch = () => {
    useEffect(() => {
        const settings = {
            dimensions: [2048, 2048],
        }

        const sketch = () => {
            return ({context, width, height}: SketchProps) => {
                context.fillStyle = 'white'
                context.fillRect(0, 0, width, height)
            }
        }

        canvasSketch(sketch, settings)
    }, [])

    return (
        <React.Fragment>
            <h1>Canvas Sketch</h1>
        </React.Fragment>
    )
}

export default CreativeCSketch
