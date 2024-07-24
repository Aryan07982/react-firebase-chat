import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../lib/chatStore';
import { auth, db } from '../lib/firebase'
import { useUserStore } from '../lib/userStore';
import './detail.css'

const Detail = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat()
  };

  return (
    <div className='detail'>

      <div className="user">
        <img src={ user?.avatar || "./avatar.png" } alt="" />
        <h2>{ user?.username }</h2>
        <p>Tera Pyaara Dost</p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItems">
              <div className="PhotoDetail">              
              <img src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg" alt="" />
              <span>photo_2024_.png</span>
              </div>
              <img src="./download.png" alt="" className='icon'/>
            </div>                                                
            <div className="photoItems">
              <div className="PhotoDetail">              
              <img src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg" alt="" />
              <span>photo_2024_.png</span>
              </div>
              <img src="./download.png" alt="" className='icon'/>
            </div>                                                
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="arrowUp.png" alt="" />
          </div>
        </div>
      </div>

      <div className='bottom'>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
          </button>
        <button className='logout' onClick={handleLogout}>Logout</button>
      </div>
      
    </div>
  )
}

export default Detail