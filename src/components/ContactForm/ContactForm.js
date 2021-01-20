import {Component} from 'react';
import s from './ContactForm.module.css'


class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }

    handleChange = (e) => {
        const {name, value} = e.currentTarget;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const {name, number} = this.state;
        this.props.onSubmit(name, number, this.reset);
        const isValidForm = this.validateForm();

        // if (contacts.find(({ name }) => name.toLowerCase() === this.state.name.toLowerCase())) {
        //     alert('Contact is already exist');
        //     return
        //   }

        if(!isValidForm) return;
        
        this.reset();
    }

    validateForm = () => {
        const {name, number} = this.state;
        const {onCheckUnique} = this.props;
        if(!name || !number) {
            alert('Some field is empty')
            // для чего тут false?
            // return false
            return
        }
        return onCheckUnique(name);
    }

    // не очищает номер
    reset = () => {
        this.setState({
            name: '',
            number: '',
        });
    }

    render() {
        return (
            <form className={s.form} onSubmit={this.handleSubmit}>
                <h1>Phonebook</h1>
                <label className={s.label}> 
                    <span className={s.text}>Name</span>
                    <input 
                        type='text' 
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </label>
                    
                <label className={s.label}> 
                    <span className={s.text}>Number</span>
                    <input 
                        type='tel' 
                        name="number"
                        value={this.state.nubmer}
                        onChange={this.handleChange}
                    />
                </label>
                <button className={s.form__btn} type="submit">Add contact</button>
            </form>
        );
    }
    
}    

export default ContactForm;