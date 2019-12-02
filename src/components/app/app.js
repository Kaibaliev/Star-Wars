import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import StarshipList from '../starships-list';
import StarshipDetails from '../starship-details'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

{/*<Router >*/}
{/*    <div>*/}
{/*        <div>*/}
{/*            <Link to="/">Tracks</Link>*/}
{/*            <Link to="/about">About</Link>*/}
{/*        </div>*/}
{/*        <Route exact path="/" component={App} />*/}
{/*        <Route path="/about" component={About}/>*/}
{/*    </div>*/}
{/*</Router>*/}


class App extends Component {
    state = {
        showRandomPlanet: true,
        selectedPerson: 4,
        selectedShip: 10
    };

    toggleRandomPlanet = () => {
        this.setState({showRandomPlanet: !this.state.showRandomPlanet})
    };
    onPersonSelected = (id) => {
        this.setState({selectedPerson: id})
    };
    onShipSelected = (id)=>{
        this.setState({selectedShip:id})
    };

    render() {

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;


        return (
            <div>
                <Header/>
                {planet}
                <button className='btn onHide'
                        onClick={this.toggleRandomPlanet}>Hide or show planets info
                </button>

                <div className="row mb2">
                    <div className="col-md-5 offset-1">
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6 row-1">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>

                </div>
                <div className="row mb3">
                    <div className="col-md-5 offset-1">
                        <StarshipList onShipSelected = {this.onShipSelected}/>
                    </div>
                    <div className="col-md-6">
                        <StarshipDetails shipId={this.state.selectedShip}/>
                    </div>
                </div>
            </div>
        )
    };
}


export default App;