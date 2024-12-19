export const handleImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (updates: Partial<{ image: string }>) => void
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ image: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
};