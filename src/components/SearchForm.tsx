import React from 'react'
import Form from "next/form"
import SearchFormResetBtn from './SearchFormResetBtn';
import { Search } from 'lucide-react';


const SearchForm = ({query}: {query?: string}) => {

    return (
        <Form
            className='search-form'
            action="/"
            scroll={false}
        >
            <input
                name="query"
                defaultValue={query}
                type="text"
                className='search-input'
                placeholder='Search Startups'
            />
            <div className='flex gap-2'>
                {query && <SearchFormResetBtn />}
                <button type='submit' className='search-btn text-white cursor-pointer'>
                    <Search className='size-5' />
                </button>
            </div>
        </Form>
    )
}

export default SearchForm