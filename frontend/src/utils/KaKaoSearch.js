import axios from "axios";

const Kakao = axios.create({
  // 공통 요청 경로 지정
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: "KakaoAK 68847a905995af090de7c5f2634912d4",
  },
});

export const bookSearch = params => {
  return Kakao.get("/v3/search/book", { params });
};
