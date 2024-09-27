import PropTypes from 'prop-types';
import styled from 'styled-components';

const GalleryCardWrap = styled.div`
  cursor: pointer;
`;

const GalleryCardList = styled.div`
  width: 100%;
`;

const GalleryCardImg = styled.div`
  padding: 10%;
  border-radius: 30px;
  background: #fff;
  text-align: center;
  border: 3px solid rgba(52, 51, 148, 0);
  transition: all 0.2s ease-in-out;

  img {
    width: 100%;
    height: auto;
  }
`;

const GalleryCardText = styled.h3`
  padding-top: 30px;
  color: #343394;
  font-size: 20px;
  font-weight: 900;
  text-align: center;
`;

const GalleryCard = ({ data }) => {
  const { thumbnail, nickname } = data;

  return (
    <GalleryCardWrap>
      <GalleryCardList>
        <GalleryCardImg>
          <img src={thumbnail} alt="완성된 종이접기 스냅샷" />
        </GalleryCardImg>
        <GalleryCardText>{nickname}</GalleryCardText>
      </GalleryCardList>
    </GalleryCardWrap>
  );
};

GalleryCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
  }).isRequired,
};

export default GalleryCard;
