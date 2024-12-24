import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pageNumber, pages, route }: PaginationProps) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="flex items-center justify-center mt-2 mb-10 text-sm">
  {/* Prev Button */}
  <Link
    href={pageNumber > 1 ? `${route}?pageNumber=${prev}` : "#"}
    className={`${
      pageNumber === 1
        ? " text-gray-300 cursor-not-allowed"
        : "bg-white text-gray-700 hover:bg-gray-300"
    } border-r-0 border border-gray-300 rounded-md px-4 py-1 transition`}
    aria-disabled={pageNumber === 1}
  >
    <span className="flex">{`<<`} <span className="hidden lg:block">Prev</span></span>
  </Link>

  {/* Page Numbers */}
  {pagesArray.map((page) => (
    <Link
      key={page}
      href={`${route}?pageNumber=${page}`}
      className={`${
        pageNumber === page ? "bg-gray-100" : "bg-white"
      } text-gray-700 border border-gray-300 rounded-md px-4 py-1 hover:bg-gray-300 transition`}
    >
      {page}
    </Link>
  ))}

  {/* Next Button */}
  <Link
    href={pageNumber < pages ? `${route}?pageNumber=${next}` : "#"}
    className={`${
      pageNumber === pages
        ? "text-gray-300 cursor-not-allowed"
        : "bg-white text-gray-700 hover:bg-gray-300"
    }  border-l-0 border border-gray-300 rounded-md px-3 py-1 transition`}
    aria-disabled={pageNumber === pages}
  >
        <span className="flex">{`>>`} <span className="hidden lg:block">Next</span></span>

  </Link>
</div>

  )
}

export default Pagination;