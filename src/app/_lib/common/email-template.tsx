import * as React from 'react'

interface EmailTemplateProps {
    title: string,
    content: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    title,
    content,
}) => (
    <div style={{
        background: '#eee',
        color: '#555',
        padding: 10,
        borderRadius: 10
    }}>
        <div style={{fontSize: 20, fontWeight: 800}}>{title}</div>
        <div style={{fontSize: 15, fontWeight: 500}}>{content}</div>
    </div>
)