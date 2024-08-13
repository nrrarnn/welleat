import { Button, Input } from "@nextui-org/react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <>
      <div className="py-4 px-44">
        <form onSubmit={handleSubmit}>
          <Input
            type="search"
            value={query}
            color="primary"
            radius="full"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari Bahan-Bahan.."
            size="lg"
            startContent={<MdSearch />}
            endContent={
              <Button type="submit" color="primary" radius="full" size="md">
                Cari
              </Button>
            }
          />
        </form>
      </div>
    </>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
