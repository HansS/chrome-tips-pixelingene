import './main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import Person from './components/person.jsx';

class PersonList extends React.Component {

    constructor() {
        super();
        this.state = {
            people: []
        };
    }

    render() {
        var elements = this.state.people.map((p)=> {
            let name = `${p.firstName}, ${p.lastName}`;
            return (
                <Person key={p.id} name={name}>
                </Person>
            );
        });

        return (
            <div className="person-list">
                {elements}
            </div>
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
}

ReactDom.render(<PersonList />, document.querySelector('.people'));