import React, { useCallback } from "react";
import { Icon } from "../modules";

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
      const filteredContent = searchableContent?.filter((x) =>
        x.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      );

      onSearch(filteredContent);
    },
    [onSearch, searchableContent]
  );

  return (
    <div className="w-full relative center">
      <div className="bg-app-light absolute left-0 top-0 -translate-y-1/2 w-fit text-3 z-50 px-2">
        {label}
      </div>
      <input
        className="app-input"
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Icon type="search" style="absolute right-0 mr-2" />
    </div>
  );
}
