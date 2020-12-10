import React from "react";
import "./UserInfo.css";
import { Tabs } from "antd";
import UserLike from "./UserLike";
import UserReview from "./UserReview";
import Profile from "./Profile";

function UserInfo() {
  const { TabPane } = Tabs;

  return (
    <div className="mypage">
      <Profile />

      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="추천목록" key="1">
            <UserLike />
          </TabPane>
          <TabPane tab="작성리뷰목록" key="2">
            <UserReview />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default UserInfo;
