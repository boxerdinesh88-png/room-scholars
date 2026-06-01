"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-red-400">!</span>
        </div>
        <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-4">
          Something went wrong
        </h1>
        <p className="text-[#081F4D]/60 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#D4A24C] text-[#081F4D] font-bold text-sm hover:bg-[#c08e38] transition-all shadow-lg shadow-[#D4A24C]/25"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
