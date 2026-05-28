import { useState } from 'react';
import styles from './locationPopup.module.css'
import { LuX } from 'react-icons/lu'

interface LocationPopupProps {
    onClose: () => void;
}

export default function LocationPopup({onClose }: LocationPopupProps) {


    return (
        <div className= {styles.popup}>
                <div className= {styles.popupContent}>
                    <div className= {styles.popupHead}>
                        <p>Select Your Location</p>
                        <LuX size={16} color="#1c1c1c" strokeWidth={1} onClick={onClose}/>
                    </div>
                <div className= {styles.popupBody}>
                    <div className= {styles.locationOption}>
                        <label htmlFor="lagos">Lagos, Nigeria</label>
                        <input type="radio" id="lagos" name="location" value="lagos" />
                    </div>
                    <div className= {styles.locationOption}>
                        <label htmlFor="ilorin">Ilorin, Kwara</label>
                        <input type="radio" id="ilorin" name="location" value="ilorin" />
                    </div>
                </div>
            </div>
        </div>
    )
}