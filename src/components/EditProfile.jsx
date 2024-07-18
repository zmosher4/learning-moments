import { useEffect, useState } from 'react';
import { editUser, getUserByID } from '../services/userService';
import { useNavigate } from 'react-router-dom';

export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUserInfo = async () => {
    if (currentUser.id) {
      const userInfo = await getUserByID(currentUser?.id);
      setUser(userInfo);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [currentUser]);

  const handleName = (event) => {
    const userCopy = { ...user };
    userCopy.name = event.target.value;
    setUser(userCopy);
  };

  const handleCohort = (event) => {
    const userCopy = { ...user };
    userCopy.cohort = parseInt(event.target.value);
    setUser(userCopy);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    await editUser(user);
    navigate('/profile');
  };

  return (
    <form>
      <h2>Edit Profile</h2>
      <fieldset>
        <label>Name: </label>
        <input
          type="text"
          value={user.name ? user.name : ''}
          required
          onChange={handleName}
        />
      </fieldset>
      <fieldset>
        <label>Cohort: </label>
        <input
          type="text"
          value={user.cohort ? user.cohort : ''}
          required
          onChange={handleCohort}
        />
      </fieldset>
      <button onClick={handleSave}>Save Changes</button>
    </form>
  );
};
