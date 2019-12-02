import React, {Component} from 'react';
import './starship-details.css';
import SwapiService from '../../services/';

export default class StarshipDetails extends Component {
    swapiService = new SwapiService();

    state = {
        shipInfo: true
    };
    componentDidMount() {
        this.updateShip()
    }
    componentDidUpdate(prevProps) {
        if (this.props.shipId !== prevProps.shipId){
         this.updateShip()
        }
    };
    updateShip(){
        this.swapiService
            .getStarship(this.props.shipId)
            .then((shipInfo) =>{
                this.setState({shipInfo})
            });
    }
    render() {
        const {shipInfo} = this.state;
        if (!shipInfo){
            return <span> Select starship from list</span>
        }
        return (
            <div className='person-details card'>
                <img className='person-image'
                     src={`https://starwars-visualguide.com/assets/img/starships/${this.props.shipId}.jpg`}
                     alt="Picture absent"/>
                <div className='card-body'>

                    <h4 className='person-term'>
                        {this.state.shipInfo.name}

                    </h4>
                    <ul className="list-group list-group-flush ">
                        <li className='list-group-item'>
                            <span className='person-term'>Created: </span>
                            <span>{this.state.shipInfo.created}</span>
                        </li>
                        <li className='list-group-item'>
                            <span className='person-term'>Manufacturer: </span>
                            <span> {this.state.shipInfo.manufacturer}</span>
                        </li>
                        <li className='list-group-item'>
                            <span className='person-term'>Model:</span>
                            <span>{this.state.shipInfo.model}</span>
                        </li>
                        <button className="btn-danger btn-alert"><h4>Throw error</h4></button>

                    </ul>
                </div>
            </div>
        )
    }
};