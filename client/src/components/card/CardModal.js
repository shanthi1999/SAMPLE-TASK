import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { GithubPicker } from "react-color";
import { editCard, archiveCard,postCardComment,getCardComment } from "../../actions/board";
import { Modal, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MoveCard from "./MoveCard";
import DeleteCard from "./DeleteCard";
import CardMembers from "./CardMembers";
import Checklist from "../checklist/Checklist";
import useStyles from "../../utils/modalStyles";
import Members from "../board/Members";
import { addCardMember } from "../../actions/board";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

const CardModal = ({ cardId, open, setOpen, card, list }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const dispatch = useDispatch();
  const [label,setLabel]=useState("");
  const [labelText,setLabelText] = useState("")
  const [priority,setpriority] = useState("");
  const [comment,setComment] = useState("")
  const cards = useSelector((state) =>
  state.board.board.cardObjects.find((object) => object._id === cardId)
);
const [savedComments,setsavedComments] = useState([])

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  // useEffect(()=> {
  //   console.log("cardId",cardId)
  //   setsavedComments(cards.comments?cards.comments:null)
  // },[cards])

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title, description }));
  };

  const onArchiveCard = async () => {
    dispatch(archiveCard(cardId, true));
    setOpen(false);
  };

  const handleChange = async(e)=>{
    e.persist();
    const name = await e.target.name
     setLabel(e.target.value)
  }

  const handleChangeColor = (color) => {
    setLabelText(color)
  }
  
const handleChanges = (e)=>{
  setpriority(e.target.value)
}

  const submitLabel = async () => {
    console.log("cardId",cardId,label,labelText)
    dispatch(editCard(cardId, { label: label, labelText:labelText,priority:priority }))
    // dispatch(editCard(cardId, { label: color.hex }))
  
  }

  const getComments = async(comments)=>{
    setComment(comments.target.value)
  }

  const submitComments = async ()=>{
    dispatch(postCardComment(cardId,{text:comment,name:user.name,user_id:user._id}))
    
  }
  const boardMembers = useSelector((state) => state.board.board.members);
  const members = card.members.map((member) => member.user);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      {/* {console.log("comments",savedComments?savedComments:"no ")} */}
      <div className={`${classes.paper} ${classes.cardModal}`}>
        <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
          <div className={classes.modalTop}>
            {user && user.type == "Job-seeker" ? (
              <div styles={{ display: "flex", flexDirection: "row" }}>
                {" "}
                <b>Task Name:</b>  <br/> <br/> <p>{title}</p>
              </div>
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                label="Task name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && onTitleDescriptionSubmit(e)
                }
                className={classes.cardTitle}
              />
            )}
            {user && user.type == "Job-seeker" ? (
              ""
            ) : (
              <Button  onClick={() => setOpen(false)}>
                <CloseIcon />
              </Button>
            )}
          </div>
          <br/>
          {user && user.type == "Job-seeker" ? (
            <div styles={{ display: "flex", flexDirection: "row" }}>
              {" "}
              <b>Task Description:</b> <br/>  <br/> <p> {description}</p>
            </div>
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              label="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
          {user && user.type == "Job-seeker" ? (
            ""
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                title === card.title &&
                (description === card.description ||
                  (description === "" && !card.description))
              }
              className={classes.button}
            >
              Save All Changes
            </Button>
          )}
        </form>
       <Checklist card={card} />

        <div className={classes.modalSection}>
          {user && user.type == "Job-seeker"? " ":<CardMembers card={card} />}
          <div>
            <h3 className={classes.labelTitle}>Label</h3>
          
            
             {user && user.type == "Job-seeker"?(cards.label && cards.label !== "none" && (
               <div>
                  <div
                    className="card-label"
                    style={{
                      marginTop:"10px",
                      padding: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: cards.labelText,
                      fontSize: "14px",
                      height: "20px",
                      borderRadius: "10px",
                      color: "#ffffff",
                      width:"max-content"
                    }}
                  >
                    {cards.label}
                    {console.log("cards",cards.comments)}
                    {/* {card.label === "#db3e00" ? "Bug" : (card.label==="#b80000"?"Backend":(card.label=="#fccb00"?"UI":"s"))}  */}
                  </div>
                  <br/>
                  <div><b>Priority</b><br/><br/><p>{cards.priority}</p></div>
                  </div>
                )):(
               <div>
            <GithubPicker
              className={classes.colorPicker}
              name="label"
              onChange={(color) =>handleChangeColor(color.hex)}
            />
             <Button
              className={classes.noLabel}
              variant="outlined"
              onClick={async () =>
                dispatch(editCard(cardId, { label: "none" }))
              }
            >
              No Label
            </Button>
             <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              label="Label Name"
              // value={labels.labelText}
              name="labelText"
              onChange={(e) => handleChange(e)}
            />
           
            <div>
            <br/>
            <b>Priority</b>
            <br/>
          <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              label="priority"
              // value={labels.labelText}
              name="priority"
              onChange={(e) => handleChanges(e)}
            />
          </div>
            <Button
             color="primary"
              variant="contained"
              onClick={submitLabel}
            >
              Save label
            </Button></div>)}
          </div>
        </div>
<br/>
        <div>
          
          <b>Assignees</b>
          <br/>
          <br/>
          {boardMembers.map((member) => (
            <div>{members.indexOf(member.user) !== -1 ? member.name : ""}</div>
          ))}
        </div>
        <br/>
     

            <div style={{display:'flex',flexDirection: 'column'}}>
              <b>Comments</b>
              <br/>
            <textarea  rows="8" cols="80" placeholder="Comments" name="comment" onChange={(e)=>getComments(e)}/>
            <br/>
            <Button variant="contained" color="primary" onClick={submitComments}>Post Comment</Button>
            </div>
            <br/>
            <div>
              <b>All Comments</b>
             {cards.comments?console.log("cards.comments",cards.comments):" "}
             {cards.comments?cards.comments.map((e)=>(
               <div>
              <br/>
               <b>{e.name}</b>
               <br/>
               <br/>
               <p>{e.text}</p>
               <br/>
               </div>
             )):" "}
            </div>
          
        {/* <div className={classes.modalSection}>
          <MoveCard cardId={cardId} setOpen={setOpen} thisList={list} />
          <div className={classes.modalBottomRight}>
            <Button 
              variant='contained'
              className={classes.archiveButton}
              onClick={onArchiveCard}
            >
              Archive Card
            </Button>
            <DeleteCard cardId={cardId} setOpen={setOpen} list={list} />
          </div>
        </div> */}
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
};

export default CardModal;
