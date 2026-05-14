import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "nsf/coaches";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const url = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder, resource_type: "image" }, (err, result) => {
          if (err || !result) reject(err ?? new Error("No result"));
          else resolve(result.secure_url);
        })
        .end(buffer);
    });

    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
