import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase, verifyData } from '@/utils/modules'
import { users, verificationCode } from '@/data/modules'

const encryptly = require('encryptly')

// Post
export async function POST(request: NextRequest) {

    try {

        await connectToDatabase()
        const cookie = request.cookies.get('token')?.value
        if (!cookie) return NextResponse.json({ message: 'No cookie' })

        const {
            name,
            email,
            password,
            code
        }: {
            name: string,
            email: string,
            password: string,
            code: string
        } = await request.json()

        if (
            verifyData({ type: 'name', value: name }) &&
            verifyData({ type: 'email', value: email }) &&
            verifyData({ type: 'password', value: password }) &&
            await isValidVerificationCode(email, code)
        ) {
            if (!await isOldEmail(email)) {
                await registerUser(name, email, password, cookie)
                return NextResponse.json({ status: true })
            } else {
                return NextResponse.json({ status: false })
            }
        } else {
            return NextResponse.json({ status: false })
        }

    } catch (e) {
        console.log('[Error](signup)')
        return NextResponse.json({ status: false })
    }

}

// check is old user
async function isOldEmail(email: string) {
    try {
        return await users.findOne({ 'email': email }) ? true : false
    } catch (e) {
        console.log('[Error](isOldEmail)')
    }

}

// Check verification code
async function isValidVerificationCode(email: string, code: string) {
    try {
        return await verificationCode.findOne({ 'email': email, 'code': code }) ? true : false
    } catch (e) {
        console.log('[Error](isValidVerificationCode)')
    }
}

// Register new user in database
async function registerUser(name: string, email: string, password: string, cookie: string) {

    try {

        const defaultPicture = 'https://cdn3.iconfinder.com/data/icons/leto-user-group/64/__user_person_profile-64.png'
        const encryptedPassword = encryptly.encrypt(password, process.env.ENCRYPTION_KEY)

        const data = Object.assign({}, {
            name,
            email,
            password: encryptedPassword,
            picture: defaultPicture,
            cookie
        })
        const newUser = new users(data)
        await newUser.save()

    } catch (e) {

        console.log('[Error](registerUser)', e)

    }

}
