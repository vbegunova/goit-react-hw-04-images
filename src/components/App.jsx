import { useEffect, useRef, useState } from 'react';
import { fetchItems } from 'services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import Error from './Error';

const ERR_MESSAGE =
  'Oops, sorry, something went wrong, try reloading this page.';

export const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const abortCtrl = useRef();

  useEffect(() => {
    if (query === '') {
      return;
    }
    if (abortCtrl.current) {
      abortCtrl.current.abort();
    }
    abortCtrl.current = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const fetchedData = await fetchItems({
          query,
          page,
          abortCtrl: abortCtrl.current,
        });
        if (fetchedData.totalHits === 0) {
          setError('Please, enter a correct query.');
          return;
        }

        const items = getNormilizedItem(fetchedData.hits);
        setData(prevState => [...prevState, ...items]);
        setTotalPages(Math.ceil(fetchedData.totalHits / 12));

        // if (page !== 1) {
        //   window.scrollBy({
        //     top: 300 * 3,
        //     behavior: 'smooth',
        //   });
        // }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(ERR_MESSAGE);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const getNormilizedItem = arr => {
    return [...arr].map(item => {
      return {
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
      };
    });
  };

  const handleSubmit = (input, isError) => {
    if (isError) {
      setQuery('');
      setData([]);
      setError(input);
      return;
    }
    setPage(1);
    setQuery(input);
    setData([]);
  };

  const openModal = image => {
    setIsModalOpen(true);
    setImage(image);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const verify = totalPages !== page && !error;

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {data[0] && <ImageGallery items={data} openModal={openModal} />}
      {data[0] && verify && (
        <Button handleClick={() => setPage(prevState => prevState + 1)} />
      )}
      {isLoading && <Loader />}
      {error && !isLoading && <Error error={error} />}
      {isModalOpen && <Modal image={image} onClose={closeModal} />}
    </>
  );
};
