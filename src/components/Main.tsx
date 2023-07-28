import ContactUs from "./ContactUs";
import Intro from "./Intro";
import Recommendations from "./Recommendations";

const MainPage: React.FC = () => {
    return (
      <div>
        <Intro />
        <Recommendations />
        <ContactUs />
      </div>
    );
  };

export default MainPage;