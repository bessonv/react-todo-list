import "./NoteItem.style.scss";
import NoteItemProps from "./NoteItem.props";
import { MouseEvent } from 'react';
import { useGlobalContext } from "../../context/app.context";

const NoteItem = ({ data, className, ...props }: NoteItemProps): JSX.Element => {
  const state = useGlobalContext();
  const {
    key,
    name,
    description,
    created
  } = data;
  const handleShow = (e: MouseEvent<HTMLLIElement>) => {
    state.showNote(key);
  }
  const handleDelete = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    state.showDeleteModal(key);
  }
  return (
    <li
      className={`${className ?? ''} note-item`}
      onClick={handleShow}
      {...props}
    >
      <article className="note-item__content">
        <header className="note-item__header">
          <h2 className="note-item__name">{name}</h2>
          <span className="note-item__delete_button button-cross" onClick={handleDelete}>X</span>
        </header>
        <p className="note-item__description">
          {description.length > 160 ? description.slice(0, 160) + '...' : description}
        </p>
        <span className="note-item__date">
          {`${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()}`}
        </span>
      </article>
    </li>
  )
}

export default NoteItem;