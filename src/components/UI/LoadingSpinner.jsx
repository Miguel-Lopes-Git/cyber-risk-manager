export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-black text-xl font-bold animate-pulse">
                Chargement de la session...
            </p>
        </div>
    );
}
