import { NextResponse } from 'next/server'
import Replicate from 'replicate'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing prediction ID' }, { status: 400 })
    }

    // Handle the Mock Simulation
    if (id === 'mock_prediction_id' || !process.env.REPLICATE_API_TOKEN) {
      // Return a simulated success after frontend polls for a bit
      return NextResponse.json({
        id: 'mock_prediction_id',
        status: 'succeeded',
        output: [
          "/images/generated/angle1.png",
          "/images/generated/angle2.png",
          "/images/generated/angle3.png",
          "/images/generated/angle4.png"
        ]
      })
    }

    // Handle Real Replicate API
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })

    const prediction = await replicate.predictions.get(id)
    return NextResponse.json(prediction)

  } catch (error) {
    console.error("Error checking AI Try-On status:", error)
    return NextResponse.json({ error: 'Failed to check status' }, { status: 500 })
  }
}
