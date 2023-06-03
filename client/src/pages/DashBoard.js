import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import axios from "axios";

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const [statusUsers, setStatusUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/status-users", {
        params: { status: user?.status_interest },
      });
      setStatusUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getStatusUsers();
    }
  }, [user]);

  const updateMaches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMaches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredStatusUsers = statusUsers?.filter(
    (statusUser) => !matchedUserIds.includes(statusUser.user_id)
  );

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {filteredStatusUsers?.map((statusUser) => (
                <TinderCard
                  className="swipe"
                  key={statusUser.user_id}
                  onSwipe={(dir) => swiped(dir, statusUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(statusUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + statusUser.url + ")" }}
                    className="card"
                  >
                    <h3>{statusUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoard;
