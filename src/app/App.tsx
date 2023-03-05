import React, {MouseEvent, useEffect, useRef, useState} from 'react';
// import logo from '../assets/img/logo.svg';
// import { Counter } from '../features/counter/Counter';

import './App.css';

// ---------------------------------------------------------------------------

function App() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D  | null>(null);

    const [isDrawing, setIsDrawing] = useState(false);
        
    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas != null) {
            canvas.height = window.innerHeight * 2;
            canvas.width = window.innerWidth * 2;

            canvas.style.height = `${window.innerHeight}px`;
            canvas.style.width = `${window.innerWidth}px`;

            const context = canvas.getContext('2d');

            if (context != null) {
                context.scale(2,2);
                context.lineCap = 'round';
                context.strokeStyle = 'black';
                context.lineWidth = 5;
            }

            contextRef.current = context;
        }
    }, [])

    // -----------------------------------------------------------------------

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const {clientX, clientY} = event;
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(clientX, clientY)
        setIsDrawing(true);
    }

    // -----------------------------------------------------------------------

    const stopDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        contextRef.current?.closePath();
        setIsDrawing(false);
    }

    // -----------------------------------------------------------------------

    const mouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return;
        }
        const {clientX, clientY} = event;
        contextRef.current?.lineTo(clientX, clientY);
        contextRef.current?.stroke();
    }

    // -----------------------------------------------------------------------

    return (
        <div className="App">
            <canvas 
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={mouseMove}
                ref={canvasRef}
            />
        </div>
    );

    // -----------------------------------------------------------------------

}

// ---------------------------------------------------------------------------

export default App;

// Notes:
//
// https://hashnode.blainegarrett.com/html-5-canvas-react-refs-and-typescript-ckf4jju8r00eypos1gyisenyf
//
