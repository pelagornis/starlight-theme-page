import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@pelagornis/page/components";

const pages = [1, 2, 3];

export default function PaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage((current) => Math.max(1, current - 1))} />
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              href="#"
              isActive={page === item}
              onClick={(event) => {
                event.preventDefault();
                setPage(item);
              }}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => setPage((current) => Math.min(3, current + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
