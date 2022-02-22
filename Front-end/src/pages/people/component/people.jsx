import axios from "axios";

import "./people.css";

const people = (props) => {
  const newConversationHandler = () => {
    const newConversation = {
      name: `${props.name} &   ${props.userId.name}`,
      id1: props.userId.userId,
      id2: props.id,
      profile1: props.userId.profile,
      profile2: props.image,
    };

    axios
      .post("http://localhost:5000/", newConversation, {
        headers: { Authorization: `Bearer ${props.userId.token}` },
      })
      .then((a) => {
        console.log(a);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" src={`http://localhost:5000/${props.image}`} />
        </div>
        <div class="team-content">
          <h3 class="name">{props.name}</h3>
          <h4 class="title">Web Developer</h4>
        </div>
        <div class="social">
          <div on onClick={newConversationHandler} className="button">
            <button>Connect +</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default people;
