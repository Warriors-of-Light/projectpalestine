import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/utils/modules"
import { company, COMPANY_TYPE } from "@/data/modules"

// GET
export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url)
        
        if (searchParams.get('id')) {
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
    return await company.findOne({ '_id': id })
}

// Post
export async function POST(request: NextRequest) {
    try {
        const { action, companyData }: { action: string, companyData: COMPANY_TYPE } = await request.json()
        if (action === 'add') {
            await addCompany(companyData)
            return NextResponse.json({ status: true })
        } else if (action === 'edit') {
            await editCompany(companyData)
            return NextResponse.json({ status: true })
        } else return NextResponse.json({ status: false })
    } catch (e) {
        console.log('[Error]', e)
        NextResponse.json({ status: false })
    }
}

// Add company
async function addCompany(companyData: COMPANY_TYPE) {
    await connectToDatabase()
    const newCompany = new company(companyData)
    await newCompany.save()
    return true
}

async function editCompany(companyData: COMPANY_TYPE) {
    await connectToDatabase()
    await company.findByIdAndUpdate({ '_id': companyData._id }, companyData)
    return true
}

// Delete
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        if (searchParams.get('id')) {
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
    return await company.deleteOne({ '_id': id })
}
