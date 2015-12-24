import React from 'react';
import PersonList from './person/person-list.jsx';
import FilterPanel from './filter-panel/filter-panel.jsx';
import _ from 'lodash';

export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            people: [],
            filteredPeople: []
        };
    }

    render() {
        return (
            <main>
                <FilterPanel people={this.state.people} onApply={this._applyFilter.bind(this)}/>
                <PersonList people={this.state.filteredPeople}/>
            </main>
        );
    }


    componentDidMount() {
        fetch('/api/people')
            .then(response=>response.json())
            .then(json=> {
                this.setState({people: json, filteredPeople: json});
            })
            .catch(ex=>console.log(ex));
    }

    _applyFilter(filterSet) {
        var locations = _.reduce(_.keys(filterSet.location), (list, x)=> {
                if (filterSet.location[x]) {
                    list.push(x);
                }
                return list;
            }, []),
            levels = _.reduce(_.keys(filterSet.level), (list, x)=> {
                if (filterSet.level[x]) {
                    list.push(x);
                }
                return list;
            }, []);

        var filteredPeople = _.chain(this.state.people)
            .filter(p=> {
                if (_.isEmpty(locations)) return true;
                return _.contains(locations, p.location)
            })
            .filter(p=> {
                if (_.isEmpty(levels)) return true;
                return _.contains(levels, p.level)
            })
            .filter(p=> {
                return _.reduce(_.keys(filterSet.skills), (flag, key)=> {
                    return flag || (filterSet.skills[key].value >= p.skills[key]);
                }, false)
            })
            .value();

        this.setState({filteredPeople: filteredPeople});
    }
};

Dashboard.defaultProps = {};