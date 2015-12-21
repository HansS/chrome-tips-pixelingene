import React from 'react';
import PersonList from './person/person-list.jsx';
import FilterPanel from './filter-panel/filter-panel.jsx';

export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            people: []
        };
    }

    render() {
        return (
            <main>
                <FilterPanel people={this.state.people}/>
                <PersonList people={this.state.people}/>
            </main>
        );
    }

    componentDidMount() {
        fetch('/api/people')
            .then(response=>response.json())
            .then(json=> {
                this.setState({people: json});
            })
            .catch(ex=>console.log(ex));
    }

};

Dashboard.defaultProps = {};