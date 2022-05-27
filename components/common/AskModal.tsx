import Styles from '../../styles/Todo.module.css';

type AskModalProps = {
    onClick: (e:any) => void;
    childrenForm: any;
}

const AskModal = ({onClick, childrenForm }:AskModalProps) => {

    return (
        <div className={Styles.todo_wrap} onClick={onClick}>
            <div className={Styles.todo_content}>
                <button className={Styles.todo_close_btn} data-btn="N"></button>
                {childrenForm}
            </div>
        </div>
    );
};

export default AskModal;