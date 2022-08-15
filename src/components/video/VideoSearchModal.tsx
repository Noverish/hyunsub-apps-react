import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { VideoSearchActions } from "src/pages/video/search/VideoSearchState";
import VideoRoutes from "src/pages/video/VideoRoutes";
import { useDispatch, useSelector } from "src/redux";

export default function VideoSearchModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { showSearchModal } = useSelector(s => s.video.search);

  const onClose = () => {
    dispatch(VideoSearchActions.update({ showSearchModal: false }));
  }

  const onSearch = () => {
    dispatch(VideoSearchActions.update({ showSearchModal: false }));
    navigate(VideoRoutes.getSearchRoute(query));
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }

  return (
    <Modal show={showSearchModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>비디오 검색</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="search_query" className="form-label">검색어</label>
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
          Close
        </Button>
        <Button variant="primary" onClick={onSearch}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
