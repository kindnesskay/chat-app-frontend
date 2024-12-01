export async function generatePlaceholder(imageUrl) {
  return new Promise((resolve, reject) => {
    // create image object and assign image
    const image = new Image();
    image.src = imageUrl;
    // create canvas and resize it
    const canvas = document.createElement("canvas");
    canvas.height = 10;
    canvas.width = 10;
    const ctx = canvas.getContext("2d");
    // load image to canvas
    image.onload = () => {
      try {
        // draw image and try to create a blob
        ctx.drawImage(image, 0, 0, canvas.height, canvas.width);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob"));
            }
          },
          "image/png",
          0.5
        );
      } catch (error) {
        reject(error);
      }
      image.onerror = (error) => {
        reject(error);
      };
    };
  });
}
