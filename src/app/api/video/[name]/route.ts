import { NextRequest } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  context: { params: { name: string } },
) {
  try {
    const videoPath = path.join(
      process.cwd(),
      'src',
      'videos',
      context.params.name,
    )
    const videoBuffer = await fs.readFile(videoPath)

    // Set response headers for proper video streaming
    const headers = new Headers()
    headers.set('Content-Type', 'video/mp4')
    headers.set('Content-Length', videoBuffer.length.toString())
    headers.set('Accept-Ranges', 'bytes')

    return new Response(videoBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    return Response.json(
      { error: 'Video not found' },
      {
        status: 404,
      },
    )
  }
}
