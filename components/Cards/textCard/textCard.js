import styles from './TextCard.module.css';
import cls from 'classnames';
import usePathValue from '../../../handlers/path_handler';




const TextCard = ({ handleSelectedInput, selectedInputType, handlePathValueClick }) => {

    const { handleGetPathValue } = usePathValue();

    const handleItemClick = (pathValue) => {
        handleGetPathValue(pathValue);
        handlePathValueClick(pathValue);
    };

    return (
        <div onClick={handleSelectedInput} className={styles.container}>
            <div onClick={() => handleItemClick('/output')} className={cls(styles.iconContainer, { [styles.selected]: selectedInputType })}>
                <h3 className={styles.exampleHeader}>Example:</h3>
                <div className={styles.secondColorDiv}>
                    <p className={styles.exampleText}>
                        an astronaut riding a horse on mars, hd, dramatic lighting
                    </p>
                </div>
            </div>
            <div className={styles.headerDiv}>
                <p className={styles.textHeader}> Text</p>
            </div>
        </div>
    )
}

export default TextCard;