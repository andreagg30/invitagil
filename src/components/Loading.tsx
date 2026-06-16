import '../index.css'

export default function Loading() {
  return (
    <div className="flex w-full justify-center items-center h-screen ">
      <div
        className="flex h-10 rounded-full pt-1 bg-white w-30 items-center justify-center gap-2"
        role="status"
        aria-label="Cargando"
      >
        <span className="loading-dot inline-block h-3 w-3 rounded-full bg-plum" />
        <span className="loading-dot inline-block h-3 w-3 rounded-full bg-plum" />
        <span className="loading-dot inline-block h-3 w-3 rounded-full bg-plum" />
      </div>
    </div>
  );
}
