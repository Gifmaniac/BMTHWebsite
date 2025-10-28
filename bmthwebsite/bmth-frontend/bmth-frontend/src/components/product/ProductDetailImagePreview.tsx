interface ProductImagePreviewProps {
  imageUrls: string[];
  selectedColor: string;
}

export default function roductImagePreview({
  imageUrls,
  selectedColor,
}: Readonly<ProductImagePreviewProps>) {
  if (!imageUrls || imageUrls.length === 0) {
    return <p>No image available</p>;
  }

  return (
    <div className="store-image-preview">
      {imageUrls.map((url) => (
        <img
          key={`${selectedColor}-${url}`}
          src={url}
          alt={`Ooops, something went wrong, just imagine the shirt but in the color ${selectedColor}!`}
        />
      ))}
    </div>
  );
}