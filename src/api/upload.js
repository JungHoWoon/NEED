export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_FIREBASE_CLOUDINARY_PRESET
  );
  return fetch(process.env.REACT_APP_FIREBASE_CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
