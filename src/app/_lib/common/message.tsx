// message user and make connection //

'use client'

import { useEffect } from 'react'
import { Icon } from "@/app/_lib/modules";

export function Message({
    message,
    closeMessage
}:{
    message: {
        type: 'danger' | 'alert' | 'success',
        message: string,
    } | null,
    closeMessage: () => void
}) {

    if(!message) return

    useEffect(() => {
        setTimeout(() => closeMessage(), 4000)
    }, [])

    return (
        <div className="animate-toleft center fixed right-0 bottom-0 gap padding margin bg-t-background rd shadow">
            {message.type === 'danger' && <Icon type="remove" />}
            {message.message === 'alert' && <Icon type="alert" />}
            {message.type === 'success' && <Icon type="check" />}
            <span className="title whitespace-nowrap">{message.message}</span>
        </div>
    )

}