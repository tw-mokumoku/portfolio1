import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { ReactTags } from 'react-tag-autocomplete'
import { useCallback, useState } from 'react';
import { getTagSuggests } from '../../Function/APIController';
import './searchBar.css';
import { useDebounce } from 'react-use';
export function SearchBar() {
    const [selectedTags, setSelectedTags] = useState([]);

    const onAdd = useCallback((newTag) => {
        setSelectedTags([...selectedTags, newTag])
    }, [selectedTags]);

    const onDelete = useCallback((tagIndex) => {
        setSelectedTags(selectedTags.filter((_, i) => i !== tagIndex))
    }, [selectedTags]);

    const [suggestions, setSuggestions] = useState([]);
    const [inputValues, setInputValues] = useState('');


    const [, cancel] = useDebounce(
        () => {
            if (inputValues == null || inputValues === "") {
                setSuggestions([]);
                return;
            }
            getTagSuggests("JP", inputValues).then((response) => {
                setSuggestions(response.data.map(({ id, name, country_id }) => ({ value: name, label: name })));
            });            
        },
        1000,
        [inputValues],
    );

    return (
        <Stack className="justify-content-center align-items-center">
            <InputGroup className="my-3" style={{ width: "70%" }}>
                <div className="w-100">
                <ReactTags
                    placeholderText="タグを入力してください"
                    selected={selectedTags}
                    suggestions={suggestions}
                    onAdd={onAdd}
                    onDelete={onDelete}
                    allowNew={true}
                    noOptionsText="No matching countries"
                    onInput={(value)=>setInputValues(value)}
                    allowResize={true}
                />
                </div>
            </InputGroup>
            {/*
                <Form.Control
                    placeholder={"タグを入力"}
                    aria-label=""
                    aria-describedby=""
                />
            <div className="my-7" style={{ width: "70%" }}>
            </div>
            */}
        </Stack>
    );
}