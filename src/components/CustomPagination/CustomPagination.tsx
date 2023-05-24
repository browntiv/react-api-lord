import Pagination from "react-bootstrap/Pagination";
import { QUOTES_LIMIT } from "../../services/app.service";
import "./CustomPagination.scss";


type CustomPaginationProps = {
    totalData: number,
    currentPage: number,
    onPaginate: (page: number) => void,
}

const CustomPagination = ({ totalData, currentPage, onPaginate }: CustomPaginationProps) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalData / QUOTES_LIMIT); i++) {
        pageNumbers.push(i);
    }

    let start = 1,
        end = pageNumbers.length;
    if (currentPage - 2 > 1) {
        start = currentPage - 2;
    }
    if (currentPage + 2 < pageNumbers.length) {
        end = currentPage + 2;
    }

    return (
        <div className="pagination-container">
            <Pagination>
                <Pagination.First
                    onClick={() => onPaginate(1)}
                    disabled={currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => onPaginate(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {start !== 1 && <Pagination.Ellipsis />}
                {pageNumbers.slice(start - 1, end).map((number) => (
                    <Pagination.Item
                        key={number}
                        onClick={() => onPaginate(number)}
                        active={currentPage === number}
                    >
                        {number}
                    </Pagination.Item>
                ))}
                {end !== pageNumbers.length && <Pagination.Ellipsis />}
                <Pagination.Next
                    onClick={() => onPaginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                />
                <Pagination.Last
                    onClick={() => onPaginate(pageNumbers.length)}
                    disabled={currentPage === pageNumbers.length}
                />
            </Pagination>
        </div>
    );
};

export default CustomPagination;