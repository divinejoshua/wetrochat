import { JSDOM } from 'jsdom';
import { NextRequest, NextResponse } from "next/server";

export const config = {
    runtime: 'experimental-edge',
  }

// POST request
export async function POST (req: NextRequest) {

    //Get the request body
    let request = await req.formData()
    let url = request.get("url") || ""

    const response = await fetch(url);
    const text = await response.text();
    const dom = new JSDOM(text);
    let title = dom.window.document.title || "No title found";


    //Data response
    let data = {title: title}


    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}