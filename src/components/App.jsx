import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchImage } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import * as Scroll from 'react-scroll';
import Error from './Error/Error';
import Modal from './Modal/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus('pending');

    if (page === 1) {
      setImages([]);
    }

    fetchGallery();

    function fetchGallery() {
      fetchImage(searchQuery, page)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.hits]);
          setStatus('resolved');
          setTotalHits(response.totalHits);

          if (response.hits.length === 0) {
            setStatus('rejected');
            setError('По вашому запиту нічого не знайдено!');
          }
        })
        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
    }
  }, [searchQuery, page]);

  const searchValue = newQuery => {
    if (newQuery !== searchQuery) {
      setSearchQuery(newQuery);
      setPage(1);
    }
  };

  const LoadMore = () => {
    setPage(page + 1);
    Scroll.animateScroll.scrollMore(300, { duration: 400 });
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setModalImage(largeImageURL);
  };

  const errorString = () => {
    setImages([]);
    setStatus('rejected');
    setError('На порожню стрічку запит не відбувається!');
  };

  return (
    <>
      <Searchbar onSubmit={searchValue} errorMessage={errorString} />

      {status !== 'idle' && images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}

      {status === 'resolved' && images.length !== totalHits && (
        <Button onClick={LoadMore} />
      )}

      {status === 'rejected' && <Error message={error} />}

      {status === 'pending' && <Loader />}

      {showModal && <Modal image={modalImage} closeModal={toggleModal} />}
    </>
  );
}
