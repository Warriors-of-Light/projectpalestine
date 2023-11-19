// message user and make connection //

'use client'

import { useEffect } from 'react'
import { Icon } from "@/app/_lib/modules";

export function Message({
    type = 'success',
    message,
    closeMessage
}:{
    type: 'danger' | 'alert' | 'success',
    message: string,
    closeMessage: () => void
}) {

    if(!message) return


    useEffect(() => {
        setTimeout(() => closeMessage, 2000)
    }, [])

    return (
        <div className="animate-toleft center fixed right-0 bottom-0 gap padding margin bg-t-background rd shadow">
            {type === 'danger' && <Icon type="remove" />}
            {type === 'alert' && <Icon type="alert" />}
            {type === 'success' && <Icon type="check" />}
            <span className="title whitespace-nowrap">{message}</span>
        </div>
    )

}