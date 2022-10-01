import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { Link } from "react-router-dom";

export default function ApparelMobileHeader() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <header className="mobile_header">
        <div className="left">
          <div className="menu_btn" onClick={handleShow}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
        <div className="center">
          <a href="/" id="header_title">HyunApparel</a>
        </div>
        <div className="right">
          <div className="my_btn">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      </header>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menus</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to={ApparelRoutes.list}>
            <i className="fas fa-tshirt"></i>
            <span>All Apparels</span>
          </Link>
          <Link to={ApparelRoutes.categoryList}>
            <i className="fas fa-th-large"></i>
            <span>Categories</span>
          </Link>
          <Link to={ApparelRoutes.list}>
            <i className="fas fa-tag"></i>
            <span>Brands</span>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
