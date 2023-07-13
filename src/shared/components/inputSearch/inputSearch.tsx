import { SearchOutlined } from '@ant-design/icons';

interface InputSearchProps {
  width: number | undefined;
  height: number;
  placeholder: string;
}
export default function InputSearch(props: InputSearchProps) {
  const width = props.width;
  const height = props.height;
  const placeholder = props.placeholder;
  return (
    <div className="position-relative" style={{ width: `${width}px`, height: `${height}px` }}>
      <input className="form-control" placeholder={placeholder} />
      <i className="position-absolute position-icons-search">
        <SearchOutlined />
      </i>
    </div>
  );
}
