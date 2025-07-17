// components/ui/LoadingStates.tsx
import { LoaderCircle, AlertTriangle } from "lucide-react";

interface LoadingSpinnerProps {
    message?: string;
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    message = "Chargement...", 
    className = "" 
}) => {
    return (
        <div className={`flex items-center justify-center py-8 ${className}`}>
            <div className="flex items-center space-x-2">
                <LoaderCircle className="h-6 w-6 animate-spin text-blue-500" />
                <span className="text-gray-600">{message}</span>
            </div>
        </div>
    );
};

interface ErrorStateProps {
    message?: string;
    className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
    message = "Une erreur est survenue", 
    className = "" 
}) => {
    return (
        <div className={`flex items-center justify-center py-8 ${className}`}>
            <div className="flex items-center space-x-2 text-red-500">
                <AlertTriangle className="h-6 w-6" />
                <span>{message}</span>
            </div>
        </div>
    );
};

interface EmptyStateProps {
    title?: string;
    description?: string;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
    title = "Aucun élément trouvé", 
    description,
    className = "" 
}) => {
    return (
        <div className={`flex items-center justify-center py-8 ${className}`}>
            <div className="text-center">
                <p className="text-gray-500 text-lg">{title}</p>
                {description && (
                    <p className="text-gray-400 text-sm mt-2">{description}</p>
                )}
            </div>
        </div>
    );
};

// Generic Data State Handler Component
interface DataStateHandlerProps<T> {
    data: T[] | undefined;
    isPending: boolean;
    loadingMessage?: string;
    errorMessage?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    children: (data: T[]) => React.ReactNode;
}

export const DataStateHandler = <T,>({
    data,
    isPending,
    loadingMessage,
    errorMessage,
    emptyTitle,
    emptyDescription,
    children
}: DataStateHandlerProps<T>) => {
    if (isPending) {
        return <LoadingSpinner message={loadingMessage} />;
    }

    if (!data) {
        return <ErrorState message={errorMessage} />;
    }

    if (data.length === 0) {
        return <EmptyState title={emptyTitle} description={emptyDescription} />;
    }

    return <>{children(data)}</>;
};