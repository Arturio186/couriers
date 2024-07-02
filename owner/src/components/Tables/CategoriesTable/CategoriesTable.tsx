import { FC, useCallback, useEffect, useState } from "react";

import useFetching from "#hooks/useFetching";

import CategoryService from "#services/CategoryService";

import Loader from "#components/UI/Loader/Loader";

import IBusiness from "#interfaces/IBusiness";
import CategoriesResponse from "#interfaces/response/CategoriesResponse";

interface CategoriesTableProps {
    business: IBusiness;
}

const CategoriesTable: FC<CategoriesTableProps> = ({ business }) => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const { data, loading, error, refetch } = useFetching<CategoriesResponse>(
        useCallback(() => CategoryService.GetCategories(business, limit, page), [business, page, limit])
    );

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {data?.categories.length === 0 ? (
                <p className="message">Категории отсутствуют</p>
            ) : (       
                <div>
                    {data?.categories.map(category => <p key={category.id}>{category.name}</p>)}
                </div>       
            )}
        </>
    );
};

export default CategoriesTable;
