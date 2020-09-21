import React, { useEffect, useState } from "react";
import GenreList from "./components/genreList";
import MovieList from "./components/movieList";
import Test from "./components/TestFile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Pagination from "react-js-pagination";
import Filtered from "./components/filterArea";

import Navigation from "./components/nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
let apiKey = process.env.REACT_APP_APIKEY;
function App() {
  let [oriMovieList, setoriMovieList] = useState([]); // original list
  let [movieList, setMovieList] = useState([]); // for rendering
  let [page, setPage] = useState(1);
  let [totalResult, settotalResult] = useState(0);
  let [genreList, setGenreList] = useState([]);
  let [pageNum, setPageNum] = useState(2);
  let [inputRange, setInputRange] = useState({ min: 0, max: 10 });

  //haha
  const getGenre = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US
    `;
    let response = await fetch(url);
    let data = await response.json();
    console.log("genre", data.genres);
    setGenreList(data.genres);
  };
  // https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
  const searchByGenre = async (id) => {
    console.log(id, "id");
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}
    `;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data results", "SearchByGenre", data.results);
    setMovieList(data.results);
  };
  const filterByRate = (range) => {
    let temp = oriMovieList.filter(
      (item) => item.vote_average >= range.min && item.vote_average <= range.max
    );
    setMovieList(temp);
  };

  const SearchByKeyWord = async (keyword) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}
    `;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", "SearchByKey", data);
    setoriMovieList(data.results);

    settotalResult(data.total_results);
    setMovieList(data.results);
  };
  const LoadMore = async () => {
    let nextPage = pageNum;
    nextPage++;
    console.log(" nextPage", nextPage);
    setPageNum(nextPage);
    console.log("Page Num", pageNum);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNum}`;
    let response = await fetch(url);
    let data = await response.json();
    setMovieList([...movieList, ...data.results]);
    // settotalResult(data.total_results);

    console.log("LoadMore", movieList);
  };

  const getLastest = async (apage) => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${apage}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    settotalResult(data.total_results);
    setoriMovieList(data.results);
    setMovieList(data.results);
  };
  const test = (id) => {
    console.log("test", id);
  };
  useEffect(() => {
    getLastest();
    getGenre();
  }, []);

  return (
    <Router>
      <div className="body">
        <Navigation SearchByKeyWord={SearchByKeyWord} />
        <Filtered
          inputRange={inputRange}
          setInputRange={setInputRange}
          filterByRate={filterByRate}
        />
        {/* <GenreList searchByGenre={searchByGenre} list={genreList} /> */}
        <Switch>
          <Route path="/i" component={Test} />
        </Switch>
        <MovieList list={movieList} genreList={genreList} />
        <Pagination
          className="navvv"
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={totalResult}
          pageRangeDisplayed={5}
          onChange={(pageClicked) => {
            setPage(pageClicked);
            getLastest(pageClicked);
          }}
          itemClass="page-item"
          linkClass="page-link"
        />
        {/* <div className="container-fluid load-bar ">
          <Button
            className="load-button"
            onClick={(event) => {
              event.preventDefault();
              LoadMore();
            }}
            type="button"
          >
            {" "}
            Load more
          </Button>
        </div> */}
      </div>
    </Router>
  );
}

export default App;
