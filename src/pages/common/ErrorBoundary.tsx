import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { withTranslation, WithTranslation } from 'react-i18next';

type Props = React.HTMLAttributes<HTMLElement> & WithTranslation;

interface State {
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    const { t } = this.props;
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <div id="ErrorBoundary" className="flex_center text-center" style={{ height: '100vh' }}>
        <h1 style={{ fontSize: '6rem' }}>{t('common.500.oh')}</h1>
        <div>{t('common.500.error')}</div>
        <Card className="mt-3 text-start overflow-scroll">
          <Card.Body>
            <pre><code>{JSON.stringify(error, null, 4)}</code></pre>
          </Card.Body>
        </Card>
        <Button href="/" variant="primary" className="mt-3">{t('common.500.go-to-home')}</Button>
      </div>
    )
  }
}

export default withTranslation()(ErrorBoundary);
