export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <img src="https://illustrations.popsy.co/amber/page-not-found.svg" alt="404" className="w-96 max-w-full drop-shadow-lg" />
      <h1 className="text-5xl font-bold mt-8 text-base-content">404 - Not Found</h1>
      <p className="mt-4 text-lg text-base-content/80 max-w-md">Oops! The page you are looking for doesn't exist or has been moved.</p>
      <a href="/" className="btn btn-primary mt-8 rounded-full shadow-lg hover:shadow-primary/50">Back to Home</a>
    </div>
  );
}
