import React from 'react'

import './profile.css'

export default function Profile() {
  return (
    <div>
        <div className ="wrapper">
  <div className ="profile-card js-profile-card">
    <div className ="profile-card__img">
      <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg" alt="profile card"/>
    </div>

    <div className ="profile-card__cnt js-profile-cnt">
      <div className ="profile-card__name">Sandeep Reddy</div>
      <div className ="profile-card__txt">Mern stack developer <strong>India</strong></div>

      <div className ="profile-card-ctr">
        <button className ="profile-card__button button--blue js-message-btn">Message</button>
        <button className ="profile-card__button button--orange">Follow</button>
      </div>
    </div>


  </div>

</div>
    </div>
  )
}
