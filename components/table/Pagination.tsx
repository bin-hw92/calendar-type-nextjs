import styled from "styled-components";
import { useRouter } from 'next/router'
import { Button } from "react-bootstrap";
import Link from "next/link";

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

type BuildLinkProps = {
    username: string;
    page: number;
}

const BuildLink = ({ username, page }:BuildLinkProps) => {
    const router = useRouter();
    //const query = router.query.page;
    return username = `/?${page}`;
};

type PaginationProps = {
    page: number;
    lastPage: number;
}
const Pagination = ({ page, lastPage }:PaginationProps) => {
    const prevFlag:boolean = page === 1? true : false;
    const nextFlag:boolean = page === lastPage? true : false;
    return (
        <PaginationBlock>
            {page === 1 ? (
                <Button disabled={page === 1}>이전</Button>
            ):(
                <Link  href={BuildLink({ username: 'table', page: page-1 })} className="btn btn-primary">이전</Link>
            )}
            <PageNumber>{page}</PageNumber>
            {page === lastPage ? (
                <Button disabled={page === lastPage}>다음</Button>
            ):(
                <Link  href={BuildLink({ username: 'table', page: page+1 })} className="btn btn-primary">다음</Link>
            )}
            
        </PaginationBlock>
    );
};

export default Pagination;