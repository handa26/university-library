import Form from "next/form";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/search" className="search">
      <div className="flex gap-2">
        <button className="search-btn text-[#FFE1BD]">
          <Search className="size-6" />
        </button>
      </div>

      <input
        type="text"
        name="query"
        defaultValue={query}
        className="search-input"
      />
    </Form>
  );
};

export default SearchForm;
