// components/Loader.tsx
export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  )
}
