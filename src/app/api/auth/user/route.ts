import { connectToDatabase } from "@/utils/modules";
import { users } from "@/data/modules";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

    try {

        await connectToDatabase()
        const body = await request.json()
        const cookie = request.cookies.get('token')

        if(!body) return NextResponse.json({status: false})
        if(!cookie) return NextResponse.json({status: false})

        switch(body.action){
            case 'status':
                const issignup = await isSignup(cookie.value)
                return NextResponse.json({status: issignup})
            default:
                return NextResponse.json({status: false})
        }

    } catch(e) {
        console.log('[Error](/api/user)')
    }

}

async function isSignup(cookie: string) {
    return await users.findOne({'cookie':cookie}) ? true : false
}