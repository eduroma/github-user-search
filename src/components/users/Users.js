import React from 'react';
import PropTypes from 'prop-types';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = ({ loading, users }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

Users.propyTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
};

export default Users;
