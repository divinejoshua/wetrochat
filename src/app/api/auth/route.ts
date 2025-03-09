import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/app/actions";
import { generateRandomText } from "@/app/utils/generic";

export const config = {
    runtime: 'experimental-edge',
  }


// POST request
export async function POST (req: NextRequest) {

    let response : any


    //Get the request body
    let request = await req.formData()
    let organisationId = request.get("organisationId") || ""
    let apiKey = request.get("apiKey") || ""


    let user = {
        organisationId: organisationId,
        apiKey : apiKey,
    }
    // Register the user to database if not exists
    try {
        response = await getOrCreateUser(user)
    }catch (error){
        return NextResponse.json({
            error : true,
            errorMessage : "Error occurred"
        }, {
            status: 400,
        });
    }



    //Data response
    let data = response
    data.code = generateRandomText()+organisationId

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}