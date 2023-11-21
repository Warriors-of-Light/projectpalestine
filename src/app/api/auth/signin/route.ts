import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from '@/utils/moduels'
import { users } from '@/data/modules'

// Post
export async function POST(request: NextRequest) {

    try {

        await connectToDatabase()
        const cookie = request.cookies.get('token')?.value
        if (!cookie) return Response.json({ message: 'No cookie' })

        const {
            name,
            email,
            password
        }: {
            name: string,
            email: string,
            password: string
        } = await request.json()

        if (name && email && password) {
            if(!isOldEmail(email)){
                await registerUser(name, email, password, cookie)
            return NextResponse.json({ message: 'signin' })
            }else {
                return NextResponse.json({ message: 'incorrect email' })
            }
        } else {
            return NextResponse.json({ message: 'incorrect data' })
        }

    } catch (e) {
        console.log('[Error]', e)
        NextResponse.json({ status: false })
    }
    
}

// check is old user
async function isOldEmail(email: string) {

    return await users.findOne({ 'email': email }) ? true : false

}

// Register new user in database
async function registerUser(name: string, email: string, password: string, cookie: string) {

    try {

        const data = Object.assign({}, {
            name,
            email, 
            password,
            picture: '',
            cookie
        })
        const newUser = new users(data)
        await newUser.save()

    } catch (e) {

        console.log('[Error](register user)')

    }

}