import axios from "axios";
import { toast } from "react-toastify";


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
      .post(process.env.REACT_APP_BACKEND_URL, newConversation, {
        headers: { Authorization: `Bearer ${props.userId.token}` },
      })
      .then((a) => {
        toast.success(`u are Now Connected With ${props.name} `,{position: "bottom-center",theme : 'dark', autoClose: 2000});
      })
      .catch((err) => {
          toast.error( `Connection Failed  😫`, {autoClose: 2000})
      });
  };
  return (
    <div>
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" src={`${process.env.REACT_APP_S3_URL}${props.image}`} alt = "" />
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
