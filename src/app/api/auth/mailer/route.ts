import { NextRequest, NextResponse } from "next/server"
import { EmailTemplate } from '@/app/_lib/modules'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {

    try {

        // email
        const { email } = await request.json()
        // Generate code to verify email
        const code = Math.floor(Math.random() * (999999 - 111111) + 111111)
        const payload = {
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Verfication Code',
            react: EmailTemplate({
                title: 'Welcome to project palestine!',
                content: `Your verification code is: ${code}`
            }),
        }
        
        const data = await resend.emails.send(payload)

        return NextResponse.json(data);

    } catch (e) {

        console.log('[Error](mailer)')
        return Response.json({ message: 'error' })

    }

}