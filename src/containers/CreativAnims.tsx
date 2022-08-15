import React, {useState, useEffect, useRef} from 'react'
import WithNavBar from '../components/withnavbar'

const initCanvas = (): CanvasRenderingContext2D | null => {
    let canvasEl: HTMLCanvasElement | null = document.querySelector('canvas')
    if (canvasEl === null) return null
    let context: CanvasRenderingContext2D | null = canvasEl?.getContext('2d')
    if (context === null) return null
    return context
}

const drawInit = (context: CanvasRenderingContext2D) => {
    // square
    context.fillStyle = '#38476b'
    context.fillRect(10, 10, 590, 590)
    context.lineWidth = 4
    context.beginPath()
    context.rect(10, 10, 590, 590)
    context.stroke()

    // circle
    context.beginPath()
    context.lineWidth = 1
    context.arc(300, 300, 280, -(5 / 3) * Math.PI, -(4 / 3) * Math.PI)
    context.stroke()
}

const drawSquares = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, 600, 600)
    drawInit(context)

    const width = 60
    const height = 60
    const gap = 20
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let x = 100 + (width + gap) * i
            let y = 100 + (height + gap) * j

            context.beginPath()
            context.strokeStyle = '#adadad'
            context.rect(x, y, width, height)
            context.stroke()

            if (Math.random() > 0.5) {
                context.beginPath()
                context.strokeStyle = '#ffffff'
                context.rect(x + 8, y + 8, width - 16, height - 16)
                context.stroke()
            }
        }
    }
}

const CreativAnims = () => {
    const [timerId, setTimerId] = useState<number>(0)
    const didMount = useRef<boolean>(false)

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
            return
        }

        let context: CanvasRenderingContext2D | null = initCanvas()
        if (context === null) return
        drawInit(context)
        drawSquares(context)

        let fnSQ = drawSquares.bind(null, context)
        let tmrId = setInterval(context => fnSQ(), 1000)
        setTimerId(tmrId)

        return () => {
            clearInterval(timerId)
        }
    }, [])

    return <WithNavBar element={<canvas width={600} height={600}></canvas>} />
}

export default CreativAnims
