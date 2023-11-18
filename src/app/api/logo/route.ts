import { NextRequest, NextResponse } from "next/server"

// GET
export async function GET(request: NextRequest) {

    try {

        const { searchParams } = new URL(request.url)
        const data = await searchIcon(searchParams.get('query') || '')
        return NextResponse.json(data)

    } catch (e) {

        console.log('[Error]', e)
        return NextResponse.json({ message: 'Error' })

    }

}

async function searchIcon(query: string) {

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.ICONFINDER_API_KEY}`
        }
    }
    
    const response = await fetch(`https://api.iconfinder.com/v4/icons/search?query=${query}&count=24`, options)
        .then(res => res.json())

    const cleanData = response.icons.map((icon: any) => {
        return {
            src: icon.raster_sizes[5].formats[0].preview_url,
            width: icon.raster_sizes[5].size_width,
            height: icon.raster_sizes[5].size_height
        }
    })

    return cleanData

}