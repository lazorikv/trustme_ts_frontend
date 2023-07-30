import React, { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import '../styles/NewsCarousel.css'; // Создайте файл для стилей
import { useNavigate } from 'react-router-dom';

// Тип данных для новости
type NewsItem = {
  id: number;
  title: string;
  text: string;
  imageUrl: string;
};

type NewsCarouselProps = {
  newsData: NewsItem[];
};

const NewsCarousel: React.FC<NewsCarouselProps> = ({ newsData }) => {

const navigator = useNavigate();

  const itemsPerPage = 3;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<NewsItem[]>(() => {
    return newsData.slice(0, itemsPerPage);
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    updateCurrentItems(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    updateCurrentItems(currentPage - 1);
  };

  const updateCurrentItems = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, newsData.length);
    setCurrentItems(newsData.slice(startIndex, endIndex));
  };

  const renderNewsItems = () => {
    return currentItems.map((news) => (
      <div key={news.id} onClick={() => {navigator(`/news/${news.id}`)}} className="news-item">
        <img src={news.imageUrl} alt={news.title} />
        <h3>{news.title}</h3>
        <p>{news.text}</p>
        <div className='news-url'>
        <a>Read more</a>
        </div>
      </div>
    ));
  };

  return (
    <div className="news-carousel">
      <div className="carousel-container">
        {renderNewsItems()}
      </div>
      <div className="carousel-navigation">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <RiArrowLeftSLine />
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <RiArrowRightSLine />
        </button>
      </div>
    </div>
  );
};

export default NewsCarousel;
