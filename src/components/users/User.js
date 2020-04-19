import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { user, getUser, loading, getUserRepos, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // O comentário abaixo é para desabilitar o aviso de falta de segundo parâmetro na função useEffect.
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to search
      </Link>
      Hirable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt=''
            className='round-img'
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>
            <strong>Location:</strong> {location}
          </p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github profile
          </a>
          <ul>
            <li>
              <strong>Username:</strong> {login}
            </li>

            {company && (
              <li>
                <strong>Company:</strong> {company}
              </li>
            )}

            {blog && (
              <li>
                <strong>Website:</strong>
                <a href={`http://${blog}`}>{blog}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {[public_gists]}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
