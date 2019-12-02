import React, {Component} from 'react';
import './person-details.css';
import SwapiService from '../../services/';

export default class PersonDetails extends Component {
    swapiService = new SwapiService();
    state = {
        personInfo: true
    };

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson()
        }
    }

    updatePerson() {
        this.swapiService
            .getPerson(this.props.personId)
            .then((personInfo) => {
                this.setState({personInfo})

            });
    }

    render() {
        const {personInfo} = this.state;
        if (!personInfo) {
            return <span> Select person from list</span>
        }
        return (
            <div className='person-details card'>
                <img className='person-image'
                     src={`https://starwars-visualguide.com/assets/img/characters/${this.props.personId}.jpg`}
                     alt="Picture absent"/>
                <div className='card-body'>

                    <h4 className='person-term'>
                        {this.state.personInfo.name}
                    </h4>
                    <ul className="list-group list-group-flush ">
                        <li className='list-group-item'>
                            <span className='person-term'>Birth year: </span>
                            <span> {this.state.personInfo.birthYear}</span>
                        </li>
                        <li className='list-group-item'>
                            <span className='person-term'>Gender: </span>
                            <span> {this.state.personInfo.gender}</span>
                        </li>
                        <li className='list-group-item'>
                            <span className='person-term'>Eye color: </span>
                            <span> {this.state.personInfo.eyeColor}</span>
                        </li>
                        <button className="btn-danger btn-alert"><h4>Throw error</h4></button>

                    </ul>
                </div>
            </div>


        )
    }
};