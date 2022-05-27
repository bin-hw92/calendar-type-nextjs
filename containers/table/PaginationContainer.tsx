import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Pagination from "../../components/table/Pagination"
import { RootState } from "../../store/modules";



const PaginationContainer = () => {
    const router = useRouter();

    const page = typeof router.query.page === 'string' ? parseInt(router.query.page, 10) || 1 : 1;

    const { lastPage, tableList, loading } = useSelector(({ tables, loading}:RootState) => 
        ({
            lastPage: tables.lastPage,
            tableList: tables.tableList,
            loading: loading['table/LIST_TABLE'],
        }));

        if(!tableList || loading) return <></>;
    return (
        <Pagination page={parseInt(page+'', 10)} lastPage={lastPage}/>
    )
}

export default PaginationContainer;