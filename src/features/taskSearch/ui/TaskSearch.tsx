import TextInput from "../../../shared/ui/TextInput";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface TaskSearchProps {
  defaultQuery?: string;
  onSearch: (query: string) => void;
}

export const TaskSearch: React.FC<TaskSearchProps> = ({
  defaultQuery = "",
  onSearch,
}) => {
  const [query, setQuery] = useState(defaultQuery);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex flex-wrap align-items-center justify-content-center">
      <TextInput
        placeholder="Поиск заданий"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </Form>
  );
};