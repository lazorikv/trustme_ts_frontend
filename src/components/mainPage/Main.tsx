import ContactUs from "../contactUs/ContactUs";
import Intro from "./Intro";
import OurManagers from "../Managers/Managers";
import Recommendations from "./Recommendations";
import News from "../News/news";

const MainPage: React.FC = () => {
    return (
      <div>
        <Intro />
        <Recommendations />
        <ContactUs />
        <OurManagers />
        <News />
      </div>
    );
  };

export default MainPage;