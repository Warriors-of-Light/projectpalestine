'use client'

import { useEffect, useState } from "react"

export default function Dev() {

    const [data, setData] = useState<{ src: string, width: number, height: number }[]>([])
    useEffect(() => getIcons(), [])

    const getIcons = () => {

        fetch('/api/logo?query=sun')
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err))

    }

    return (
        <main className="main">
            <div className="stack">
                {
                    data.map(icon => {
                        return (
                            <img
                                src={icon.src}
                                width={icon.width}
                                height={icon.height}
                            />
                        )
                    })
                }
            </div>
        </main>
    )
}