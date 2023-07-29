import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import ManagerList from "./ManagersList";
import ManagerDetails from "./ManagerDetails";
import ManagerPhoto from "./ManagerPhoto";
import { Manager } from "./types";
import styles from '../../styles/managers.module.css'

const managers: Manager[] = [
  {
    id: 1,
    firstName: "Vladyslav",
    lastName: "Lazoryk",
    position: "Senior Manager",
    discription: "An experienced and responsible property rental manager. Striving to meet clients' requirements, she offers cozy apartments with stunning views and convenient amenities. Alice always finds the best options, helping clients choose the perfect home within their budget",
    photo: "https://photo-ideal.ru/upload/resize_cache/iblock/46e/1050_700_149dc9130545c5ea77856799b48f99ef6/46e17c0c301fcb28b42e38566b435189.jpg",
    largePhoto: "https://photo-ideal.ru/upload/resize_cache/iblock/46e/1050_700_149dc9130545c5ea77856799b48f99ef6/46e17c0c301fcb28b42e38566b435189.jpg",
    district: "North Ukraine",
    deals: "265"
  },
  {
    id: 2,
    firstName: "Denys",
    lastName: "Bulatov",
    position: "Senior Manager",
    discription: "A creative property rental manager with a passion for real estate. He discovers unique and stylish properties for his clients. Maxim has a great sense of style and can offer numerous choices that cater to the most refined tastes",
    photo: "https://www.simplilearn.com/ice9/free_resources_article_thumb/How_to_become_a_marketing_manager.jpg",
    largePhoto: "https://www.simplilearn.com/ice9/free_resources_article_thumb/How_to_become_a_marketing_manager.jpg",
    district: "West Ukraine",
    deals: "445"
},
  {
    id: 3,
    firstName: "Vitaliy",
    lastName: "Britikov",
    position: "Middle Manager",
    discription: "A caring and attentive property rental manager. With a deep understanding of clients' needs, she offers comfortable and functional apartments. Elena is always ready to assist with paperwork and formalities, making the rental process incredibly smooth.",
    photo: "https://img.freepik.com/premium-photo/happy-male-manager-dressed-in-black-formal-suit_95891-708.jpg",
    largePhoto: "https://img.freepik.com/premium-photo/happy-male-manager-dressed-in-black-formal-suit_95891-708.jpg",
    district: "Central Ukraine",
    deals: "252"
},
  {
    id: 4,
    firstName: "Artem",
    lastName: "Kanischev",
    position: "Middle Manager",
    discription: "An energetic and welcoming property rental manager. With his help, clients quickly find suitable properties and feel cared for throughout the entire process. Andrew presents a variety of options, from classic to modern, to satisfy diverse preferences.",
    photo: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3760263.jpg&fm=jpg",
    largePhoto: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3760263.jpg&fm=jpg",
    district: "East Ukraine",
    deals: "141"
},
  {
    id: 5,
    firstName: "Max",
    lastName: "Pokhil",
    position: "Middle Manager",
    discription: "A professional and disciplined property rental manager. With her ability to quickly resolve issues and listen to clients' needs, Olga finds perfect matches for everyone. Her approach to work is organized and focused on making the rental experience pleasant and stress-free for clients.",
    photo: "https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?cs=srgb&dl=pexels-moose-photos-1586996.jpg&fm=jpg",
    largePhoto: "https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?cs=srgb&dl=pexels-moose-photos-1586996.jpg&fm=jpg",
    district: "South Ukraine",
    deals: "245"
    },
];

const OurManagers: React.FC = observer(() => {
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  const handleManagerSelect = (manager: Manager) => {
    setSelectedManager(manager);
  };
  
  return (
    <div>
      <div className="title">Our Managers</div>
      <div className="line"></div>
      <div className={styles.grid_container}>
        <ManagerList
          managers={managers}
          onManagerSelect={handleManagerSelect}
        />
        <ManagerDetails manager={selectedManager} />
        <ManagerPhoto manager={selectedManager} />
      </div>
    </div>
  );
});

export default OurManagers;
