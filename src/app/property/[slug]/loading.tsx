export default function PropertyLoading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#D4A24C] border-t-transparent animate-spin" />
        <p className="text-sm text-[#081F4D]/50 font-medium">Loading property...</p>
      </div>
    </div>
  );
}
