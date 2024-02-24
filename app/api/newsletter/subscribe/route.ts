import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

const MAILCHIMP_API_KEY = '1bf1dc28c4a0df312c242bfd465e9411-us14';
const ALL_LIST = 'd6946064ad';

export async function POST(req: NextRequest) {
  try {

    const { firstName, lastName, email } = await req.json();

    const response = await axios.post(
      `https://us14.api.mailchimp.com/3.0/lists/${ALL_LIST}/members`,
      {
        email_address: email,
        status: 'pending',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json({ message: 'Successfully subscribed to Mailchimp!' });
    } else {
      return NextResponse.json({ error: 'Failed to subscribe to Mailchimp.' }, { status: 500 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}