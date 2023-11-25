import { NextResponse } from "next/server"
import { NextRequest } from 'next/server'
import { v4 } from 'uuid'

// middleware
export async function middleware(request: NextRequest) {

    if (!request.cookies.get('token')) {
        if (request.nextUrl.pathname === '/') {
            const res = NextResponse.next()
            res.cookies.set("token", v4(), { path: "/", httpOnly: true })
            return res
        } else {
            return Response.redirect(`${process.env.BASE_URL}`)
        }
    }

    // ! Decilned normal access to /admin
    if(request.nextUrl.pathname.startsWith('/admin')){
        if(request.cookies.get('admin')?.value !== process.env.ADMIN_PASSWORD)
            return Response.redirect(`${process.env.BASE_URL}`)
    }

}
