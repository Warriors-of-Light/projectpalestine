import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/utils/moduels"
import { company, COMPANY_TYPE } from "@/data/modules"

// GET
export async function GET(request: NextRequest) {
    try {
        const data = await getCompanies()
        return NextResponse.json({ data })
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