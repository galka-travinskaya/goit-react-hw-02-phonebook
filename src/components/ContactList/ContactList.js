import React from 'react'
import PropTypes from "prop-types";
import s from './ContactList.module.css'


const ContactList = ({contacts, onRemove}) => {
    if(contacts.length === 0) {
        alert('The list is empty')
        return null;
    }

    
    return (
        <ul className={s.list}>
        {contacts.map(({name, number, id}) => 
            <li className={s.items} key={id}>
                <p className={s.text}>{name}: {number}</p>
                <button 
                    className={s.delete_btn}
                    type="button"
                    onClick={() => onRemove(id)}>
                        Delete
                </button>
            </li>
        )}
    </ul>
    )
}
    

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            number: PropTypes.string,
        }),
    ),
    onRemove: PropTypes.func.isRequired,
}

export default ContactList;
