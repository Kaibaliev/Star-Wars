import React, {Component} from 'react';

import './random-planet.css';
import SwapiService from '../../services/';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loader: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        setInterval(this.updatePlanet, 5000)
    }

    onError = () => {
        this.setState({
            error: true,
            loader: false
        })
    };

    onUpdatePlanetLoader = (planet) => {

            this.setState({
                planet,
                loader: false
            });

        };

    updatePlanet=()=> {
        const id = Math.floor(Math.random() * 10) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onUpdatePlanetLoader).catch(this.onError)
    };

    render() {
        const {planet, loader, error} = this.state;
        const hasData = !(loader || error);
        const spinner = loader ? <Spinner/> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;
        const errorMassege = error ? <ErrorIndicator/> : null;


        return (
            <div className="random-planet jumbotron rounded d-flex">
                {spinner}
                {content}
                {errorMassege}
            </div>

        );
    }
}


const PlanetView = ({planet}) => {
    const {name, population, rotationPeriod, diameter, id} = planet;

    return (
        <React.Fragment>
            <img className="planet-image" alt=''
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};
