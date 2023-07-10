import React from 'react'

export const MovieList = (props) => {
  return (
    <>
        {props.movies.map((movie) => (
            <img src={movie.Poster}></img>
        ))}
    </>
  )
}

export default MovieList;
