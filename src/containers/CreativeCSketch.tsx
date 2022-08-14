import React, {useEffect, useRef, useState} from 'react'
const canvasSketch = require('canvas-sketch')

interface SketchProps {
    context: CanvasRenderingContext2D
    width: number
    height: number
}

const drawSquares = ({context, width, height}: SketchProps) => {
    context.fillStyle = '#38476b'
    context.fillRect(0, 0, width, height)
    context.lineWidth = width * 0.01

    const w = width * 0.1
    const h = height * 0.1
    const gap = width * 0.03
    const ix = width * 0.17
    const iy = height * 0.17
    const off = width * 0.02

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let x = ix + (w + gap) * i
            let y = iy + (h + gap) * j

            context.beginPath()
            context.strokeStyle = '#adadad'
            context.rect(x, y, w, h)
            context.stroke()

            if (Math.random() > 0.5) {
                context.beginPath()
                context.strokeStyle = '#ffffff'
                context.rect(x + off / 2, y + off / 2, w - off, h - off)
                context.stroke()
            }
        }
    }
}

const CreativeCSketch = () => {
    const [timerId, setTimerId] = useState<number>(0)
    const didMount = useRef<boolean>(false)

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
            return
        }

        const settings = {
            dimensions: [2048, 2048],
        }

        const sketch = () => {
            return ({context, width, height}: SketchProps) => {
                let fnSQ = drawSquares.bind(null, {context, width, height})
                let tmrId = setInterval(
                    (context, width, height) => fnSQ(),
                    1000,
                )
                setTimerId(tmrId)

                return () => {
                    clearInterval(timerId)
                }
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
