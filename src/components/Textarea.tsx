export default function Textarea({ secondaryText, setSecondaryText }) {
  return (
    <textarea
      className="text-area"
      value={secondaryText}
      onChange={(e) => setSecondaryText(e.target.value)}
    ></textarea>
  );
}
