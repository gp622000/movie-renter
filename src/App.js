import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movieContainer";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";
import axios from "axios";

function App() {
  const [posts, updatePosts] = useState([]);
  useEffect(() => {
    async function gettingPosts() {
      const { data: posts } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(posts);
      updatePosts(posts);
      console.log(posts);
    }
    gettingPosts();
  }, []);
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" to="/movies" exact></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
