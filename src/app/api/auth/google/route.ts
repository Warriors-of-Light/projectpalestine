// Redirect To google auth url
export async function GET() {

  const googleAuthURL = new URL('https://accounts.google.com/o/oauth2/auth')
  googleAuthURL.searchParams.append('client_id', `${process.env.GOOGLE_CLIENT_ID}`)
  googleAuthURL.searchParams.append('redirect_uri', `${process.env.BASE_URL}/api/auth/google/callback`)
  googleAuthURL.searchParams.append('response_type', 'code')
  googleAuthURL.searchParams.append('scope', 'email profile openid')
  return Response.redirect(googleAuthURL.toString())

}