const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      
      {/* Loading Text */}
      <div className="text-2xl font-light text-gray-700 tracking-wide animate-pulse">
        Chargement en cours
        <span className="inline-block animate-bounce">...</span>
      </div>
    </div>
  );
};

export default LoadingPage;