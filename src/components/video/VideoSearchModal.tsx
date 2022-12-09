import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { VideoSearchActions } from "src/pages/video/search/VideoSearchState";
import VideoRoutes from "src/pages/video/VideoRoutes";
import { useDispatch, useSelector } from "src/redux";

export default function VideoSearchModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { showSearchModal } = useSelector(s => s.video.search);
  const { t } = useTranslation();

  const onClose = () => {
    dispatch(VideoSearchActions.update({ showSearchModal: false }));
  }

  const onSearch = () => {
    dispatch(VideoSearchActions.update({ showSearchModal: false }));
    navigate(VideoRoutes.searchResultRoute(query));
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }

  return (
    <Modal show={showSearchModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('video.search-modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="search_query" className="form-label">{t('video.search-modal.label')}</label>
				<input
          type="text"
          className="form-control input_dark"
          id="search_query"
          value={query}
          onInput={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={onEnter}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('close')}
        </Button>
        <Button variant="primary" onClick={onSearch}>
          {t('search')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
