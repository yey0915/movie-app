import React from 'react'

const SearchBox = (props) => {
    const handleChange = (e) => {
        //alert("일단 검색");
        //console.log(e.target.value);

        props.setSearchValue(e.target.value);
        console.log(props.searchValue);
    };

  return (
    <div className='col col-sm-4 me-5'>
        <input type="text" className='form-control' value={props.searchValue} 
                placeholder='영화 검색.....' onChange={handleChange} />
    </div>
  )
}

export default SearchBox