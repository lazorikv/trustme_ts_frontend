import ContactUs from "./ContactUs";
import Intro from "./Intro";
import OurManagers from "./Managers/Managers";
import Recommendations from "./Recommendations";

const MainPage: React.FC = () => {
    return (
      <div>
        <Intro />
        <Recommendations />
        <ContactUs />
        <OurManagers />
      </div>
    );
  };

export default MainPage;