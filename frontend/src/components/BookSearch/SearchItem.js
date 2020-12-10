import React from "react";
import { Link } from "react-router-dom";

function SearchItem(props) {
  return (
    <>
      <div className="search_card">
        <div className="search_card_thumbnail">
          <img src={props.thumbnail} alt={props.title} />
        </div>

        <div className="search_card_content">
          <li className="book_title">{props.title}</li>
          <li className="book_author">{props.author}(저자)</li>
        </div>

        {/* 고유값: 해당책의 isbn 번호로 이동   */}
        <Link to={`/search/${props.isbn}`} className="search_footer">
          <button className="detail_btn">더보기 / 리뷰작성</button>
        </Link>
      </div>
    </>
  );
}

export default SearchItem;
