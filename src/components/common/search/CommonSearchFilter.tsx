import './CommonSearchFilter.scss';

interface Props {
  children: React.ReactNode;
  onDelete: () => void;
}

export default function CommonSearchFilter(props: Props) {
  const { children, onDelete } = props;

  return (
    <div className="CommonSearchFilter">
      {children}
      <i className="fas fa-times" onClick={onDelete} />
    </div>
  );
}
