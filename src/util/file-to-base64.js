export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const base64File = fileReader.result;
      resolve(base64File);
    }

    fileReader.onerror = reject;
  })
}
