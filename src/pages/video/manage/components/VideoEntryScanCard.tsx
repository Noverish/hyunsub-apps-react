import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

import videoScanApi from 'src/api/video/admin/video-scan';
import ApiResult from 'src/components/common/ApiResult';
import { useUrlParams } from 'src/hooks/url-params';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export default function VideoEntryScanCard() {
  const [entryId] = useUrlParams('entryId');
  const [result, setResult] = useState<any>();

  const onScan = async () => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoScanApi({ entryId });
    setResult(result);

    dispatch(GlobalActions.update({ loading: false }));
  };

  return (
    <Card className="VideoEntryScanCard">
      <Card.Header>Scan Entry</Card.Header>
      <Card.Body>
        <Button onClick={onScan}>Scan</Button>
        {result && <ApiResult className="mt-3" result={result} />}
      </Card.Body>
    </Card>
  );
}
