import { useState, useEffect } from 'react';
import { fetchAllUserDocuments } from './utils/getUserService';
import GalleryCard from './GalleryCard';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import arrowImage from './assets/img/arrow.png';

const Main = styled.main`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #343394;
`;

const SectionContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96%;
  margin-left: 20px;
  border-radius: 30px;
  background-color: #e7e6ff;
  padding: 20px;
`;

const GalleryListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  left: 2rem;
  width: 50px;
  height: auto;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0 10px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2rem;
  width: 50px;
  height: auto;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0 10px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

const Gallery = () => {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchAllUserDocuments();
        setAllItems(items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <Main>
      <SectionContainer>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <PrevButton onClick={handlePrevPage} disabled={currentPage === 1}>
              <img src={arrowImage} alt="Previous" />
            </PrevButton>
            <GalleryListWrap>
              {currentItems.map(data => (
                <GalleryCard key={data.id} data={data} />
              ))}
            </GalleryListWrap>
            <NextButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <img src={arrowImage} alt="Previous" />
            </NextButton>
          </>
        )}
      </SectionContainer>
      <Sidebar />
    </Main>
  );
};

export default Gallery;
