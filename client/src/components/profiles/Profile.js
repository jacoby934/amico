import React, { useEffect, Fragment } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { getUserPosts } from '../../actions/post';
import Moment from 'react-moment';

import avi from '../assets/default-avatar.png';

// Components
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import { ArrowLeft } from 'react-feather';

const Profile = ({
  getProfileById,
  getUserPosts,
  profile: { profile, loading },
  post: { posts },
  match,
  history
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getUserPosts(match.params.id);
  }, [getProfileById, getUserPosts, match.params.id]);

  if (profile === null) {
    return <Redirect to='/settings' />;
  }

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <div className='main-container mt-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 mb-3 text-white'>
            <button
              className='btn btn-logo-color'
              onClick={() => history.goBack()}
            >
              <ArrowLeft />
            </button>
            <div className='card profile-card bg-logo-color mt-1'>
              <div className='card-body'>
                <img src={avi} alt='avatar' className='profile-avatar' />
                <h2 className='card-title display-4 text-white mb-2 profile-name'>
                  {profile.user.firstname} {profile.user.lastname}
                </h2>
                <div className='profile-headings'>
                  <h3 className='mb-3'>
                    <i data-feather='map-pin'></i>
                    {profile.city} {profile.state}
                  </h3>
                  <h4>
                    <Moment fromNow ago>
                      {profile.birthday}
                    </Moment>{' '}
                    old
                  </h4>
                </div>
                <p className='profile-bio'>{profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* User Posts go here */}
      <div className='mt-5 container'>
        {posts !== null &&
          posts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getProfileById, getUserPosts })(
  Profile
);
