import React, {Component} from 'react';
import './starships-list.css';
import SwapiService from "../../services";
import Spinner from "../spinner";

export default class StarshipsList extends Component {

    swapiService = new SwapiService();

    state = {
        shipsList: null,
    };

    componentDidMount() {
        this.swapiService
            .getAllStarships()
            .then((shipsList) => {
                this.setState({shipsList})
            });

    }

    renderShips(arr) {
        return arr.map((ship) => {
            const {id} = ship;
            return (
                <li className='list-group-item'
                    onClick={() => this.props.onShipSelected(id)}
                >
                    {ship.name}
                </li>
            )
        })
    };


    render() {

        const {shipsList} = this.state;
        if (!shipsList) {
            return <Spinner/>
        }
        const ships = this.renderShips(shipsList);
        if (shipsList) {
            return (
                <div>
                    {ships}
                </div>
            );
        }
    }
}