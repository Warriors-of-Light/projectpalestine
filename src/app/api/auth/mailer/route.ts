import { NextRequest, NextResponse } from "next/server"
import { EmailTemplate } from '@/app/_lib/modules'
import { Resend } from 'resend'
import { connectToDatabase } from "@/utils/modules"
import { verificationCode } from "@/data/modules"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {

    try {

        await connectToDatabase()

        // email
        const { email } = await request.json()

        // Generate code to verify email
        const code = String(Math.floor(Math.random() * (999999 - 100000) + 100000))

        // Register the code in a database for a period of 30 seconds
        await registerVerificationCode(email, code)

        // Remove code from database after 30 seconds
        removeVerificationCodeAfter30s(email, code)

        const payload: any = {
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Verfication Code',
            react: EmailTemplate({
                title: 'Welcome to project palestine!',
                content: `Your verification code is: ${code}`
            }),
        }
        
        const data = await resend.emails.send(payload)

        return NextResponse.json(data)

    } catch (e) {

        console.log('[Error](mailer)')
        return Response.json({ message: 'error' })

    }

}

async function registerVerificationCode(email: string, code: string) {
    try{
        const newCode = new verificationCode({email, code})
        await newCode.save()
    } catch(e) {
        console.log('[Error](registerVerificationCode)')
        return NextResponse.json({message: 'Error'});
    }
}

async function removeVerificationCodeAfter30s(email: string, code: string) {
    try{
        await connectToDatabase()
        await new Promise((resolve) => {
            setTimeout(async () => {
                await verificationCode.deleteOne({ 'email': email, 'code': code }), resolve
            }, 30000)
        })
    } catch(e) {
        console.log('[Error](removeVerificationCodeAfter30s)')
        return NextResponse.json({message: 'Error'});
    }
}