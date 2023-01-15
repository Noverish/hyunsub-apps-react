import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import getAuthorities from "src/api/auth/authorities";

import './AppsIndex.scss';

interface Service {
  name: string;
  icon: string;
  title: string;
}

const services: Service[] = [
  {
    name: 'video',
    icon: 'fas fa-film',
    title: 'Video',
  },
  {
    name: 'photo',
    icon: 'fas fa-camera',
    title: 'Photo',
  },
  {
    name: 'comic',
    icon: 'fas fa-book',
    title: 'Comic',
  },
  {
    name: 'apparel',
    icon: 'fas fa-tshirt',
    title: 'Apparel',
  },
  {
    name: 'drive',
    icon: 'fas fa-hdd',
    title: 'Drive',
  },
  {
    name: 'agnam',
    icon: 'fas fa-torii-gate',
    title: 'Agnam',
  }
]

export default function AppsIndex() {
  document.title = 'Hyunsub Apps';

  const authorities = getAuthorities.useApi({});

  const items = services.filter(v => authorities.includes(v.name));

  const elements = items.map(v => (
    <Col key={v.name}>
      <a href={`https://${v.name}.hyunsub.kim`}>
        <i className={v.icon}></i>
        <span>{v.title}</span>
      </a>
    </Col>
  ))

  return (
    <div id="AppsIndex">
      <div className="wrapper">
        <Row className="row-cols-2 g-5">
          {elements}
        </Row>
      </div>
    </div>
  )
}
