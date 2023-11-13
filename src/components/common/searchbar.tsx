import React, { useCallback } from "react";
import { Icon } from "@/components/modules"

interface ISearchBarProps {
  placeholder: string;
  searchableContent?: string[];
  label: string;
  onSearch: (filteredContent?: string[]) => void;
}

export default function SearchBar({
  placeholder,
  searchableContent,
  label,
  onSearch,
}: ISearchBarProps) {
  const handleSearch = useCallback(
    (text: string) => {
      if (text.length === 0) {
        onSearch([]);
      } else {
        const filteredContent = searchableContent?.filter((x) =>
          x.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        );

        onSearch(
          filteredContent && filteredContent.length > 0
            ? filteredContent
            : ["No Results"]
        );
      }
    },
    [onSearch, searchableContent]
  );

  return (
    <div className="bg-app-light app-max-w-element relative">
      <div className="bg-app-light absolute -translate-y-1/2 w-fit text-2 z-10 px-2">
        {label}
      </div>
      <input
        className="app-input"
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Icon type="search" style="absolute right-0 top-1/2 -translate-y-1/2 mr-4" />
    </div>
  );
}
