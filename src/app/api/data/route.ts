import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/utils/moduels"
import { company, COMPANY_TYPE } from "@/data/modules"

// GET
export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url)

        if(searchParams.get('id')) {
            const data = await getCompany(searchParams.get('id') || '')
            return NextResponse.json({ data })
        } else {
            const data = await getCompanies()
            return NextResponse.json({ data })
        }
        
    } catch (e) {
        console.log('[Error]', e)
        NextResponse.json({ message: 'Error' })
    }
}

// Get companies
async function getCompanies() {
    await connectToDatabase()
    return await company.find({})
}

// Get company
async function getCompany(id: string) {
    await connectToDatabase()
    return await company.findOne({'_id' : id})
}

// Post
export async function POST(request: NextRequest) {
    try {
        const data: COMPANY_TYPE = await request.json()
        await addCompany(data)
        return NextResponse.json({ status: true })
    } catch (e) {
        console.log('[Error]', e)
        NextResponse.json({ status: false })
    }
}

// Add company
async function addCompany(data: COMPANY_TYPE) {
    await connectToDatabase()
    const newCompany = new company(data)
    await newCompany.save()
    return true
}

// Delete
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        if(searchParams.get('id')) {
            await deleteCompany(searchParams.get('id') || '')
            return NextResponse.json({ status: true })
        } else {
            return NextResponse.json({ status: false })
        }
    } catch (e) {
        console.log('[Error]', e)
        NextResponse.json({ status: false })
    }
}

// Delete company
async function deleteCompany(id: string) {
    await connectToDatabase()
    return await company.deleteOne({'_id': id})
}
