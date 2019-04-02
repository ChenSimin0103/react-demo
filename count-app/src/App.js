import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
// 第三方库
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 组件
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import ProtectRoute from './components/common/protectRoute';

// 服务
import auth from './services/authService';

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            {/* 此页面需要有路由守卫，防止无权用户进入 */}
            <ProtectRoute path="/movies/:id" component={MovieForm} />
            {/* 为了在电影列表里根据权限隐藏部分内容，需要传入user 信息 */}
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

try {
  // 发请求
} catch (e) {
  if (e.response && e.response.status === 404) alert('404 not found');
}

export default App;
