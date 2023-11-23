import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from '@/utils/modules'
import { users } from '@/data/modules'
import { verifyData } from "@/utils/modules"

const encryptly = require('encryptly')

// Post
export async function POST(request: NextRequest) {

    try {

        await connectToDatabase()
        const cookie = request.cookies.get('token')?.value
        if (!cookie) return Response.json({ message: 'No cookie' })

        const {
            email,
            password
        }: {
            email: string,
            password: string
        } = await request.json()

        if (
            verifyData({type: 'email', value: email}) &&
            verifyData({type: 'password', value: password})
            ) {
            if (await isUser(email, password, cookie)) return NextResponse.json({ status: true })
            else return NextResponse.json({ status: false })
        } else return NextResponse.json({ status: false })

    } catch (e) {
        console.log('[Error](signin)')
        NextResponse.json({ status: false })
    }

}

// Check if already sign up then update new cookie and return true
async function isUser(email: string, password: string, cookie: string) {
    try {

        const encryptedPassword = encryptly.encrypt(password, process.env.ENCRYPTION_KEY)
        const user = await users.findOne({ 'email': email, 'password': encryptedPassword })
        if(user && user.cookie !== cookie) {
            await users.findOneAndUpdate({ '_id': user._id }, {'cookie': cookie})
            return true
        } else return false

    } catch (e) {
        console.log('[Error](isUser)')
        return false
    }
}