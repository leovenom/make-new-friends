import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/forum">Forum</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Welcome to our friendly platform for couples</h1>
        <p>
          Making friends after 25 can be tough, especially for couples looking
          to connect with other couples. But with our platform, you can easily
          connect with other couples in your area who share similar interests.
          We make it easier to make new friends and build lasting relationships.
        </p>
        <button>
          <Link to="/signup">Get Started</Link>
        </button>
      </main>
      <footer>
        <p>&copy; 2023 Couples Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default Home;
