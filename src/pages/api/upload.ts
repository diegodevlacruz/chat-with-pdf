import type { APIRoute } from "astro";

import {
    v2 as cloudinary, type UploadApiResponse
} from 'cloudinary';

cloudinary.config({
    cloud_name: "dw4r3bbb7",
    api_key: "564461826367369",
    api_secret: import.meta.env.CLOUDINARY_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadStream = async (buffer: Uint8Array, options: {
    folder: string
}): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary
            .uploader
            .upload_stream(options, (error, result) => {
                if (result) return resolve(result);
                reject(error);
            }).end(buffer)
    })
}

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (file == null) {
        return new Response("No file found", { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer();
    const unit8Array = new Uint8Array(arrayBuffer);

    const result = await uploadStream(unit8Array, {
        folder: 'pdf'
    })

    const {
        asset_id: id,
        secure_url: url,
        pages
    } = result

    return new Response(JSON.stringify({
        id,
        url,
        pages
    }));

}
