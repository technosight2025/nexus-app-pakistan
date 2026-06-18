import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { userImage, productImage } = await req.json()

    if (!userImage || !productImage) {
      return NextResponse.json({ error: 'Missing image data' }, { status: 400 })
    }

    // Check if Replicate API key is configured
    if (!process.env.REPLICATE_API_TOKEN) {
      console.warn("REPLICATE_API_TOKEN is missing. Returning a mock prediction ID for simulation mode.")
      return NextResponse.json({ 
        id: 'mock_prediction_id',
        status: 'starting'
      })
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })

    // If the productImage is a local URL, we must convert it to base64 for Replicate
    let finalProductImage = productImage
    if (productImage.startsWith('/')) {
      const filePath = path.join(process.cwd(), 'public', productImage)
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath)
        const mimeType = productImage.endsWith('.png') ? 'image/png' : 'image/jpeg'
        finalProductImage = `data:${mimeType};base64,${fileBuffer.toString('base64')}`
      }
    }

    // Start the prediction on Replicate using Face Swap model
    const prediction = await replicate.predictions.create({
      version: "9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d", // lucataco/faceswap
      input: {
        target_image: finalProductImage, // The professional model wearing the rental dress
        swap_image: userImage       // The user's uploaded face
      }
    })

    return NextResponse.json(prediction)

  } catch (error: any) {
    console.error("Error starting AI Try-On:", error)
    return NextResponse.json({ 
      error: 'Failed to start generation',
      details: error.message || String(error)
    }, { status: 500 })
  }
}
