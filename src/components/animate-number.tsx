"use client"

import { useEffect, useState } from "react"
import NumberFlow from '@number-flow/react'

export default function AnimatedNumber({ value }: { value: number }) {
    const [display, setDisplay] = useState(0)
    
    useEffect(() => {
        setDisplay(value)
    }, [value])

    return <NumberFlow value={display} />
}