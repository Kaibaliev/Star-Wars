import React, {Component} from 'react';
import './item-list.css';
import SwapiService from "../../services";
import Spinner from "../spinner";

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        peopleList: null,
    };

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) => {
                this.setState({peopleList})
            });

    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            return (
                <li className='list-group-item'
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {item.name}
                </li>
            )
        })
    };


    render() {

        const {peopleList} = this.state;
        if (!peopleList) {
            return <Spinner/>
        }
        const items = this.renderItems(peopleList);
        if (peopleList) {
            return (
                <div>
                    {items}
                </div>
            );
        }
    }
}
