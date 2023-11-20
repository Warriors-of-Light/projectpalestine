import axios from 'axios'
import { URLSearchParams } from 'url'
import { type NextRequest } from 'next/server'
import { connectToDatabase } from '@/utils/moduels'
import { users } from '@/data/modules'

export async function GET(request: NextRequest) {

  try {

    await connectToDatabase()
    const googleInfo = await getGoogleInfo(request)
    const cookie = request.cookies.get('token')?.value

    if (!cookie) return Response.json({ message: 'No cookie' })

    if (await isOldUser(googleInfo.id))
      await updateCookie(googleInfo.id, cookie)
    else
      await registerUser(googleInfo, cookie)

    return Response.redirect(`${process.env.BASE_URL}`)

  } catch (e) {

    console.log('[Error](api/auth/google/callback)')
    return Response.json({ message: 'Error while signup' })

  }

}

// Get info from google
async function getGoogleInfo(request: NextRequest) {

  try {

    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const params = new URLSearchParams()
    params.append('code', `${code}`)
    params.append('client_id', `${process.env.GOOGLE_CLIENT_ID}`)
    params.append('client_secret', `${process.env.GOOGLE_CLIENT_SECRET}`)
    params.append('redirect_uri', `${process.env.BASE_URL}/api/auth/google/callback`)
    params.append('grant_type', 'authorization_code')

    const response = await axios.post('https://oauth2.googleapis.com/token', params)
    const { access_token } = response.data
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    return userInfoResponse.data

  } catch (e) {

    console.log('[Error](getGoogleInfo)')
    return false

  }

}

// check is old user
async function isOldUser(id: string) {

  return await users.findOne({ 'id': id }) ? true : false

}

// add new connection cookie
async function updateCookie(id: string, cookie: string) {

  try {

    await users.findOneAndUpdate({ 'id': id }, { 'cookie': cookie })

  } catch (e) {

    console.log('[Error](update cookie)')

  }

}

// Register new user in database
async function registerUser(googleInfo: any, cookie: string) {

  try {

    const data = Object.assign(googleInfo, {cookie})
    const newUser = new users(data)
    await newUser.save()

  } catch (e) {

    console.log('[Error](register user)')

  }

}