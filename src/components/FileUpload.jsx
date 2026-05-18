export default function FileUpload({ onUpload }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <input
        type="file"
        onChange={(e) => onUpload(e.target.files[0])}
        className="w-full"
      />
    </div>
  );
}
