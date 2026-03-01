import { API_BASE_URL } from '../api/config';

export const uploadToGCS = async (file: File): Promise<string> => {
  // Extract the exact content type, falling back to a default if unknown
  const contentType = file.type || 'image/png';

  // 1. Get a Signed URL from the backend
  const signedUrlRes = await fetch(`${API_BASE_URL}/storage/signed-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename: `${Date.now()}-${file.name}`,
      contentType,
    }),
  });

  if (!signedUrlRes.ok) {
    const errorText = await signedUrlRes.text();
    throw new Error(`Failed to get signed URL: ${signedUrlRes.status} - ${errorText}`);
  }

  const { uploadUrl, publicUrl } = await signedUrlRes.json();

  // 2. Upload directly to Google Cloud Storage using the Signed URL
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    const errorText = await uploadRes.text();
    throw new Error(`GCS upload failed: ${uploadRes.status} - ${errorText}`);
  }

  // 3. Return the public URL for saving in the database
  return publicUrl;
};
