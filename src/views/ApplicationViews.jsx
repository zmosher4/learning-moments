import { Outlet, Route, Routes } from 'react-router-dom';
import { AllPosts } from '../components/AllPosts';
import { MyNav } from '../components/MyNav';
import { useEffect, useState } from 'react';
import { PostDetails } from '../components/PostDetails';
import { Login } from '../components/auth/Login';
import { NewPost } from '../components/NewPost';
import { MyPosts } from '../components/MyPosts';
import { PostForm } from '../components/PostForm';
import { Favorites } from '../components/Favorites';
import { UserProfile } from '../components/UserProfile';
import { EditProfile } from '../components/EditProfile';

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem('learning_user');
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <MyNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<h1>welcome</h1>} />
        <Route path="posts">
          <Route index element={<AllPosts />} />
          <Route
            path=":postId"
            element={<PostDetails currentUser={currentUser} />}
          />
        </Route>
        <Route path="newPost" element={<NewPost />} />
        <Route path="myPosts" element={<MyPosts />} />
        <Route path="edit-post/:postId" element={<PostForm />} />
        <Route
          path="favorites"
          element={<Favorites currentUser={currentUser} />}
        />

        <Route
          path="profile"
          element={<UserProfile currentUser={currentUser} />}
        />
        <Route
          path="edit-profile"
          element={<EditProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
