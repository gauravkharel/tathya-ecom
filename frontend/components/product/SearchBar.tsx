import React from "react";
import { SearchIcon } from "lucide-react";

const SearchBar: React.FC = () => {

    return (
        <button>
            <label
                className="[&:has(:focus-visible)]:ring-ring flex items-center p-0 [&:has(:focus-visible)]:ring-2"
            >
                <span className="sr-only">Search</span>

                <SearchIcon className="size-4" />
                <input
                    type="search"
                    placeholder="Search"
                    className="size-full ml-2 border-none bg-transparent focus:outline-none"
                />
            </label>
        </button>
    );
};

export default SearchBar