import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import ScrollContainer from "react-indiana-drag-scroll";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  //검색어로 영화데이터 요청 async/await는 쌍으로 사용
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6bfc4a64`;
    //자바스크립트는 비동기므로 await를 붙여서 영화데이터를 다받고 다음코드 실행
    const response = await fetch(url);
    const responseJson = await response.json();
    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  //검색어가 바뀔시 한번 함수 실행
  useEffect(() => {
    if(searchValue.length > 3){
      getMovieRequest(searchValue);
    }
  }, [searchValue]);

  //브라우저 저장소에서 선호작 영화들을 가져옴 앱 시작시 1번 실행
  useEffect(()=>{
    const movieFavourites = JSON.parse(localStorage.getItem('favourites'));
    if(movieFavourites){
      setFavourites(movieFavourites);
    }
  }, []);

  //브라우저에 저장하기
  const saveToLocalStorage = (items) => {
    localStorage.setItem("favourites", JSON.stringify(items));
  }

  //선호작에 영화 추가하기
  const addFavourites = (movie) => {
    //배열 favourites를 추가하고, 새로운 movie를 추가한다.
    //...favourites의 의미
    const newList = [...favourites, movie];   // 선호작 리스트에 + 영화하나 추가
    setFavourites(newList);                   // 새 선호작으로 업데이트
    saveToLocalStorage(newList);              // 저장하기
  }

  //선호작 제거하는 함수
  const removeMovie = (movie) => {
    //filter :참이면 남겨놓고 거짓이면 빼버린다.
    const newList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newList);
    saveToLocalStorage(newList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row align-items-center my-4">
        <MovieListHeading heading="영화 검색과 선호작 등록" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}  />
      </div>
      <ScrollContainer className="row scroll-container">
        <MovieList movies={movies} handleClick={addFavourites} addMovie={true}/>
      </ScrollContainer>
      <div className="row align-items-center my-4">
        <MovieListHeading heading="내 선호작" />
      </div>
      <ScrollContainer className="row scroll-container">
        <MovieList movies={favourites} handleClick={removeMovie} addMovie={false} />
      </ScrollContainer>
    </div>
  );
}

export default App;



