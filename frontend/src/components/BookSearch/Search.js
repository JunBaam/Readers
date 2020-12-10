import React, { useEffect, useState } from "react";
import { bookSearch } from "../../utils/KaKaoSearch";
import SearchItem from "./SearchItem";
import "./Search.css";

function Search() {
  const [books, setBooks] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      bookSearchHandler(query, true);
    }
  }, [query]);

  // 엔터를 눌렀을 때 호출 되는 함수
  const onEnter = e => {
    if (e.keyCode === 13) {
      setQuery(text);
    }
  };

  // text 검색어가 바뀔 때 호출되는 함수
  const onTextUpdate = e => {
    setText(e.target.value);
  };

  const bookSearchHandler = async (query, reset) => {
    const params = {
      query: query,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 16, // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await bookSearch(params);

    if (reset) {
      setBooks(data.documents);
      console.log(data.documents);
    } else {
      //concat : 기존배열에 원소 또는 배열을 추가함
      setBooks(books.concat(data.documents));
    }
  };

  return (
    <div className="container">
      <div className="container_title">도서검색</div>

      {/* 검색창 */}
      <input
        type="search"
        placeholder="찾고자하는 도서를 작성후 엔터를 입력해주세요!"
        name="query"
        className="input_search"
        onKeyDown={onEnter} // enter
        onChange={onTextUpdate} // change
        value={text} // view
      />

      {/* 검색결과 */}
      <div className="search_result">
        {books.map((book, index) => (
          <SearchItem
            key={index}
            thumbnail={book.thumbnail}
            title={book.title}
            author={book.authors}
            isbn={book.isbn}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
