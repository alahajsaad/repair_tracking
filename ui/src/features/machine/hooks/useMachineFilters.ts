import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useMachineFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Extract and convert parameters
    const partnerId = searchParams.get('partnerId') ? parseInt(searchParams.get('partnerId') as string) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
    const size = searchParams.get('size') ? parseInt(searchParams.get('size') as string) : 8;

    // Individual setter functions
    const setPartnerId = useCallback((id: number | undefined) => {
        setSearchParams((params) => {
            if (id !== undefined) {
                params.set('partnerId', id.toString());
            } else {
                params.delete('partnerId');
            }
            return params;
        });
    }, [setSearchParams]);

    const setPage = useCallback((pageNum: number | undefined) => {
        setSearchParams((params) => {
            if (pageNum !== undefined) {
                params.set('page', pageNum.toString());
            } else {
                params.delete('page');
            }
            return params;
        });
    }, [setSearchParams]);

    const setSize = useCallback((sizeNum: number | undefined) => {
        setSearchParams((params) => {
            if (sizeNum !== undefined) {
                params.set('size', sizeNum.toString());
            } else {
                params.delete('size');
            }
            return params;
        });
    }, [setSearchParams]);

    const reset = useCallback(() => {
        setSearchParams((params) => {
            params.delete('partnerId');
            params.set('page', '0');
            params.set('size', '8');
            return params;
        });
    }, [setSearchParams]);

    return {
        partnerId,
        page,
        size,
        setPartnerId,
        setPage,
        setSize,
        reset
    };
}