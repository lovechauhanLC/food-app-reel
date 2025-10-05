import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
    try {
    // Convert buffer to base64 string
    const base64File = file.toString("base64");

    const result = await imagekit.files.upload({
      file: base64File,     // base64-encoded content
      fileName: fileName,
    });

    return result;
  } catch (error) {
    console.error("ImageKit upload failed:", error);
    throw error;
  }
}

export default { uploadFile }
