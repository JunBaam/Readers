import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchDetailItem from "./SearchDetailItem";
import "./SearchDetail.css";

function SearchDetail({ match }) {
  //match : 객체에 어떤 라우트에 매칭이 되었는지에 대한 정보가 들어있다.(url 파라미터값을가져옴)
  useEffect(() => {
    bookSearchHandler();
    // console.log("Match!", match.params.title);
  }, []);

  const [book, setBooks] = useState([]);

  // const isbn = value.substring(10);
  // console.log("isbn", isbn);

  const Kakao = axios.create({
    baseURL: "https://dapi.kakao.com",
    headers: {
      Authorization: "KakaoAK",
    },
  });

  const bookSearch = params => {
    return Kakao.get("/v3/search/book?target=isbn", { params });
  };

  const bookSearchHandler = async (query, reset) => {
    const params = {
      query: match.params.isbn.substring(10), //선택한 제목을 기준으로 값을 가져옴
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호 디폴트 1
      size: 16, // 한 페이지에 보여질 오브젝트 갯수 디폴트 10 (1~50)
    };

    const { data } = await bookSearch(params);
    setBooks(data.documents);
    // console.log("책상세히보기", data.documents);

    if (reset) {
      setBooks(data.documents);
      console.log(data.documents);
    } else {
      //concat : 기존배열에 원소 또는 배열을 추가함
      setBooks(book.concat(data.documents));
    }
  };

  return (
    <>
      {book.map((book, index) => (
        <SearchDetailItem
          key={index}
          thumbnail={book.thumbnail}
          title={book.title}
          contents={book.contents}
          author={book.authors}
          price={book.price}
          publisher={book.publisher}
          // 0~10만 남김
          date={book.datetime.slice(0, 10)}
        />
      ))}
    </>
  );
}

export default SearchDetail;
