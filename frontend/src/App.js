import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import ReviewDetail from "./components/Home/ReviewDetail";
// import PostDetail from "./components/Home/PostDetail";
import BookSearch from "./pages/BookSearch";
import SearchDetail from "./components/BookSearch/SearchDetail";
import Mypage from "./pages/Mypage";
import Login from "./pages/accounts/Login";
import Signup from "./pages/accounts/Signup";

//로그인필수
import LoginRequiredRoute from "./utils/LoginRequiredRoute";

//최상위 컴포넌트 App
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <LoginRequiredRoute exact path="/detail/:id" component={ReviewDetail} />
        {/* <Route exact path="/detail/:id" component={PostDetail} /> */}
        <LoginRequiredRoute exact path="/search" component={BookSearch} />
        <LoginRequiredRoute
          exact
          path="/search/:isbn"
          component={SearchDetail}
        />
        <LoginRequiredRoute exact path="/mypage" component={Mypage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      <Footer />
    </>
  );
}
export default App;
