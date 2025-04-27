
type props = {
    label?: string
}

export const LoadingPage = ({ label = "Loading" }: props) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100/20 dark:bg-dark">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full border-8 border-t-8 border-gray-300 border-t-blue-600 h-20 w-20 mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-700">{label}</h2>
            </div>
        </div>
    );
};

