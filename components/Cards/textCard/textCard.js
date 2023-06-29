import styles from './TextCard.module.css';
import cls from 'classnames';


export default function TextCard({ handleSelectedInput, selectedInputType, handlePathValueClick }) {

    return (
        <div onClick={handleSelectedInput} className={styles.container}>
            <div
                onClick={handlePathValueClick}
                className={cls(styles.iconContainer, { [styles.selected]: selectedInputType })}>
                <h3 className={styles.exampleHeader}>Example</h3>
                <div className={styles.secondColorDiv}>
                    <p className={styles.exampleText}>
                        an astronaut riding a horse on mars, hd, dramatic lighting
                    </p>
                </div>
            </div>
            <div className={styles.headerDiv}>
                <p className={styles.textHeader}>Text</p>
            </div>
        </div>
    )
}

