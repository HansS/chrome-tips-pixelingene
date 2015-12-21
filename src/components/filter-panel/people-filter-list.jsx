import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

export default class PeopleFilterList extends React.Component {

    constructor() {
        super();
        this.state = {
            location: {},
            skills: {},
            level: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this._buildState(nextProps.filter);
    }

    componentWillUnmount() {
        if (this.props.onClose) {
            this.props.onClose(this.state);
        }
    }

    render() {
        var filter = this.props.filter,
            state = this.state,
            locations = _.map(filter.location, (selected, key)=> {
                return (
                    <li key={key} className="list-group-item" data-value={key}>
                        <label>
                            <input type="checkbox"
                                   value={key}
                                   checked={state.location[key]}
                                   onChange={this._locationChanged.bind(this)}
                            />
                            &nbsp;
                            <span>{key}</span>
                        </label>
                    </li>
                );
            }),
            skills = _.map(filter.skills, (range, skill)=> {
                var value = state.skills[skill] || {value:5};
                return (
                    <li key={skill} className="list-group-item" data-value={skill}>
                        <label>{skill.toUpperCase()}</label>
                        <input type="range"
                               value={value}
                               min={range.min}
                               max={range.max}
                               onChange={this._skillChanged.bind(this)}
                        />
                    </li>
                );
            }),
            levels = _.map(filter.level, (selected, key)=> {
                return (
                    <li key={key} className="list-group-item" data-value={key}>
                        <label>
                            <input type="checkbox"
                                   value={key}
                                   checked={state.level[key]}
                                   onChange={this._levelChanged.bind(this)}/>
                            &nbsp;
                            <span>{key}</span>
                        </label>
                    </li>
                );
            });

        return (
            <ul className="list-group">
                <li className="list-group-item text-center text-primary">By Location</li>
                {locations}

                <li className="list-group-item text-center text-primary">By Skill</li>
                {skills}

                <li className="list-group-item text-center text-primary">By Level</li>
                {levels}

            </ul>
        );
    }

    _skillChanged(event) {
        var skill = $(event.target).closest('[data-value]').data('value'),
            rating = parseInt(event.target.value);

        this.state.skills[skill] = rating;
        this.setState(this.state);
    }

    _locationChanged(event) {
        var location = $(event.target).closest('[data-value]').data('value'),
            selected = event.target.checked;

        this.state.location[location] = selected;
        this.setState(this.state);
    }

    _levelChanged(event) {
        var level = $(event.target).closest('[data-value]').data('value'),
            selected = event.target.checked;

        this.state.level[level] = selected;
        this.setState(this.state);
    }


    _buildState(filter) {
        this.state.location = _.extend({}, filter.location);

        this.state.level = _.extend({}, filter.level);

        this.state.skills = _.reduce(Object.keys[filter.skills], (agg, x)=>{
            agg[x] = filter.skills[x].value;
            return agg;
        }, {});
    }

}

PeopleFilterList.defaultProps = {
    filter: {},
    onClose: function(){}
};