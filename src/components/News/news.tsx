import React from "react";
import NewsCarousel from "./NewsCarousel";


const newsData = [
    {
      id: 1,
      title: 'Rental Housing Demand Surges: Prices Reach Record Highs Amidst Supply Shortage',
      text: 'Amid a post-pandemic economic rebound and growing population migrations, the demand for rental housing has skyrocketed.',
      imageUrl: 'https://cdn.xxl.thumbs.canstockphoto.com/female-leader-portrait-of-a-smiling-business-woman-looking-at-camera-with-four-employees-behind-stock-photography_csp11525502.jpg',
    },
    {
        id: 2,
        title: 'Millennials Opt for Flexible Living: Co-living Spaces on the Rise',
        text: 'Embracing a shared economy and a desire for community-driven living, millennials are flocking to co-living spaces.',
        imageUrl: 'https://img.freepik.com/free-photo/happy-young-business-team-four-people_1262-2127.jpg?w=360',
      },
      {
        id: 3,
        title: 'Urban Exodus: Suburban Rental Markets Booming Amid Pandemic Shift',
        text: 'As remote work and lifestyle preferences shift, urban exodus trends have spurred a booming suburban rental market.',
        imageUrl: 'https://media.istockphoto.com/id/1257268399/photo/confident-african-male-leader-telling-diverse-colleagues-about-new-project.jpg?s=612x612&w=0&k=20&c=Kv9gzdF7cK3hrpzD8yFCg_prL9zWkORhk5O4vgTwAYY=',
      },
      {
        id: 4,
        title: 'Tech-Driven Rentals: Smart Homes Revolutionize the Rental Experience',
        text: 'The rental housing sector is witnessing a technological revolution, as smart homes become increasingly popular.',
        imageUrl: 'https://media.istockphoto.com/id/1071030302/photo/female-inventory-manager-shows-digital-tablet-information-to-a-worker-holding-cardboard-box.jpg?s=612x612&w=0&k=20&c=_PRg90QRTbxUPDljUJEAc9n5WnBG8TkMoEneC554Ag8=',
      },
      {
        id: 5,
        title: 'Sustainable Living Gains Momentum: Eco-Friendly Rentals Attract Tenants',
        text: 'With growing environmental consciousness, eco-friendly rental properties are in high demand.',
        imageUrl: 'https://s40424.pcdn.co/in/wp-content/uploads/2022/09/sales.jpg.optimal.jpg',
      },
      {
        id: 6,
        title: 'Rental Regulations Tighten: Cities Enforce Stricter Rules for Landlords',
        text: 'In response to mounting housing challenges, cities are enacting tighter rental regulations to protect tenants rights and promote fair housing practices.',
        imageUrl: 'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/sparkle-box/2018/03/22170723/6-strengths-for-modern-engineering-managers-image.jpg',
      }
  ];

const News: React.FC = () => {
    return (
        <div>
            <div className="title">
                News
            </div>
            <div className="line"></div>
            <div>
            <NewsCarousel newsData={newsData} />
            </div>
        </div>
    )
}

export default News;