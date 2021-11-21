import React from "react";
import { Route , Switch} from 'react-router-dom';

import Layout from "./components/UI/Layout";
import MainContainer from "./components/mainContent/MainContainer";
import LeftBar from "./components/leftBar/LeftBar";
import Wrapper from "./components/UI/Wrapper";
import Profile from "./components/profile/Profile";
import Cart from "./components/cart/Cart";
import Favourite from "./components/favourite/Favourite";
import Settings from "./components/settings/Settings";
import SignIn from './Register/SignIn';
import SignUp from "./Register/Signup";
import ForgotPassword from "./Register/ForgotPassword";
import ResetPassword from "./Register/ResetPassword";
import UpdateUserInfo from "./Register/UpateUserInfo";
import UpdatePassword from "./Register/UpdatePassword";
import Product from "./components/Products/Product";
import SearchScreen from "./components/search/SearchScreen";

import AdminNav from "./Admin/AdminNav";
import AllRecipes from "./Admin/recipes/AllRecipes";
import AllUsers from './Admin/users/AllUsers';
import AllCategories from './Admin/categories/AllCategories';
import AllOrders from './Admin/orders/AllOrders';
import Welcome from "./Admin/Welcome";



function App() {
  // const isLogged = localStorage.getItem('isLoggedIn');
  
  return (
      <Switch>
        {/* <Route path='/signin' exact>
          {!isLogged && <SignIn />}
          {isLogged && <Redirect to='/' />}
        </Route> */}
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />

        <Route path='/update-me' component={UpdateUserInfo} />
        <Route path='/update-password' component={UpdatePassword} />
        
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ResetPassword} />

        <Route path='/admin/dashboard' render={()=> (
          <AdminNav>
            <Route path='/admin/dashboard/' exact component={Welcome} />
            <Route path='/admin/dashboard/users' component={AllUsers} />
            <Route path='/admin/dashboard/recipes' component={AllRecipes} />
            <Route path='/admin/dashboard/categories' component={AllCategories} />
            <Route path='/admin/dashboard/orders' component={AllOrders} />
          </AdminNav>
        )} />

        <Route path="/" render={() => (
          <Layout>
            <LeftBar />
            <Wrapper>
              <Route path="/" exact component={MainContainer} />
              <Route path="/search" component={SearchScreen} />
              <Route path="/product/:id" exact component={Product} />
              <Route path='/profile' component={Profile} />
              <Route path='/setting' component={Settings} />
              <Route path='/cart' component={Cart} />
              <Route path='/favourite' component={Favourite} />
            </Wrapper>
        </Layout>
        )} />


      </Switch>
  );
}

export default App;
