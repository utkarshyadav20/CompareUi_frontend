export const uploadToCloudinary = async (file: File): Promise<string> => {
  const CLOUD_NAME = 'compareui';
  const UPLOAD_PRESET = 'Compare_ui';
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data.secure_url;
};
