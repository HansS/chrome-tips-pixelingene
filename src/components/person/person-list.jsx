import './_person-list.scss';
import React from 'react';
import Person from './person.jsx';

export default class PersonList extends React.Component {

    constructor() {
        super();
        this.state = {
            people: []
        };
    }

    render() {
        var elements = this.props.people.map((p)=> {
            return (
                <div key={p.id} className="col-xs-6 col-sm-4">
                    <Person {...p} />
                </div>
            );
        });

        return (
            <div className="row">
                {elements}
            </div>
        );
    }

}

PersonList.defaultProps = {
    people: []
};