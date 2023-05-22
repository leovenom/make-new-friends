import axios from "axios";
import { useEffect, useState } from "react";

const MatchesDisplay = ({ matches }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);

  const matchedUserIds = matches.map(({ user_id }) => user_id);

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div className="matches-display">
      <div className="match-card">
        .
        <div className="img-container">
          <img src="" />
        </div>
        <h3>first name</h3>
      </div>
    </div>
  );
};

export default MatchesDisplay;
