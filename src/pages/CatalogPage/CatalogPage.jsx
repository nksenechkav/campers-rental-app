// src/pages/CatalogPage/CatalogPage.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle.jsx';
import { fetchCampers } from '../../redux/campers/operations.js';
import { selectIsLoading, selectError } from '../../redux/campers/selectors.js';
import LoaderComponent from '../../components/loader/Loader.jsx';
import ErrorMessage from '../../components/error/ErrorMessage.jsx';
// import SearchBox from '../../components/searchBox/SearchBox.jsx';
import CamperList from '../../components/camperList/CamperList.jsx';
import { selectCampers } from '../../redux/campers/selectors.js';
import CamperModal from '../../components/camperModal/CamperModal.jsx';

export default function CatalogPage() {
  const campers = useSelector(selectCampers);
  console.log('Campers:', campers);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setModalContent({});
    setIsOpen(false);
  }

  function clickOpenModal(content) {
    setModalContent(content);
    openModal();
  }

  return (
    <>
      <DocumentTitle>Catalog</DocumentTitle>
      {/* <SearchBox/> */}
      {isLoading && <LoaderComponent />}
      {error && <ErrorMessage />}
      <CamperList onShowClick={clickOpenModal} />
      <CamperModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        content={modalContent}
      />
    </>
  );
}
