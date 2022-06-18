import { useState } from 'react';
import {
  SearchbarHeader,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit, errorMessage }) {
  const [searchQuery, setSearchQuery] = useState('');

  const formSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      errorMessage();
      return;
    }
    onSubmit(searchQuery);

    resetInput();
  };

  const resetInput = () => {
    setSearchQuery('');
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={formSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Неймовірний світ зображень"
          value={searchQuery}
          onChange={e =>
            setSearchQuery(e.currentTarget.value.toLowerCase().trim())
          }
        />
      </Form>
    </SearchbarHeader>
  );
}
