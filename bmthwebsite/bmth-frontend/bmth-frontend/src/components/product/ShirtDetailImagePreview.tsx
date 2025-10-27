interface ShirtImagePreviewProps {
  imageUrls: string[];
  selectedColor: string;
}

export default function ShirtImagePreview({
  imageUrls, selectedColor,
}: Readonly<ShirtImagePreviewProps>) {
  if (!imageUrls || imageUrls.length === 0) {
    return <p>No image available</p>;
  }

  return (
    <div className="store-image-preview">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
        />
      ))}
    </div>
  );
}