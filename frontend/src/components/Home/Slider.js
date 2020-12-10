import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "./Slider.css";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import Axios from "axios";
import { useAppContext } from "../../store";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [reviewList, setReviewList] = useState([]);

  const apiUrl = "http://15.165.223.171:8080/api/bookmark/";

  useEffect(() => {
    Axios.get(apiUrl, headers)
      .then(response => {
        const data = response.data;
        function CountSort(a, b) {
          //is_like_count 에 접근
          if (a.is_like_count === b.is_like_count) {
            return 0;
          }
          return a.is_like_count < b.is_like_count ? 1 : -1;
        }
        const sort = data.sort(CountSort).slice(0, 10);
        console.log("슬라이드응답", sort);
        setReviewList(sort);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);

  return (
    <div id="slide">
      <div className="slide_name">
        <h2>추천 베스트</h2>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {reviewList &&
          reviewList.map((review, index) => (
            <SwiperSlide key={index}>
              <Link to={`/detail/${review.id}`} className="post_detail_link">
                <div className="slide_box">
                  <div className="slide_image">
                    <img src={review.image_url} alt={review.title} />
                    <div className="slide_rank_border">
                      <div className="slide_rank">{index + 1}</div>
                    </div>
                  </div>

                  <div className="slide_content">
                    <div className="slide_title">{review.title}</div>
                    <div className="slide_author">{review.author}</div>
                    <div className="slide_category">#{review.category}</div>
                    <div className="slide_like">
                      추천: {review.is_like_count}개
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Slider;
