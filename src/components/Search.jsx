import React, { useState } from 'react';
import { Button, InputGroup,Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { filterSearchThunk } from '../store/slice/data.slice';

const Search = () => {

    const dispatch = useDispatch();

    const [inputSearch, setInputSearch] = useState("");
    return (
        <div>
            <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(filterSearchThunk(inputSearch))}
            >
              Search
            </Button>
          </InputGroup>
        </div>
    );
};

export default Search;